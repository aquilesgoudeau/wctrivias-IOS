import { useEffect, useRef, useState } from "react";
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
import Trofeo from "../assets/imagenes/trofeo.webp";
import ShareJuego from "../assets/imagenes/share.webp"
import PlayAgain from "../assets/imagenes/playagain.webp"
import Imagen from "./imagen";
import {playSound} from "../utilities/playSound"
import shareExpo from "../utilities/shareDialogueUtility";

const { width, height } = Dimensions.get('screen');

 const shorter = Math.min(width, height)
    /*
    Iphone */
    const textPreguntaIphone = shorter <= 360 ? 15 : shorter >= 400 ? 20 : 16
    const textRespuestaIphone =shorter <= 360  ?12 : shorter >= 400 ? 16 : 13
    const justContentTestIphone =shorter <= 360 ?'flex-start' : 'space-evenly'  
    const imagencopaIphone = shorter <= 360  ?280 : shorter >= 400 ? 320 : 300
    const counterTestIphone =shorter >= 400 ? 26  :24
    const widthPreguntaIphone = width * 0.9
    const widthRespuestaIphone = width * 0.8 
    const borderRadiosPreguntaIphone =10 
    const borderRadiosRespuestaIphone =12
    const imageLinkIphone =60
    const testLinkIphone =0
    const imageCopaTopIphone = shorter <= 360  ? height*0.2-30 : shorter >= 400 ? height*0.2-50  : height*0.2-40
    

  
    
        /*Tablet*/
    const imagencopaTablet =shorter <=650 ? 350 :shorter > 650 && shorter <= 800 ? 500 : shorter >= 1000 ? 650 : 500
    const textPreguntaTablet =shorter <=650 ? 20 :shorter > 650 && shorter <= 800 ? 25 : shorter >= 1000 ? 35 : 30
    const textRespuestaTablet =shorter <=650 ? 18 :shorter > 650 && shorter <= 800  ?20 : shorter >= 1000 ? 30 : 25
    const justContentTestTablet =shorter <=650 ? 'flex-start':'space-evenly'  
    const counterTestTablet =  shorter <=650 ? 28 :shorter > 650 && shorter <= 800 ? 30 : shorter >= 1000 ? 35 : 33
    const widthPreguntaTablet = shorter <= 800 ? width *0.7 : shorter >= 1000 ? width *0.6 : width *0.65
    const widthRespuestaTablet = shorter <= 800 ? width *0.65 : shorter >= 1000 ? width *0.55 : width *0.6
    const borderRadiosPreguntaTablet =  shorter <= 800 ? 20 : shorter >= 1000 ? 27 : 24
    const borderRadiosRespuestaTablet =  shorter <= 800 ? 23 : shorter >= 1000 ? 29 : 26
    const imageLinkTablet =shorter <=650 ? 80 :shorter > 650 &&  shorter <= 800 ? 100 : shorter >= 1000 ? 120 : 110
    const imageCopaTopTablet = shorter <=650 ? height*0.2-90 :shorter > 650 &&  shorter <= 800 ? height*0.2-100 : shorter >= 1000 ? height*0.2-110 : height*0.2-105
     const testLinkTablet =0


     

    const textPregunta = Device.deviceType === 1 ? textPreguntaIphone:textPreguntaTablet
    const textRespuesta =Device.deviceType === 1 ? textRespuestaIphone  : textRespuestaTablet
    const justContentTest = Device.deviceType === 1 ? justContentTestIphone  : justContentTestTablet
    const imagencopa =  Device.deviceType === 1 ? imagencopaIphone  : imagencopaTablet
    const counterTest =Device.deviceType === 1 ? counterTestIphone  : counterTestTablet
    const widthPregunta = Device.deviceType === 1 ? widthPreguntaIphone  : widthPreguntaTablet
    const widthRespuesta = Device.deviceType === 1 ? widthRespuestaIphone  : widthRespuestaTablet
    const borderRadiosPregunta = Device.deviceType === 1 ? borderRadiosPreguntaIphone   : borderRadiosPreguntaTablet
    const borderRadiosRespuesta = Device.deviceType === 1 ? borderRadiosRespuestaIphone  : borderRadiosRespuestaTablet
    const imageLink = Device.deviceType === 1 ? imageLinkIphone  : imageLinkTablet
    const testLink = Device.deviceType === 1 ? testLinkIphone  : testLinkTablet
    const imageCopaTop = Device.deviceType === 1 ? imageCopaTopIphone  : imageCopaTopTablet

    

    

