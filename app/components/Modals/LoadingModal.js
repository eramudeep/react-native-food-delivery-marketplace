import React, { useState } from "react";
import {
    Alert,
    Modal,
    StyleSheet,
    Text,
    View
} from "react-native";
import { scale } from "react-native-size-matters";
import { appColors } from "../../utils/appColors";
import ICLoading from "../SVG/ICLoading";
function LoadingModal({ visible }) {
    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={visible}
            // onRequestClose={() => {
            //     Alert.alert("Modal has been closed.");
            // }}
        >
            <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    <ICLoading size={scale(50)} />
                    <Text style={styles.messageTxt}>  Loading  </Text>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems:"center"
    },
    messageTxt: {
        fontSize: scale(14),
        textAlign: "center",
        fontFamily: 'JosefinSans-Regular'
    },
    modalView: {
        margin: 40,
        backgroundColor: 'rgba(255,255,255,0.7)',
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        justifyContent:"center",
        // shadowColor: "#000",
        // shadowOffset: {
        //     width: 0,
        //     height: 2
        // },
        // shadowOpacity: 0.25,
        // shadowRadius: 3.84,
        // elevation: 5
    },
    label:{
        fontFamily:""
    }

});

export default LoadingModal;