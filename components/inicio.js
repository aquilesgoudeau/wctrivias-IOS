import { useEffect, useRef } from "react";
import { View,StyleSheet,Dimensions, Animated, Easing  } from "react-native";
import logo from "../assets/imagenes/presentacion.webp"
import Imagen from "./imagen";
import * as Device from 'expo-device'
import {playSound} from "../utilities/playSound"

const { width,height} = Dimensions.get('screen');

 const shorter = Math.min(width, height)
    //phone
    const imageTestPhone= shorter <= 360 ? 200 : shorter >= 400 ? 280 : 240 
    //tablet
    const imageTestTablet= shorter <=650 ? 250 :shorter > 650 && shorter <= 800 ? 350 : shorter >= 1000 ? 500 : 400 

    const imageTest = Device.deviceType=== 1 ? imageTestPhone : imageTestTablet

export default function Inicio({setOption}){
    const spinAnim = useRef(new Animated.Value(0)).current
    const opacity = useRef(new Animated.Value(1)).current
    

    useEffect(() => {
      crearSonido()
        Animated.sequence([
          
            Animated.timing(spinAnim, {
                toValue: 1,
                delay:100,
                duration: 1000,
                easing: Easing.inOut(Easing.exp),
                useNativeDriver: true,
              }),
              Animated.timing(opacity,{
                toValue:0.9,
                duration:300,
                useNativeDriver:true
              })
            ]).start()
              setTimeout(()=>{setOption('1')},8000)
            
            
      }, []);
   // Crea animaciones combinadas
  const rotate = spinAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "1080deg"], // 3 vueltas
  });

  const scale = spinAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0.1, 1],
  });

  const translateX = spinAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [100, 0], // Se acerca desde la derecha
  });

  const translateY = spinAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [-100, 0], // Y desde arriba
  });    

  const crearSonido = async () =>{
    await playSound(require('../assets/sonidos/iniciojuego.wav'),0.02)
  }  

    return(
        <View style={[styles.imagenStyles]}>
            <Animated.View style={{opacity:opacity, transform: [{ rotate },{ scale },{ translateX }, { translateY }]}}>
               <Imagen item={logo} width={imageTest} height={imageTest} margin={0}/>
                  </Animated.View> 
                  </View>
                     
    )
}
const styles = StyleSheet.create({
    imagenStyles:{
       flex:1,
       justifyContent:"center",
       alignSelf:"center"
    }
})





/*
Privacy Policy
FairplayTriviaSports builds and owns the Wctrivias app as a commercial game. This trivia game  app are provided by FairplayTriviaSports and
are intended to be used as is. This privacy policy informs visitors about our policies regarding the collection, 
use, and disclosure of personal information for those who decide to use our application. 
By choosing to use our application, you agree to the collection and use of information in relation to this policy.
 FairplayTriviaSports does not collect personal information or share information with others except as described in this privacy policy.
  This app does not use third-party services at the time of download from Apple Store, or for advertising purposes, except for Facebook.

Children's Privacy
We do not knowingly collect personally identifiable information from children under 18 years of age. 
If we discover that a child under 18 has provided us with personal information, 
we will immediately delete this information from our servers. If you are a parent or guardian and you are aware that your child has provided us with personal information, 
please contact us so that we can take necessary actions.

Changes to This Privacy Policy
We may update our privacy policy from time to time. Thus, you are advised to review this page periodically for any changes. 
We will notify you of any changes by posting the new privacy policy on this page. This policy is effective as of 2025-06-14.

Contact Us
If you have any questions or suggestions about our privacy policy, do not hesitate to contact us at:

FairplayTriviaSports@gmail.com



*/