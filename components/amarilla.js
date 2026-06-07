import React, { useEffect, useRef } from "react";
import {
  View,
  Text,
  Dimensions,
  StyleSheet,
  Pressable,
  SafeAreaView,
  Animated
} from "react-native";
import * as Device from 'expo-device'
import {playSound} from "../utilities/playSound"
import Imagen from "./imagen";
import AmarillaTarjeta from "../assets/imagenes/amarilla.webp"

const { width,height } = Dimensions.get("window");

 const shorter = Math.min(width, height)
    
    /*Iphone*/
    const textPreguntaIphone = shorter <= 360 ? 15 : shorter >= 400 ? 20 : 16
    const textRespuestaIphone =shorter <= 360  ?12 : shorter >= 400 ? 16 : 13
    const justContentTestIphone =shorter <= 360 ?'flex-start' : 'space-evenly'  
    const counterTestIphone =shorter >= 400 ? 26  :24
    const testTarjetaIphone= shorter <= 360 ? 280 : shorter >= 400 ? 380 : 350
    const widthPreguntaIphone = width * 0.9 
    const widthRespuestaIphone = width * 0.8
    const borderRadiosPreguntaIphone =10
    const borderRadiosRespuestaIphone =12
   
    /*tablet*/

    const textPreguntaTablet =shorter <=650 ? 20 :shorter > 650 && shorter <= 800 ? 25 : shorter >= 1000 ? 35 : 30
    const textRespuestaTablet =shorter <=650 ? 18 :shorter > 650 && shorter <= 800  ?20 : shorter >= 1000 ? 30 : 25
    const justContentTestTablet =shorter <=650 ? 'flex-start':'space-evenly'  
    const counterTestTablet =  shorter <=650 ? 28 :shorter > 650 && shorter <= 800 ? 30 : shorter >= 1000 ? 35 : 33
    const testTarjetaTablet=shorter <=650 ? 400 :shorter > 650 && shorter <= 800 ? 500 : shorter >= 1000 ? 650 : 500
    const widthPreguntaTablet = shorter <= 800 ? width *0.7 : shorter >= 1000 ? width *0.6 : width *0.65
    const widthRespuestaTablet = shorter <= 800 ? width *0.65 : shorter >= 1000 ? width *0.55 : width *0.6
    const borderRadiosPreguntaTablet =  shorter <= 800 ? 20 : shorter >= 1000 ? 27 : 24
    const borderRadiosRespuestaTablet =  shorter <= 800 ? 23 : shorter >= 1000 ? 29 : 26 


    
    const textPregunta = Device.deviceType === 1 ? textPreguntaIphone  : textPreguntaTablet 
    const textRespuesta = Device.deviceType === 1 ? textRespuestaIphone : textRespuestaTablet    
    const justContentTest = Device.deviceType === 1 ? justContentTestIphone: justContentTestTablet                                                                        
    const counterTest =Device.deviceType === 1 ? counterTestIphone:counterTestTablet 
    const testTarjeta=Device.deviceType === 1 ? testTarjetaIphone: testTarjetaTablet
    const widthPregunta = Device.deviceType === 1 ? widthPreguntaIphone: widthPreguntaTablet
    const widthRespuesta = Device.deviceType === 1 ? widthRespuestaIphone: widthRespuestaTablet
    const borderRadiosPregunta = Device.deviceType === 1 ? borderRadiosPreguntaIphone: borderRadiosPreguntaTablet
    const borderRadiosRespuesta = Device.deviceType === 1 ? borderRadiosRespuestaIphone: borderRadiosRespuestaTablet
    const testTarjetaHeight= Device.deviceType === 1 ? 50 : 100

export default function Amarilla({preguntaSiguiente,dataTorneo,indexJuego,indexRespuesta}) {

  const preguntaCompleta =dataTorneo.preguntas[indexJuego]
  const menuRespuestas = dataTorneo.menuRespuestas[indexJuego]
  const testRespuesta = dataTorneo.respuestas[indexJuego]

  const scaleAnim = useRef(new Animated.Value(0)).current;
  const rotateAnim = useRef(new Animated.Value(0)).current;
  
  const crearSonido = async () =>{
    await playSound(require('../assets/sonidos/silvato.wav'),0.02)
  } 

  useEffect(()=>{
    crearSonido()
  },[])

  useEffect(() => {
    Animated.parallel([
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
        delay:500
      }),
      Animated.timing(rotateAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
        delay:500
      })
    ]).start();
    setTimeout(()=>preguntaSiguiente(),3000)
  }, []);

  const scale = scaleAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
  });

  const rotate = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"]
  });

return (
    <SafeAreaView style={styles.safeArea}>
      <View style={[styles.wrapper]}>
        <View style={[styles.container]}>
          <View style={styles.questionContainer}>
             <Text style={[styles.questionText]}>{preguntaCompleta}</Text>
               </View>
                  <View style={styles.answerList}>
                    {menuRespuestas.map((respuesta, index) => (
                      <Pressable key={index} style={[styles.answerButton,{backgroundColor:index === indexRespuesta?"#e34e49":testRespuesta===respuesta?"#33cc33":"#145bde"}]}>
                        <Text style={[styles.answerText]}>{respuesta}</Text>
                          </Pressable>
                            ))}
                             </View>
                                <Animated.View
                                  style={{
                                     transform: [{ scale }, { rotate }],
                                       position:"absolute",
                                        top:height*0.3-(testTarjeta+50)*0.5,
                                          alignSelf:"center",
                                             opacity:0.8
                                                }}
                                                   >
                                                      <Imagen item={AmarillaTarjeta} width={testTarjeta} height={testTarjeta+testTarjetaHeight} margin={0} />
                                                        </Animated.View>
                                                            </View>
                                                               </View>
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
   // borderWidth: 2,
   // borderRadius: 50,
    //padding: 3,
    borderColor: "#fcfaf7",
    opacity:0
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
  }
});


/*

<View style={styles.counterContainer}>
            <Text style={[styles.counterText]}>10</Text>
              </View>

*/