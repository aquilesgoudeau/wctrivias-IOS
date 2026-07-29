import { useEffect, useRef, useState } from "react";
import {
  View,
  FlatList,
  Pressable,
  StyleSheet,
  Animated,
  Dimensions,
} from "react-native";
import * as Device from 'expo-device'
import Imagen from "./imagen";
import {playSound} from "../utilities/playSound"


const { width, height } = Dimensions.get("screen");

 const shorter = Math.min(width, height)
  
   //Iphone 
  const fontSizeTextIphone  = shorter <= 360 ? 22 : shorter >= 400 ? 26 : 24
  const imageTorneoIphone  =shorter <= 360  ? 80 : shorter >= 400 ? 100 : 90
  const widthContainerIphone  = width *0.9
  const imageTorneoSelectedIphone  = 250
  const borderRadiusTorneoIphone = 20

 //tablet
 const fontSizeTextTablet = shorter <=650 ? 28 :shorter > 650 && shorter <= 800 ? 34 : shorter >= 1000 ? 42 : 36
 const imageTorneoTablet =  shorter <=650 ? 95 :shorter > 650 && shorter <= 800 ? 140 : shorter >= 1000 ? 180 : 160
 const widthContainerTablet = shorter <= 800 ? width *0.8 : shorter >= 1000 ? width *0.75 : width *0.75
 const imageTorneoSelectedTablet = shorter <=650 ? 250 :shorter > 650 &&   shorter <= 800 ? 350 : shorter >= 1000 ? 450 : 400
 const borderRadiusTorneoTablet = shorter <=650 ? 22 :shorter > 650 && shorter <= 800 ? 30 : shorter >= 1000 ? 36 : 24


    const fontSizeText = Device.deviceType === 1 ? fontSizeTextIphone : fontSizeTextTablet
    const imageTorneo = Device.deviceType === 1 ?  imageTorneoIphone : imageTorneoTablet 
    const widthContainer = Device.deviceType === 1 ? widthContainerIphone : widthContainerTablet 
    const imageTorneoSelected = Device.deviceType === 1 ?  imageTorneoSelectedIphone : imageTorneoSelectedTablet 
    const borderRadiusTorneo = Device.deviceType === 1 ?borderRadiusTorneoIphone : borderRadiusTorneoTablet

