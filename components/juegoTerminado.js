import React,{useEffect,useRef, useContext} from "react";
import { View, Text, StyleSheet, Dimensions, Pressable, Animated } from "react-native";
import Imagen from "./imagen";
import playagain from "../assets/imagenes/playagain.webp";
import share from "../assets/imagenes/share.webp";
import * as Device from 'expo-device'
import {playSound} from "../utilities/playSound"
import shareExpo from "../utilities/shareDialogueUtility";
import { Context as GameContext } from "../contexts/gameContext"

const { width,height } = Dimensions.get("window");

 const shorter = Math.min(width, height)


export default function GameOverMenu() {  

  const animacionContainer =  useRef(new Animated.Value(0)).current
  const animacionTitle =  useRef(new Animated.Value(0)).current
  const animacionImages =  useRef(new Animated.Value(0)).current

  const {state,empezarDenuevo} = useContext(GameContext)
    
    const crearSonido = async () =>{
      await playSound(require('../assets/sonidos/silvato.wav'),0.03)
    } 
  
    useEffect(()=>{
      crearSonido()
    },[])
  

  useEffect(()=>{
    Animated.sequence([
        Animated.timing(animacionContainer,{
        toValue:1,
        useNativeDriver:true,
        duration:1000
        }),
        Animated.timing(animacionTitle,{
            toValue:1,
            useNativeDriver:true,
            duration:1000
        }),
        Animated.timing(animacionImages,{
            toValue:1,
            duration:1000,
            useNativeDriver:true
        })
    ]).start()
  },[])

  //console.log(juegoHaTerminado.length);
  
  return (
    <View style={styles.wrapper}>
      <Animated.View style={[styles.container,{opacity:animacionContainer}]}>
        <Animated.Text style={[styles.title,{opacity:animacionTitle}]}>{state.juegoHaTerminado}</Animated.Text>

        <Animated.View style={[styles.actions,{opacity:animacionImages}]}>
          <Pressable style={styles.button} onPress={()=>empezarDenuevo()}>
            <Imagen item={playagain} width={50} height={50} margin={10} />
          </Pressable>
          <Pressable style={styles.button} onPress={()=>shareExpo()}>
            <Imagen item={share} width={50} height={50} margin={10} />
          </Pressable>
        </Animated.View>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
     position:"absolute",
    top:height/3,
    alignSelf:"center",
    opacity:0.7
  },
  container: {
    backgroundColor: "#ebf0f7",
    borderRadius: 20,
    paddingVertical: 30,
    paddingHorizontal: 20,
    width: width*0.8,
    alignItems: "center",
    elevation: 5,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
  },
  title: {
    fontSize: 26,
    fontWeight: "900",
    color: "#800000",
    marginBottom: 30,
  },
  actions: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    width: "80%",
  },
  button: {
    alignItems: "center",
  },
});


/*
import React,{useEffect,useRef} from "react";
import { View, Text, StyleSheet, Dimensions, Pressable, Animated } from "react-native";
import Imagen from "./imagen";
import playagain from "../assets/imagenes/playagain.webp";
import share from "../assets/imagenes/share.webp";
import * as Device from 'expo-device'
import {playSound} from "../utilities/playSound"
import shareExpo from "../utilities/shareDialogueUtility";

const { width,height } = Dimensions.get("window");

 const shorter = Math.min(width, height)

//Iphone
 const textPreguntaIphone = 26
 const imageLinkIphone = 50
 const widthContainerIphone =width*0.8
 
 
 //Tablet
 const textPreguntaTablet = shorter <= 800 ? 40 : shorter >= 1000 ? 42 : 41
 const imageLinkTablet =shorter <=650 ? 60 :shorter > 650 && shorter <= 800 ? 80 : shorter >= 1000 ? 90 : 85
 const widthContainerTablet = shorter <= 800 ? width*0.6 : shorter >= 1000 ? width*0.5 : width*0.55

 const textPregunta = Device.deviceType=== 1 ? textPreguntaIphone : textPreguntaTablet
 const imageLink = Device.deviceType=== 1 ? imageLinkIphone :imageLinkTablet
 const widthContainer = Device.deviceType=== 1 ? widthContainerIphone : widthContainerTablet

export default function GameOverMenu({empezarDenuevo,juegoHaTerminado}) {   //empezarDenuevo={empezarDenuevo} juegoHaTerminado={juegoHaTerminado}
  const animacionContainer =  useRef(new Animated.Value(0)).current
  const animacionTitle =  useRef(new Animated.Value(0)).current
  const animacionImages =  useRef(new Animated.Value(0)).current

   
    
    const crearSonido = async () =>{
      await playSound(require('../assets/sonidos/silvato.wav'),0.03)
    } 
  
    useEffect(()=>{
      crearSonido()
    },[])
  

  useEffect(()=>{
    Animated.sequence([
        Animated.timing(animacionContainer,{
        toValue:1,
        useNativeDriver:true,
        duration:1000
        }),
        Animated.timing(animacionTitle,{
            toValue:1,
            useNativeDriver:true,
            duration:1000
        }),
        Animated.timing(animacionImages,{
            toValue:1,
            duration:1000,
            useNativeDriver:true
        })
    ]).start()
  },[])

  console.log(juegoHaTerminado.length);
  
  return (
    <View style={styles.wrapper}>
      <Animated.View style={[styles.container,{opacity:animacionContainer}]}>
        <Animated.Text style={[styles.title,{opacity:animacionTitle}]}>{juegoHaTerminado}</Animated.Text>

        <Animated.View style={[styles.actions,{opacity:animacionImages}]}>
          <Pressable style={styles.button} onPress={()=>empezarDenuevo()}>
            <Imagen item={playagain} width={imageLink} height={imageLink} margin={10} />
          </Pressable>
          <Pressable style={styles.button} onPress={()=>shareExpo()}>
            <Imagen item={share} width={imageLink} height={imageLink} margin={10} />
          </Pressable>
        </Animated.View>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
     position:"absolute",
    top:height/3,
    alignSelf:"center",
    opacity:0.7
  },
  container: {
    backgroundColor: "#ebf0f7",
    borderRadius: 20,
    paddingVertical: 30,
    paddingHorizontal: 20,
    width: widthContainer,
    alignItems: "center",
    elevation: 5,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
  },
  title: {
    fontSize: textPregunta,
    fontWeight: "900",
    color: "#800000",
    marginBottom: 30,
  },
  actions: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    width: "80%",
  },
  button: {
    alignItems: "center",
  },
});



*/