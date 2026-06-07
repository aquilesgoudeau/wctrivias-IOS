
import { useEffect, useRef, useState } from "react";
import {
  View,
  StyleSheet,
  Animated,
  Pressable,
  Dimensions,
  FlatList
} from "react-native";
import * as Device from 'expo-device'
import {playSound} from "../utilities/playSound"


const { width, height } = Dimensions.get("screen");

const shorter = Math.min(width, height)

console.log(Device.deviceType);

/*  
Iphone*/
const fontSizeTextIphone =shorter<=320 ?15:shorter>320 && shorter <= 360 ? 18 : shorter >= 400 ? 22 : 20
const radioContainerIphone  =20
const widthContainerIphone =width*0.9

/*
tablet*/
const fontSizeTextTablet = shorter <=650 ? 20 :shorter > 650 &&  shorter <= 800 ? 26 : shorter >= 1000 ? 36 : 28
const radioContainerTablet = shorter <=650 ? 22 :shorter > 650 && shorter <= 800 ? 30 : shorter >= 1000 ? 36 : 24
const widthContainerTablet = shorter <=650 ? width *0.8 :shorter > 650 && shorter <= 800 ? width *0.8 : shorter >= 1000 ? width *0.75 : width *0.75

const fontSizeText = Device.deviceType === 1 ? fontSizeTextIphone : fontSizeTextTablet
const radioContainer  = Device.deviceType === 1 ? radioContainerIphone : radioContainerTablet
const widthContainer = Device.deviceType === 1 ? widthContainerIphone : widthContainerTablet

const IdiomaItem = ({ item, animation, onPress }) => {
  const pressAnim = useRef(new Animated.Value(1)).current;
  const [pressed, setPressed] = useState(false);

  const handlePress = () => {
    setPressed(true);
    Animated.sequence([
      Animated.spring(pressAnim, {
        toValue: 0.9,
        useNativeDriver: true,
      }),
      Animated.spring(pressAnim, {
        toValue: 1,
        useNativeDriver: true,
      }),
    ]).start(() => {
       
      if (onPress) onPress(item);
      setTimeout(() => setPressed(false), 200); // Resetear el color después

    });
  };

  return (
    <Animated.View
      style={{
        transform: [{ scale: animation }],
        opacity: animation,
      }}
    >
      <View style={styles.itemContainer}>
        <Pressable onPress={handlePress} >
          <Animated.Text
            style={[{fontSize:fontSizeText},
              styles.idiomaTexto,
              {
                transform: [{ scale: pressAnim }],
                color: pressed ? "#990e15" : "#800000",
              },
            ]}
          >
            {item.idioma}
          </Animated.Text>
        </Pressable>
      </View>
    </Animated.View>
  );
};

export default function Idiomas({ seleccionarIdioma,dataTorneo}) {
  const opacityContainer = useRef(new Animated.Value(0)).current;
  const itemAnimations = useRef(dataTorneo.map(() => new Animated.Value(0))).current;
  
  const crearSonido = async () =>{
    await playSound(require('../assets/sonidos/ball.wav'),0.04)
  } 

  useEffect(()=>{
    crearSonido()
  },[])

  useEffect(() => {
    Animated.timing(opacityContainer, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start(() => {
      Animated.stagger(
        80,
        itemAnimations.map(anim =>
          Animated.spring(anim, {
            toValue: 1,
            useNativeDriver: true,
            friction: 5,
          })
        )
      ).start();
    });
  }, []);

  const handleSelectIdioma = (index) => {
    Animated.timing(opacityContainer, {
      toValue: 0,
      duration: 400,
      useNativeDriver: true,
    }).start(() => {
      seleccionarIdioma(index); // Callback después de desvanecimiento
    });
  };

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.idiomasStyles, { opacity: opacityContainer }]}>
        <FlatList
          contentContainerStyle={styles.flatListContent}
          data={dataTorneo}
          numColumns={3}
          scrollEnabled={false}
          key={index=>index}
          renderItem={({ item, index }) => (
            <IdiomaItem
              item={item}
              animation={itemAnimations[index]}
              onPress={() => handleSelectIdioma(index)}
            />
          )}
        />
      </Animated.View>
    </View>
  );
}




const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    opacity:0.9
  },
  idiomasStyles: {
    backgroundColor: "#e6f0ff",
    borderRadius: radioContainer,
    paddingVertical:width<=320?0:10,
    paddingHorizontal: 10,
    width: widthContainer,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  flatListContent: {
    alignItems: "center",
    justifyContent: "center",
  },
  itemContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    minWidth: width / 3.5,
    marginVertical: 5,
  },
  idiomaTexto: {                                                        // 18, //fontSizeIdioma,
    textAlign: "center",
    padding:14,// paddingIdioma,
    color: "#800000",
    fontWeight: "900",
  }
});