export default function Torneos({seleccionarElTorneo,seleccionarTorneoTitle}) {
  const [selectedItem, setSelectedItem] = useState(null);
  const [testClick,setClick] = useState(true)

  const scaleAnim = useRef(new Animated.Value(0)).current;

  const title =seleccionarTorneoTitle;
  const letters = title.split("");

  const letterAnimations = useRef(letters.map(() => new Animated.Value(0))).current;
  const itemAnimations = useRef(array.map(() => new Animated.Value(0))).current;
   
   const crearSonido = async () =>{
     await playSound(require('../assets/sonidos/ball.wav'),0.03)
   } 
 
   useEffect(()=>{
     crearSonido()
   },[])
 
 useEffect(() => {
    Animated.stagger(
      80,
      letterAnimations.map((anim) =>
        Animated.timing(anim, {
          toValue: 1,
          duration: 10,
          useNativeDriver: true,
        })
      )
    ).start();

    Animated.stagger(
      120,
      itemAnimations.map((anim) =>
        Animated.spring(anim, {
          toValue: 1,
          useNativeDriver: true,
        })
      )
    ).start(()=>setClick(false));
  }, []);

  const handleSelect = (item,index) => {
    setSelectedItem(item);
    
    
    Animated.spring(scaleAnim, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
    setTimeout(()=>{seleccionarElTorneo(index)},2000)
  };

  return (
    <View style={styles.wrapper}>
      {selectedItem ? (
        <Animated.View
          style={[
            styles.selectedContainer,
            { transform: [{ scale: scaleAnim }] },
          ]}
        >
          <Imagen item={selectedItem} width={imageTorneoSelected} height={imageTorneoSelected} margin={20} />
        </Animated.View>
      ) : (
        <View style={styles.container}>
          <View style={styles.titleContainer}>
            {letters.map((char, index) => (
              <Animated.Text
                key={index}
                style={[
                  styles.titleLetter,
                  {
                    opacity: letterAnimations[index],
                    transform: [
                      {
                        translateY: letterAnimations[index].interpolate({
                          inputRange: [0, 1],
                          outputRange: [20, 0],
                        }),
                      },
                    ],
                  },
                ]}
              >
                {char}
              </Animated.Text>
            ))}
          </View>

          
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    opacity:0.9
  },
  container: {
    backgroundColor: "#e6f0ff",
    borderRadius: borderRadiusTorneo,
    padding: 20,
    width: widthContainer,
     maxHeight: height * 0.8,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
    elevation: 5,
  },
  titleContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    marginBottom: 15,
  },
  titleLetter: {
    fontSize: fontSizeText,
    fontWeight: "900",
    color: "#800000",
    textAlign: "center",
  },
  grid: {
    justifyContent: "center",
    alignItems: "center",
  },
  selectedContainer: {
    alignItems: "center",
    justifyContent: "center",
    
  },
});

/*
import { useEffect, useRef, useState } from "react";
import {
  View,
  FlatList,
  Pressable,
  StyleSheet,
  Animated,
  Dimensions,
} from "react-native";
import * as Device from 'expo-device'
import Imagen from "./imagen";
import {playSound} from "../utilities/playSound"


const { width, height } = Dimensions.get("screen");

 const shorter = Math.min(width, height)
  
   //Iphone 
  const fontSizeTextIphone  = shorter <= 360 ? 22 : shorter >= 400 ? 26 : 24
  const imageTorneoIphone  =shorter <= 360  ? 80 : shorter >= 400 ? 100 : 90
  const widthContainerIphone  = width *0.9
  const imageTorneoSelectedIphone  = 250
  const borderRadiusTorneoIphone = 20

 //tablet
 const fontSizeTextTablet = shorter <=650 ? 28 :shorter > 650 && shorter <= 800 ? 34 : shorter >= 1000 ? 42 : 36
 const imageTorneoTablet =  shorter <=650 ? 95 :shorter > 650 && shorter <= 800 ? 140 : shorter >= 1000 ? 180 : 160
 const widthContainerTablet = shorter <= 800 ? width *0.8 : shorter >= 1000 ? width *0.75 : width *0.75
 const imageTorneoSelectedTablet = shorter <=650 ? 250 :shorter > 650 &&   shorter <= 800 ? 350 : shorter >= 1000 ? 450 : 400
 const borderRadiusTorneoTablet = shorter <=650 ? 22 :shorter > 650 && shorter <= 800 ? 30 : shorter >= 1000 ? 36 : 24


    const fontSizeText = Device.deviceType === 1 ? fontSizeTextIphone : fontSizeTextTablet
    const imageTorneo = Device.deviceType === 1 ?  imageTorneoIphone : imageTorneoTablet 
    const widthContainer = Device.deviceType === 1 ? widthContainerIphone : widthContainerTablet 
    const imageTorneoSelected = Device.deviceType === 1 ?  imageTorneoSelectedIphone : imageTorneoSelectedTablet 
    const borderRadiusTorneo = Device.deviceType === 1 ?borderRadiusTorneoIphone : borderRadiusTorneoTablet

export default function Torneos({seleccionarElTorneo,seleccionarTorneoTitle}) {
  const [selectedItem, setSelectedItem] = useState(null);
  const [testClick,setClick] = useState(true)

  const scaleAnim = useRef(new Animated.Value(0)).current;

  const title =seleccionarTorneoTitle;
  const letters = title.split("");

  const letterAnimations = useRef(letters.map(() => new Animated.Value(0))).current;
  const itemAnimations = useRef(array.map(() => new Animated.Value(0))).current;
   
   const crearSonido = async () =>{
     await playSound(require('../assets/sonidos/ball.wav'),0.03)
   } 
 
   useEffect(()=>{
     crearSonido()
   },[])
 
 useEffect(() => {
    Animated.stagger(
      80,
      letterAnimations.map((anim) =>
        Animated.timing(anim, {
          toValue: 1,
          duration: 10,
          useNativeDriver: true,
        })
      )
    ).start();

    Animated.stagger(
      120,
      itemAnimations.map((anim) =>
        Animated.spring(anim, {
          toValue: 1,
          useNativeDriver: true,
        })
      )
    ).start(()=>setClick(false));
  }, []);

  const handleSelect = (item,index) => {
    setSelectedItem(item);
    
    
    Animated.spring(scaleAnim, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
    setTimeout(()=>{seleccionarElTorneo(index)},2000)
  };

  return (
    <View style={styles.wrapper}>
      {selectedItem ? (
        <Animated.View
          style={[
            styles.selectedContainer,
            { transform: [{ scale: scaleAnim }] },
          ]}
        >
          <Imagen item={selectedItem} width={imageTorneoSelected} height={imageTorneoSelected} margin={20} />
        </Animated.View>
      ) : (
        <View style={styles.container}>
          <View style={styles.titleContainer}>
            {letters.map((char, index) => (
              <Animated.Text
                key={index}
                style={[
                  styles.titleLetter,
                  {
                    opacity: letterAnimations[index],
                    transform: [
                      {
                        translateY: letterAnimations[index].interpolate({
                          inputRange: [0, 1],
                          outputRange: [20, 0],
                        }),
                      },
                    ],
                  },
                ]}
              >
                {char}
              </Animated.Text>
            ))}
          </View>

          
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    opacity:0.9
  },
  container: {
    backgroundColor: "#e6f0ff",
    borderRadius: borderRadiusTorneo,
    padding: 20,
    width: widthContainer,
     maxHeight: height * 0.8,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
    elevation: 5,
  },
  titleContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    marginBottom: 15,
  },
  titleLetter: {
    fontSize: fontSizeText,
    fontWeight: "900",
    color: "#800000",
    textAlign: "center",
  },
  grid: {
    justifyContent: "center",
    alignItems: "center",
  },
  selectedContainer: {
    alignItems: "center",
    justifyContent: "center",
    
  },
});



*/

