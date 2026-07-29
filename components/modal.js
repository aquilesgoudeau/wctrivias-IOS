import {useState, useContext} from "react";
import { View, Text, Pressable, StyleSheet, Modal, Dimensions } from "react-native";
import RewardedInterstitialAdUtility from "../utilities/rewardIntertitialUtility";
import * as Device from 'expo-device'
import { Context as GameContext} from "../contexts/gameContext"

const { width, height } = Dimensions.get("window");

export default function CustomModal({isVisible}) {

const {state,setOption,otraOportunidad} = useContext(GameContext)

const {mostrarPublicidad} = state

const { isAdLoaded, showAd } = RewardedInterstitialAdUtility(otraOportunidad); 


const pregunta = mostrarPublicidad[0];
const condicion = mostrarPublicidad[1];
const aceptar = mostrarPublicidad[2];
const cancelar = mostrarPublicidad[3];

 return (
    <Modal transparent animationType="fade" visible={isVisible}>
      <View style={styles.overlay}>
        <View style={styles.container}>
          <Text style={[styles.pregunta,{fontSize:20}]}>{pregunta}</Text>
          <Text style={[styles.condicion,{fontSize:16}]}>{condicion}</Text>
          <View style={styles.buttonsContainer}>
            {
              isAdLoaded ? 
                 <Pressable style={styles.buttonAccept} onPress={()=>{showAd()}} >
                   <Text style={styles.buttonText}>{aceptar}</Text>
                     </Pressable>
                        :
                         <Pressable style={styles.buttonAccept}  onPress={()=>{otraOportunidad(1)}}>
                           <Text style={styles.buttonText}>{aceptar}</Text>
                             </Pressable>
            } 
            <Pressable style={styles.buttonCancel} onPress={()=>{setOption('8') }} >
              <Text style={styles.buttonText}>{cancelar}</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    //backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    backgroundColor: "#fff",
    padding: 25,
    borderRadius: 16,
    width:width*0.8,
    alignItems: "center",
  },
  pregunta: {
    //fontSize: 20,
    fontWeight: "bold",
    color: "#800000",
    marginBottom: 10,
    textAlign: "center",
  },
  condicion: {
    //fontSize: 16,
    color: "#333",
    marginBottom: 20,
    textAlign: "center",
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  buttonAccept: {
    flex: 1,
    backgroundColor: "#3bd46e",
     paddingVertical: 10,
    marginHorizontal: 5,
    borderRadius: 8,
  },
  buttonCancel: {
    flex: 1,
    backgroundColor: "#0066ff",
     paddingVertical: 10,
    marginHorizontal: 5,
    borderRadius: 8,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "600",
    textAlign: "center",
    fontSize:14
  },
});


/*
import {useState} from "react";
import { View, Text, Pressable, StyleSheet, Modal, Dimensions } from "react-native";
import RewardedInterstitialAdUtility from "../utilities/rewardIntertitialUtility";
import * as Device from 'expo-device'

const { width, height } = Dimensions.get("window");
const shorter = Math.min(width, height)
  
  // Iphone
    const textPreguntaIphone = shorter <= 360 ? 16 : shorter >= 400 ? 22 : 20
    const textCondicionIphone =shorter <= 360  ? 14 : shorter >= 400 ? 18 : 16
    const textLinkIphone=shorter <= 360  ? 12 : shorter >= 400 ? 16 : 14
    const widthContainerIphone =width*0.8

    //Tablet
    const textPreguntaTablet =shorter <=650 ? 20 :shorter > 650 && shorter <= 800 ? 26 : shorter >= 1000 ? 36 : 28
    const textCondicionTablet =shorter <=650 ? 18 :shorter > 650 && shorter <= 800 ? 20 : shorter >= 1000 ? 30 : 22
    const widthContainerTablet = shorter <= 800 ? width*0.6 : shorter >= 1000 ? width*0.5 : width*0.55
    const textLinkTablet =shorter <=650 ? 18 :shorter > 650 && shorter <= 800 ? 20 : shorter >= 1000 ? 26 : 22
   
    const textPregunta = Device.deviceType === 1 ? textPreguntaIphone : textPreguntaTablet
    const textCondicion = Device.deviceType === 1 ? textCondicionIphone : textCondicionTablet
    const textLink= Device.deviceType === 1 ? textLinkIphone : textLinkTablet 
    const widthContainer = Device.deviceType === 1 ? widthContainerIphone : widthContainerTablet 




export default function CustomModal({isVisible,setOption,otraOportunidad,mostrarPublicidad}) {

 const { isAdLoaded, showAd } = RewardedInterstitialAdUtility(otraOportunidad); 

const pregunta = mostrarPublicidad[0];
const condicion = mostrarPublicidad[1];
const aceptar = mostrarPublicidad[2];
const cancelar = mostrarPublicidad[3];

 return (
    <Modal transparent animationType="fade" visible={isVisible}>
      <View style={styles.overlay}>
        <View style={styles.container}>
          <Text style={[styles.pregunta,{fontSize:textPregunta}]}>{pregunta}</Text>
          <Text style={[styles.condicion,{fontSize:textCondicion}]}>{condicion}</Text>
          <View style={styles.buttonsContainer}>
            {
              isAdLoaded ?
                 <Pressable style={styles.buttonAccept} onPress={()=>{showAd()}}>
                   <Text style={styles.buttonText}>{aceptar}</Text>
                     </Pressable>
                        :
                         <Pressable style={styles.buttonAccept} onPress={()=>{otraOportunidad(true)}}>
                           <Text style={styles.buttonText}>{aceptar}</Text>
                             </Pressable>
                  
            }
            
            <Pressable style={styles.buttonCancel} onPress={()=>{setOption('8') }}>
              <Text style={styles.buttonText}>{cancelar}</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    //backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    backgroundColor: "#fff",
    padding: 25,
    borderRadius: 16,
    width: widthContainer,
    alignItems: "center",
  },
  pregunta: {
    //fontSize: 20,
    fontWeight: "bold",
    color: "#800000",
    marginBottom: 10,
    textAlign: "center",
  },
  condicion: {
    //fontSize: 16,
    color: "#333",
    marginBottom: 20,
    textAlign: "center",
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  buttonAccept: {
    flex: 1,
    backgroundColor: "#3bd46e",
     paddingVertical: 10,
    marginHorizontal: 5,
    borderRadius: 8,
  },
  buttonCancel: {
    flex: 1,
    backgroundColor: "#0066ff",
     paddingVertical: 10,
    marginHorizontal: 5,
    borderRadius: 8,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "600",
    textAlign: "center",
    fontSize:textLink
  },
});



*/