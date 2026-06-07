import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  Dimensions,
  StyleSheet,
  Pressable,
  Animated,
  SafeAreaView,
  
} from "react-native";
import * as Device from 'expo-device'
import CountDownTimer from "./countdownTimer";
import {playSound} from "../utilities/playSound"

const { width,height } = Dimensions.get('screen');

  const shorter = Math.min(width, height)
    
    //Iphone
    const textPreguntaIphone = shorter <= 360 ? 15 : shorter >= 400 ? 20 : 16
    const textRespuestaIphone =shorter <= 360  ?12 : shorter >= 400 ? 16 : 13
    const justContentTestIphone =shorter <= 360 ?'flex-start' : 'space-evenly'  
    const counterTestIphone =shorter >= 400 ? 18  :14
    const widthPreguntaIphone =width * 0.9 
    const widthRespuestaIphone = width * 0.8 
    const borderRadiosPreguntaIphone = 10
    const borderRadiosRespuestaIphone = 12

    //tablet
    const textPreguntaTablet =shorter <=650 ? 20 :shorter > 650 && shorter <= 800 ? 25 : shorter >= 1000 ? 35 : 30
    const textRespuestaTablet =shorter <=650 ? 18 :shorter > 650 && shorter <= 800  ?20 : shorter >= 1000 ? 30 : 25
    const justContentTestTablet =shorter <=650 ? 'flex-start':'space-evenly'  
    const counterTestTablet =  shorter <=650 ? 20 :shorter > 650 && shorter <= 800 ? 25 : shorter >= 1000 ? 35 : 30
    const widthPreguntaTablet = shorter <= 800 ? width *0.7 : shorter >= 1000 ? width *0.6 : width *0.65
    const widthRespuestaTablet = shorter <= 800 ? width *0.65 : shorter >= 1000 ? width *0.55 : width *0.6
    const borderRadiosPreguntaTablet =  shorter <= 800 ? 20 : shorter >= 1000 ? 27 : 24
    const borderRadiosRespuestaTablet =  shorter <= 800 ? 23 : shorter >= 1000 ? 29 : 26
    

    const textPregunta = Device.deviceType === 1 ? textPreguntaIphone  : textPreguntaTablet 
    const textRespuesta = Device.deviceType === 1 ? textRespuestaIphone : textRespuestaTablet    
    const justContentTest = Device.deviceType === 1 ? justContentTestIphone: justContentTestTablet                                                                        
    const counterTest =Device.deviceType === 1 ? counterTestIphone:counterTestTablet 
    const widthPregunta = Device.deviceType === 1 ? widthPreguntaIphone: widthPreguntaTablet
    const widthRespuesta = Device.deviceType === 1 ? widthRespuestaIphone: widthRespuestaTablet
    const borderRadiosPregunta = Device.deviceType === 1 ? borderRadiosPreguntaIphone: borderRadiosPreguntaTablet
    const borderRadiosRespuesta = Device.deviceType === 1 ? borderRadiosRespuestaIphone: borderRadiosRespuestaTablet

export default function Jugar({dataTorneo,indexJuego,jugarTorneo}) {

  const [testClick,setClick] = useState(true)
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const preguntaCompleta = dataTorneo.preguntas[indexJuego]
  const menuRespuestas = dataTorneo.menuRespuestas[indexJuego]
   
   const crearSonido = async () =>{
     await playSound(require('../assets/sonidos/ball.wav'),0.03)
   } 
 
   useEffect(()=>{
     crearSonido()
   },[])
 

  useEffect(() => {
     Animated.timing(fadeAnim,{
       toValue:1,
       useNativeDriver:true,
       delay:800,
       duration:2000
     }).start(()=>setClick(false))
     }, []);
  return (
    <SafeAreaView style={styles.safeArea}>
      <Animated.View style={[styles.wrapper,{opacity:fadeAnim}]}>
         <View style={[styles.container]}>
          
             

              <View style={styles.questionContainer}>
                <Text style={[styles.questionText]}>
                  {preguntaCompleta}
                    </Text>
                        </View>

          <View style={styles.answerList}>
            {menuRespuestas.map((respuesta, index) => (
              <Pressable onPress={()=>jugarTorneo(respuesta,index)} key={index} style={styles.answerButton} disabled={testClick}>
                <Text style={[styles.answerText,{fontSize:textRespuesta}]}>
                  {respuesta}
                   </Text>
                    </Pressable>
                      ))}
                      </View>
                        </View>
                            <View style={styles.contador}>
                                <CountDownTimer testRespuesta={dataTorneo.respuestas}  testMenuRespuestas={dataTorneo.menuRespuestas}  indexjuego={indexJuego} jugarTorneo={jugarTorneo}/>
                                   </View>
                          </Animated.View>
                           </SafeAreaView>
  );
}

const styles = StyleSheet.create({
 safeArea: {
    flex: 1
  },
  wrapper: {
    flex: 1
  },
  container: {
    flexGrow: 1,
    justifyContent:justContentTest,
    alignItems: "center",
    paddingVertical: 10,
    marginTop:width<=320?5:10
  },
  
  counterContainer: {
    margin:1
  },
  counterText: {
    fontSize: counterTest,
    fontWeight: "800",
    color: "#fcfaf7",
    borderColor: "#fcfaf7",
    opacity:1
  },
  questionContainer: {
    backgroundColor: "#e6f0ff",
    padding: 25,
    borderRadius: borderRadiosPregunta,
    marginBottom: 20,
    width: widthPregunta,
    alignItems: "center",
    opacity: 0.9,
    marginTop:20,
    marginBottom:30
  },
  questionText: {
    fontSize:textPregunta,
    color: "#800000",
    fontWeight: "900",
    textAlign: "center",
  },
  answerList: {
    width: widthRespuesta,
    gap: 10,
    alignItems: "center",
  },
  answerButton: {
    backgroundColor: "#145bde",
    borderColor: "#fff",
    borderWidth: 3,
    borderRadius: borderRadiosRespuesta,
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginVertical: 5,
    alignItems: "center",
    opacity: 0.9,
    width:widthRespuesta
  },
  answerText: {
    fontSize:textRespuesta,
    color: "#fff",
    fontWeight: "600",
  },
   contador:{
    position:"absolute",
    top:height/3,
    alignSelf:"center"
  }
});
/*

 <View style={styles.counterContainer}>
                 <CountDownTimer testRespuesta={dataTorneo.respuestas}  testMenuRespuestas={dataTorneo.menuRespuestas}  indexjuego={indexJuego} jugarTorneo={jugarTorneo} ayudaTimer={ayudaTimer}/>
                  </View>

*/

