import React, { useEffect, useState, useRef } from "react";
import { View, Text, Dimensions, Animated } from "react-native";
import respuestaEquivocada from "../utilities/respuestaEquivocada";
import {playSound} from "../utilities/playSound"

const { width } = Dimensions.get("screen");

export default function CountDownTimer({ testRespuesta, testMenuRespuestas, indexjuego, jugarTorneo }) {
  const [timeLeft, setTimeLeft] = useState(20);
  const scaleAnim = useRef(new Animated.Value(1)).current;


  const crearSonido = async () => {
    try {
      await playSound(require('../assets/sonidos/ball.wav'), 0.05);
    } catch (error) {
      console.log("Error al reproducir sonido:", error);
    }
  };

  useEffect(() => {
     
    if (timeLeft <= 10 && timeLeft > 0) {
      Animated.sequence([
        Animated.timing(scaleAnim, {
          toValue: 10,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim, {
          toValue: 2,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start();
    }
    if (timeLeft > 0 && timeLeft < 10) {
      crearSonido(); // Sonido por cada segundo
    }

    if (timeLeft === 0) {
      const testRespuestaEquivocada = respuestaEquivocada(testMenuRespuestas[indexjuego], testRespuesta[indexjuego]);
      jugarTorneo(testRespuestaEquivocada[0].item, testRespuestaEquivocada[0].index);
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prevTime) => prevTime - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  const testFontSize = 40 // width < 340 ? 16 : width >= 340 && width < 550 ? 36 : width >= 550 && width < 850 ? 24 : 45;

  return (
  <View>
      <Animated.Text
        style={{
          textAlign: "center",
          color: "#b30000",
          fontSize: testFontSize,
          fontWeight: "bold",
          transform: [{ scale: scaleAnim }],
          opacity:0.7
        }}
      >
        {timeLeft >= 10 ? '' : timeLeft}
      </Animated.Text>
    </View>
);

  
}


/*
import React,{useEffect,useState} from "react"
import {Text,Dimensions} from "react-native"
import * as Device from 'expo-device'
import respuestaEquivocada from "../utilities/respuestaEquivocada";

const { width,height } = Dimensions.get("window");

  const shorter = Math.min(width, height)

const counterTestIphone =shorter >= 400 ? 26  :24

const counterTestTablet =  shorter <=650 ? 28 :shorter > 650 && shorter <= 800 ? 30 : shorter >= 1000 ? 35 : 33

const counterTest =Device.deviceType === 1 ? counterTestIphone:counterTestTablet

export default function CountDownTimer({testRespuesta,testMenuRespuestas,indexjuego,jugarTorneo,ayudaTimer}){
  const [timeLeft, setTimeLeft] = useState(ayudaTimer);

  useEffect(() => {
    
    if (timeLeft === 0) {
      const testRespuestaEquivocada = respuestaEquivocada(testMenuRespuestas[indexjuego],testRespuesta[indexjuego])
      jugarTorneo(testRespuestaEquivocada[0].item,testRespuestaEquivocada[0].index)
      
     return;
    }
  //  setTimeout(()=>{
      const timer = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);
  
      return () => clearInterval(timer); // Cleanup the timer on unmount

   // },4000)
   
  }, [timeLeft]);
   const time = timeLeft >= 11 ? <Text style={{textAlign:"center",color:"#b30000",fontSize:counterTest,fontWeight:"bold",opacity:0}}>11</Text>:
                <Text style={{ textAlign:"center",color:"#b30000",fontSize:counterTest,fontWeight:"bold"}}>{timeLeft}</Text>
   return time
             
}

//

*/