export default function Campion({empezarDenuevo,dataTorneo,indexJuego,indexRespuesta}) {
  console.log(height);
  
  const preguntaCompleta =dataTorneo.preguntas[indexJuego]
  const menuRespuestas = dataTorneo.menuRespuestas[indexJuego]

  const trofeoani = useRef(new Animated.Value(0)).current;
  const opacityAni = useRef(new Animated.Value(0.7)).current;
  const animacionImages = useRef(new Animated.Value(0)).current

  
    
    const crearSonido = async () =>{
      await playSound(require('../assets/sonidos/iniciojuego.wav'),0.02)
    } 
  
    useEffect(()=>{
      crearSonido()
    },[])
  


  const particleCount = 100;
  const [particles] = useState(
    Array.from({ length: particleCount }, () => ({
      left: Math.random() * width,
      delay: Math.random() * 1000,
      color: `hsl(${Math.floor(Math.random() * 360)}, 100%, 50%)`,
      translateY: new Animated.Value(0),
      opacity: new Animated.Value(1),
    }))
  );

  useEffect(() => {
    // Trofeo + FadeOut de contenido
    Animated.sequence([
      Animated.timing(opacityAni, {
        toValue: 0,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.timing(trofeoani, {
        toValue: 0.9,
        duration: 1000,
        useNativeDriver: true,
      }),
      
      Animated.timing(animacionImages,{
        toValue:1,
        duration:1000,
        delay:3000,
        useNativeDriver:true
      })
    ]).start();

    particles.forEach((particle) => {
      Animated.parallel([
        Animated.timing(particle.translateY, {
          toValue: height, //+ 50,
          duration: 2500,
          delay: particle.delay,
          useNativeDriver: true,
        }),
        Animated.timing(particle.opacity, {
          toValue: 0,
          duration: 2500,
          delay: particle.delay,
          useNativeDriver: true,
        }),
      ]).start();
    });
  }, []);
  console.log(height/2);
  
  return (
   <SafeAreaView style={styles.safeArea}>
      <View style={styles.wrapper}>
          <View style={[styles.container,{justifyContent:justContentTest}]}>
             {particles.map((particle, i) => (
                <Animated.View
                  key={i}
                     style={{
                    width: 10,
                    height: 10,
                    borderRadius: 5,
                    backgroundColor: particle.color,
                    position: "absolute",
                    top:-140,
                    left: particle.left,
                    transform: [{ translateY: particle.translateY }],
                    opacity: particle.opacity,
                  }}
                />
          ))}

          


          <Animated.View style={[styles.questionContainer, { opacity: opacityAni }]}>
            <Text style={[styles.questionText]}>{preguntaCompleta}</Text>
          </Animated.View>

          <Animated.View style={[styles.answerList, { opacity: opacityAni }]}>
            {menuRespuestas.map((respuesta, index) => (
              <Pressable
                key={index}
                style={[
                  styles.answerButton,
                  { backgroundColor: index === indexRespuesta ? "#498c18" : "#145bde" },
                ]}
              >
                <Text style={[styles.answerText]}>{respuesta}</Text>
              </Pressable>
            ))}
          </Animated.View>

         
          <Animated.View
            style={[
              {
                position: "absolute",
                top: imageCopaTop,
                alignSelf: "center"
              },
              { opacity: trofeoani },
            ]}
          >
            <Imagen item={Trofeo} width={imagencopa} height={imagencopa} margin={0} />
          </Animated.View>

          <Animated.View style={[styles.actions,{opacity:animacionImages},{top:testLink}]}>
                    <Pressable onPress={()=>empezarDenuevo()}>
                      <Imagen item={PlayAgain} width={imageLink} height={imageLink} margin={0} />
                    </Pressable>
                    <Pressable onPress={()=>shareExpo()}>
                      <Imagen item={ShareJuego} width={imageLink} height={imageLink} margin={0} />
                    </Pressable>
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
    marginTop:width<=320?5:10,
    overflow:"hidden"
  },
  
  counterContainer: {
    margin:1
  },
  counterText: {
    fontSize: counterTest,
    fontWeight: "800",
    color: "#fcfaf7",
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
  },
  actions: {
    position:"absolute",
    flexDirection: "row",
    justifyContent: "space-evenly",
    width: "80%",
    borderRadius:20
  }
});


/*

          <Animated.View style={[styles.counterContainer,{opacity:opacityAni}]}>
           <Text style={[styles.counterText]}>10</Text>
          </Animated.View>


*/