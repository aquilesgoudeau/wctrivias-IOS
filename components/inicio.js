
import { useEffect, useRef, useContext } from "react";
import { View,StyleSheet,Dimensions, Animated } from "react-native";
import logo from "../assets/imagenes/presentacion.webp"
import data from "../data/datawcup.json"
import Imagen from "./imagen";
import * as Device from 'expo-device'
import {playSound} from "../utilities/playSound"
import { Context as GameContext} from "../contexts/gameContext"

export default function Inicio(){
   const opacity = useRef(new Animated.Value(0)).current
   const {kickOff} = useContext(GameContext)
   useEffect(() => {
        crearSonido()
        Animated.timing(opacity, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
    }).start()
        setTimeout(()=>{kickOff('1',data)},8000)
            
  }, []);
  const crearSonido = async () =>{
    await playSound(require('../assets/sonidos/iniciojuego.wav'),0.02)
  }  

    return(
        <View style={[styles.imagenStyles]}>
            <Animated.View style={{opacity:opacity}}>
               <Imagen item={logo} width={300} height={300} margin={0}/>
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



