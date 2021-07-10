import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import * as Animatable from 'react-native-animatable'; 
import { appColors } from '../../utils/appColors';
import { scale } from 'react-native-size-matters';
class PlacesInput extends Component {
   constructor(props) {
     super(props)
     this.myRef = React.createRef();

     this.state = {
    query: this.props.query || '',
    places: [],
    showList: false,
    isLoading: false,
  };
   }
    
  

  timeout = null;

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.query !== this.props.query) {
      this.setState({
        query: this.props.query
      }, () => {
        this.fetchPlaces()
      })
    }
  }


  componentDidMount() {
    if (this.props.query) {
      this.fetchPlaces()
    }
  }


  render() {
    return (
      <View 
      style={[styles.container, this.props.stylesContainer]}>
        <TextInput
         placeholderTextColor={appColors.secondaryColor }
          autoFocus={true}
          ref={this.myRef}
          placeholder={this.props.placeHolder}
          style={[styles.input, this.props.stylesInput ]}
          onChangeText={query => {
            
            this.setState({query}, () => {
              this.onPlaceSearch();
              this.props.onChangeText && this.props.onChangeText(query, this);
            });
          }}
          value={this.state.query}
          onFocus={() => this.setState({showList: true})}
          onBlur={() => {
           this.props. onBlur && this.props.onBlur()
            this.setState({showList: false})}}
          {...this.props.textInputProps}
          clearButtonMode="always"
          onClea
        />
        {this.state.showList && (
          <View
            style={[styles.scrollView, this.props.stylesList]}
            keyboardShouldPersistTaps="always"
          >
            {this.props.contentScrollViewTop}
            {this.state.isLoading && (
              <ActivityIndicator
                size="small"
                style={[styles.loading, this.props.stylesLoading]}
              />
            )}
            {this.state.places.map(place => {
              return (
                <TouchableOpacity
                  key={`place-${place.place_id || place.id}`}
                  style={[styles.place, this.props.stylesItem]}
                  onPress={() => this.onPlaceSelect(place.place_id, place)}
                >
                  <Text style={[styles.placeText, this.props.stylesItemText]}>
                    {this.props.resultRender(place)}
                  </Text>
                  {this.props.iconResult}
                </TouchableOpacity>
              );
            })}
            {this.props.contentScrollViewBottom}
          </View>
        )}
      </View>
    );
  }

  onPlaceSearch = () => {
    clearTimeout(this.timeout);
    this.timeout = setTimeout(this.fetchPlaces, this.props.requiredTimeBeforeSearch);
  };
 
  buildCountryQuery = () => {
    const {queryCountries} = this.props;

    if (!queryCountries) {
      return '';
    }

    return `&components=${queryCountries.map(countryCode => {
      return `country:${countryCode}`;
    }).join('|')}`;
  };

  buildLocationQuery = () => {
    const {searchLatitude, searchLongitude, searchRadius} = this.props;

    if (!searchLatitude || !searchLongitude || !searchRadius) {
      return '';
    }

    return `&location=${searchLatitude},${searchLongitude}&radius=${searchRadius}`;
  };

  buildTypesQuery = () => {
    const {queryTypes} = this.props;

    if (!queryTypes) {
      return '';
    }

    return `&types=${queryTypes}`;
  };

  buildSessionQuery = () => {
    const {querySession} = this.props;

    if (querySession) {
      return `&sessiontoken=${querySession}`
    }

    return ''
  };

  fetchPlaces = async () => {
 
    if (
      !this.state.query ||
      this.state.query.length < this.props.requiredCharactersBeforeSearch
    ) {
      return;
    }
    this.setState(
      {
        showList: true,
        isLoading: true,
      },
      async () => { 
        const QUERY_URL = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${
          this.state.query
        }&key=${this.props.googleApiKey}&inputtype=textquery&language=${
          this.props.language
        }&fields=${
          this.props.queryFields
        }${this.buildLocationQuery()}${this.buildCountryQuery()}${this.buildTypesQuery()}${this.buildSessionQuery()}`
        
        const places = await fetch(QUERY_URL).then(response => response.json())
        .catch(err=>{
          console.log("err",err);
        });

        this.setState({
          isLoading: false,
          places: places.predictions,
        });
      }
    );
  };

  onPlaceSelect = async (id, passedPlace) => {
    const {clearQueryOnSelect} = this.props;

    this.setState({
      isLoading: true,
    }, async () => {
      try {
        const place = await fetch(
          `https://maps.googleapis.com/maps/api/place/details/json?placeid=${id}&key=${this.props.googleApiKey}&fields=${this.props.queryFields}&language=${this.props.language}${this.buildSessionQuery()}`
        ).then(response => response.json());
        
        return this.setState(
          {
            showList: false,
            isLoading: false,
            query: clearQueryOnSelect ? '' :
              place &&
              place.result &&
              (place.result.formatted_address || place.result.name),
          },
          () => {
            this.myRef && this.myRef.current.blur()
            return this.props.onSelect && this.props.onSelect(place);
          }
        );
      } catch (e) {
        return this.setState(
          {
            isLoading: false,
            showList: false,
            query: passedPlace.description,
          },
          () => {
            this.myRef && this.myRef.current.blur()
            return this.props.onSelect && this.props.onSelect(passedPlace);
          }
        );
      }
    });
  };
}

