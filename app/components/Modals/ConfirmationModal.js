import React, { useState } from "react";
import {
  Alert,
  Modal,
  StyleSheet,
  Text,
  TouchableHighlight,
  View
} from "react-native";
import { scale } from "react-native-size-matters";
import TouchableRipple from "react-native-touch-ripple";
import { appColors } from "../../utils/appColors";
import CustomButton from "../CustomButton";
function ConfirmationModal ({visible,onConfirm,onCancel,message}) {
  const [modalVisible, setModalVisible] = useState(false);
  return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={visible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
        }}
      >
          <View style={styles.centeredView}>
          <View style={styles.modalView}>
      {message&&<Text style={styles.messageTxt}>{message}</Text>}
            <View style={{flexDirection:"row"}}> 
                <CustomButton label={"Cancel"} buttonStyle={{backgroundColor:appColors.red}} onPress={onCancel}/>
                <CustomButton label={" Confirm "} onPress={onConfirm}/>
            </View>
          </View>
          </View>
      </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
  },
  messageTxt:{
fontSize:scale(14),
textAlign:"center",
fontFamily: 'JosefinSans-Regular'
  },
  modalView: {
    margin: 20,
    backgroundColor: appColors.white,
    borderRadius: 20,
    padding: 35,
    // alignItems: "center",
    // justifyContent:"center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  },
  openButton: {
    backgroundColor: "#F194FF",
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  }
});

export default ConfirmationModal;