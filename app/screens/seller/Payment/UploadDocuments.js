import React,{useState} from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { scale } from 'react-native-size-matters'
import { useSelector } from 'react-redux'
import { verifyDocAPI } from '../../../APIS/ApiURL'
import DocumentCard from '../../../components/card/DocumentCard'
import NormalContainer from '../../../components/Container/NormalContainer'
import CustomButton from '../../../components/CustomButton'
import Header from '../../../components/Header'
import { appColors } from '../../../utils/appColors'
import postRequestData from '../../../utils/postRequestData'

export default function UploadDocuments({ navigation }) {
    const {sellerAcDetails} = useSelector(state => state.payment)
    const [doc1Front, setDoc1Front] = useState()
    const [doc2Front, setDoc2Front] = useState()
    const [doc1Back, setDoc1Back] = useState()
    const [doc2Back, setDoc2Back] = useState()
    const{account:{account:{id}}}=sellerAcDetails
   
    const onSave=async()=>{
        console.log("acccouunnttt=",{
            account_id:id,
            document_back:doc1Back,
            document_front:doc1Front,
            addational_document_back:doc2Back,
            addational_document_front:doc2Front
        } );
        const resposee= await postRequestData(verifyDocAPI,{
            account_id:id,
            document_back:doc1Back,
            document_front:doc1Front,
            addational_document_back:doc2Back,
            addational_document_front:doc2Front
        }) 
        console.log("upload doc res",await resposee.json());
    }
    return (
        <NormalContainer scrollable header={<Header showBack title={"Upload Documents"} onBack={() => navigation.goBack()} backColor={appColors.thirdColor} touchColor={appColors.thirdColor} titleColor={appColors.thirdColor} />}>
            <Text>
                Please upload some documents for your verification
            </Text>
            <View style={styles.heading}>
                <Text style={styles.HeaderLabel}>Document 1</Text>
            </View>
            <DocumentCard label={"Front"} onUpload={(val) => { console.log("iro", val); setDoc1Front(val) }} />
            <DocumentCard label={"Back"} onUpload={(val) => { console.log("iro", val); setDoc1Back(val)}} />
            <View style={styles.heading}>
                <Text style={styles.HeaderLabel}>Document 2</Text>
            </View>
            <DocumentCard label={"Front"} onUpload={(val) => { console.log("iro", val);setDoc2Front(val) }} />
            <DocumentCard label={"Back"} onUpload={(val) => { console.log("iro", val);setDoc2Back(val) }} />
            <CustomButton label={"submit"} onPress={onSave}/>
        </NormalContainer>
    )
}

const styles = StyleSheet.create({
heading:{ 
    height: scale(30),
     backgroundColor: appColors.voiletLight,
     paddingHorizontal:scale(20),
    justifyContent:"center"
 },
 HeaderLabel:{
     color:appColors.white,
     fontSize:scale(14),
     fontFamily:"JosefinSans-Regular",
},
})