PlacesInput.propTypes = {
  clearQueryOnSelect: PropTypes.bool,
  contentScrollViewBottom: PropTypes.node,
  contentScrollViewTop: PropTypes.node,
  stylesInput: PropTypes.object,
  stylesContainer: PropTypes.object,
  stylesList: PropTypes.object,
  stylesItem: PropTypes.object,
  stylesItemText: PropTypes.object,
  stylesLoading: PropTypes.object,
  resultRender: PropTypes.func,
  query: PropTypes.string,
  queryFields: PropTypes.string,
  queryCountries: PropTypes.array,
  queryTypes: PropTypes.string,
  querySession: PropTypes.string,
  searchRadius: PropTypes.number,
  searchLatitude: PropTypes.number,
  searchLongitude: PropTypes.number,
  googleApiKey: PropTypes.string.isRequired,
  placeHolder: PropTypes.string,
  textInputProps: PropTypes.object,
  iconResult: PropTypes.any,
  iconInput: PropTypes.any,
  language: PropTypes.string,
  onSelect: PropTypes.func,
  onChangeText: PropTypes.func,
  requiredCharactersBeforeSearch: PropTypes.number,
  requiredTimeBeforeSearch: PropTypes.number,
  onBlur:  PropTypes.func,
  
};

PlacesInput.defaultProps = {
  stylesInput: {},
  stylesContainer: {},
  stylesList: {},
  stylesItem: {},
  stylesLoading: {},
  stylesItemText: {},
  queryFields: 'formatted_address,geometry,name',
  placeHolder: 'Search places...',
  textInputProps: {},
  language: 'en',
  resultRender: place => place.description,
  requiredCharactersBeforeSearch: 2,
  requiredTimeBeforeSearch: 1000,
  showSearchInput:PropTypes.bool,
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 10,
    left: 10,
    right: 10,
    zIndex: 1000,
    backgroundColor: appColors.white,
    marginHorizontal: scale(20),
    marginVertical: scale(10),
      borderRadius: scale(10),
    borderWidth: scale(1),
    borderColor: appColors.black22,
    paddingHorizontal: scale(20),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  // container:{
  //   height: scale(50),
  //   // flex:1,
  //   backgroundColor: appColors.white,
  //   marginHorizontal: scale(20),
  //   marginVertical: scale(10),
  //   borderRadius: scale(10),
  //   borderWidth: scale(1),
  //   borderColor: appColors.black22,
  //   paddingHorizontal: scale(20),
  //   zIndex:1000,
  //   position:"absolute",
  //     top: 10,
  //   left: 10,
  //   right: 10,
  // },
  input: {
    height: 50,
    backgroundColor: '#fff',
    paddingHorizontal: 15,
  },
  scrollView: {
    backgroundColor: '#fff',
  },
  place: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: 'rgba(0,0,0,0.1)',
    padding: 15,
    position: 'relative',
    zIndex: 10001,
  },
  placeIcon: {
    position: 'absolute',
    top: 10,
    right: 15,
    color: 'rgba(0,0,0,0.3)',
  },
  placeText: {
    color: 'rgba(0,0,0,0.8)',
    paddingRight: 60,
  },
  loading: {
    margin: 10,
  },
});

export default PlacesInput;

