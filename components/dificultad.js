import React, { useEffect, useRef, useContext } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Dimensions,
  Animated,
  Pressable
} from "react-native";
import * as Device from 'expo-device'
import {playSound} from "../utilities/playSound"
import { Context as GameContext} from "../contexts/gameContext"

const { height, width } = Dimensions.get("window");


export default function Dificultad() {
  const opacity = useRef(new Animated.Value(0)).current;
  const {state,seleccionandoDificultad} = useContext(GameContext)
  
  const crearSonido = async () =>{
    await playSound(require('../assets/sonidos/ball.wav'),0.04)
  } 

  useEffect(()=>{
    crearSonido()
  },[])


useEffect(() => {
    Animated.timing(opacity, {
      toValue:1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, []);

const {dataTorneo} = state

return (
    <View style={styles.wrapper}>
      <Animated.View style={[styles.container, { opacity:opacity }]}>
        <FlatList
          data={Array.isArray(dataTorneo) ? dataTorneo : []}
          scrollEnabled={false}
          keyExtractor={(_, index) => index.toString()}
          contentContainerStyle={styles.listContent}
          renderItem={({ item, index }) => (
            <View style={styles.itemBox}>
              <Pressable onPress={()=>seleccionandoDificultad(index,dataTorneo) } >
              <Text style={[styles.text]}>
                {item.dificultad}
              </Text>
              </Pressable>
            </View>
          )}
        />
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
   flex:1,
   justifyContent:"center"

  },
  container: {
    backgroundColor: "#e6f0ff",
    borderRadius:15,
    width:"70%",
    alignSelf:"center"
  },
  listContent: {
    alignItems: "center",
    marginTop:10,
    marginBottom:10
  },
  itemBox: {
    marginVertical:5
  },
  text: {
    color: "#800000",
    fontWeight: "900",
    flexDirection: "row",
    flexWrap: "wrap",
    textAlign:"center",
    padding:5,
    fontSize:20
  },
});


/*
 import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Dimensions,
  Animated,
  Pressable
} from "react-native";
import * as Device from 'expo-device'
import {playSound} from "../utilities/playSound"

const { height, width } = Dimensions.get("window");

 const shorter = Math.min(width, height)

 const fontSizeTextIphone = shorter <= 360 ? 20 : shorter >= 400 ? 24 : 22
 const widthContainerIphone = width * 0.8
 const borderRadiusTorneoIphone = 20


 const fontSizeTextTablet = shorter <=650 ? 24 :shorter > 650 && shorter <= 800 ? 28 : shorter >= 1000 ? 42 : 36
 const widthContainerTablet = shorter <= 800 ? width *0.7 : shorter >= 1000 ? width *0.6 : width *0.65
 const borderRadiusTorneoTablet = shorter <=650 ? 22 :shorter > 650 && shorter <= 800 ? 30 : shorter >= 1000 ? 36 : 24
 

 const fontSizeText = Device.deviceType === 1 ?fontSizeTextIphone : fontSizeTextTablet
 const widthContainer = Device.deviceType === 1 ?widthContainerIphone :widthContainerTablet
 const borderRadiusTorneo = Device.deviceType === 1 ?borderRadiusTorneoIphone : borderRadiusTorneoTablet

export default function Dificultad({dataTorneo,seleccionandoDificultad}) {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const [animatedLetters, setAnimatedLetters] = useState([]);
  
  const crearSonido = async () =>{
    await playSound(require('../assets/sonidos/ball.wav'),0.04)
  } 

  useEffect(()=>{
    crearSonido()
  },[])


useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 0.9,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, []);

  useEffect(() => {
    console.log('hola');
    
    const lettersArray = dataTorneo.map((item) =>
      item.dificultad.split("").map(() => new Animated.Value(0))
    );
    setAnimatedLetters(lettersArray);

    lettersArray.forEach((letters, idx) => {
      letters.forEach((_, i) => {
        Animated.timing(letters[i], {
          toValue: 1,
          duration: 30,
          delay: i * 70 + idx * 500,
          useNativeDriver: true,
        }).start();
      });
    });
  }, []);
 


  
  return (
    <View style={styles.wrapper}>
      <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
        <FlatList
          data={dataTorneo}
          scrollEnabled={false}
         key={index=>index}
          contentContainerStyle={styles.listContent}
          renderItem={({ item, index }) => (
            <View style={styles.itemBox}>
              <Pressable onPress={()=>seleccionandoDificultad(index) }>
              <Text style={[styles.text,{fontSize:fontSizeText}]}>
                {item.dificultad.split("").map((char, i) => (
                  <Animated.Text
                    key={i}
                    style={{ opacity: animatedLetters[index]?.[i] || 0 }}
                  >
                    {char}
                  </Animated.Text>
                ))}
              </Text>
              </Pressable>
            </View>
          )}
        />
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    position:"absolute",
    top:height/3,
    alignSelf:"center"

  },
  container: {
    backgroundColor: "#e6f0ff",
    borderRadius: borderRadiusTorneo,
    paddingTop: 15,
    paddingBottom:15,
    width: widthContainer,
    maxHeight:0.8*height
    
  
  },
  listContent: {
    alignItems: "center",
  },
  itemBox: {
    marginVertical: 10
  },
  text: {
    color: "#800000",
    fontWeight: "900",
    flexDirection: "row",
    flexWrap: "wrap",
    textAlign:"center"
  },
});
*/
