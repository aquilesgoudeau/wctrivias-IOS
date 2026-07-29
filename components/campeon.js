import { useEffect, useRef, useState, useContext } from "react";
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
import ConfettiCannon from "react-native-confetti-cannon";
import Trofeo from "../assets/imagenes/trofeo.webp";
import ShareJuego from "../assets/imagenes/share.webp"
import PlayAgain from "../assets/imagenes/playagain.webp"
import Imagen from "./imagen";
import {playSound} from "../utilities/playSound"
import shareExpo from "../utilities/shareDialogueUtility";
import { Context as GameContext } from "../contexts/gameContext";

const { width, height } = Dimensions.get('screen');

 export default function Campion() {

  const {state,empezarDenuevo} = useContext(GameContext)

  const {dataTorneo,indexJuego,indexRespuesta,saludos} = state
  
  const preguntaCompleta =dataTorneo.preguntas[indexJuego]
  const menuRespuestas = dataTorneo.menuRespuestas[indexJuego]

  const trofeoani = useRef(new Animated.Value(0)).current;
  const opacityAni = useRef(new Animated.Value(0.7)).current;
  const cardAni = useRef(new Animated.Value(0)).current;

  const [explosions, setExplosions] = useState([]);

  const crearSonido = async () =>{
    await playSound(require('../assets/sonidos/iniciojuego.wav'),0.02)
  } 

  useEffect(()=>{
    crearSonido()
  },[])

  useEffect(() => {
    // Trofeo + FadeOut de contenido + Transición al Card
    Animated.sequence([
      // 1. Ocultar preguntas y respuestas (0ms a 1000ms)
      Animated.timing(opacityAni, {
        toValue: 0,
        duration: 1000,
        useNativeDriver: true,
      }),
      // 2. Mostrar copa central (1000ms a 2000ms)
      Animated.timing(trofeoani, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      // Esperar 2 segundos más para completar los 4 segundos del confeti (2000ms a 4000ms)
      Animated.delay(2000),
      // 3. Transición cruzada (Crossfade): desvanecer trofeo central y mostrar el Card (4000ms a 5500ms)
      Animated.parallel([
        Animated.timing(trofeoani, {
          toValue: 0,
          duration: 1500,
          useNativeDriver: true,
        }),
        Animated.timing(cardAni, {
          toValue: 1,
          duration: 1500,
          useNativeDriver: true,
        })
      ])
    ]).start();
  }, []);

  useEffect(() => {
    const startConfettiTimeout = setTimeout(() => {
      setExplosions([
        { id: 'mb1', count: 150, origin: { x: width * 0.2, y: height * 0.5 } },
        { id: 'mb2', count: 150, origin: { x: width * 0.8, y: height * 0.5 } },
        { id: 'mb3', count: 200, origin: { x: width * 0.5, y: height * 0.7 } },
      ]);

      // Iniciar ráfagas continuas estilo fuegos artificiales durante 4 segundos
      const duration = 4 * 1000;
      const celebrationEnd = Date.now() + duration;

      const intervalId = setInterval(() => {
        const timeLeft = celebrationEnd - Date.now();
        if (timeLeft <= 0) {
          clearInterval(intervalId);
          return;
        }

        const newExplosions = [];
        const idPrefix = `exp_${Date.now()}_${Math.random()}`;

        // Lluvia desde arriba (20 partículas en x aleatorio)
        newExplosions.push({
          id: `${idPrefix}_top`,
          count: 20,
          origin: { x: Math.random() * width, y: 0 }
        });

        // Explosión de las 4 esquinas (15 partículas cada una)
        newExplosions.push(
          { id: `${idPrefix}_tl`, count: 15, origin: { x: 0, y: height * 0.05 } },
          { id: `${idPrefix}_tr`, count: 15, origin: { x: width, y: height * 0.05 } },
          { id: `${idPrefix}_bl`, count: 15, origin: { x: 0, y: height * 1.15 } },
          { id: `${idPrefix}_br`, count: 15, origin: { x: width, y: height * 1.15 } }
        );

        // 40% de probabilidad de explosión aleatoria en la pantalla (60 partículas)
        if (Math.random() > 0.6) {
          newExplosions.push({
            id: `${idPrefix}_rand`,
            count: 60,
            origin: { x: Math.random() * width, y: Math.random() * (height * 0.9) }
          });
        }

        setExplosions(prev => [...prev, ...newExplosions]);
      }, 150);

      activeTimers.push(intervalId);
    }, 1000);

    const activeTimers = [startConfettiTimeout];

    return () => {
      activeTimers.forEach(timer => {
        clearTimeout(timer);
        clearInterval(timer);
      });
    };
  }, []);

  console.log(height/2);
  
  return (
     <View style={styles.fullScreenWrapper}>
     <SafeAreaView style={styles.safeArea}>
        <View style={styles.wrapper}>
            <View style={[styles.container]}>



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


            {/* Contenedor central absoluto que asegura centrado perfecto horizontal y vertical */}
            <View style={styles.centerOverlay} pointerEvents="box-none">
              
              {/* Copa Central Animada */}
              <Animated.View
                style={[
                  styles.trofeoCentralContainer,
                  { opacity: trofeoani }
                ]}
              >
                <Imagen item={Trofeo} width={350} height={350} margin={0} />
              </Animated.View>

              {/* Tarjeta de Felicitación / Card (Crossfade con la Copa Central) */}
              <Animated.View
                style={[
                  styles.card,
                  { opacity: cardAni }
                ]}
              >
                <View style={styles.headerContainer}>
                  <Text style={styles.congratulations}>
                    {saludos}!
                  </Text>
                  <Imagen item={Trofeo} width={40} height={40} margin={0} />
                </View>

                <View style={styles.contenedorOptiones}>
                  <Pressable onPress={() => empezarDenuevo()} style={{ marginHorizontal: 15 }}>
                    <Imagen item={PlayAgain} width={50} height={50} margin={0} />
                  </Pressable>
                  <Pressable onPress={() => shareExpo()} style={{ marginHorizontal: 15 }}>
                    <Imagen item={ShareJuego} width={50} height={50} margin={0} />
                  </Pressable>
                </View>
              </Animated.View>

            </View>


            </View>
        </View>
         
     </SafeAreaView>
        <View style={styles.absoluteConfettiContainer} pointerEvents="none">
           {explosions.map(exp => (
              <ConfettiCannon
                  key={exp.id}
                  count={exp.count}
                  origin={exp.origin}
                  fallSpeed={2500}
                  fadeOut={true}
         />
       ))}
     </View>
   </View>
  );
  }

  const styles = StyleSheet.create({
  fullScreenWrapper: {
  
    width: width,
    height: height,
  },
  safeArea: {
    flex: 1

  },
  wrapper: {
    flex: 1,
    marginTop:30
  },
  container: {
    flexGrow: 1,
    justifyContent:"flex-start",
    alignItems: "center",
    paddingVertical: 10,
    marginTop:10,
    overflow:"hidden"
  },
  
  counterContainer: {
    margin:1
  },
  counterText: {
    fontSize:14,
    fontWeight: "800",
    color: "#fcfaf7",
    opacity:0
  },
  questionContainer: {
    backgroundColor: "#e6f0ff",
    padding: 25,
    borderRadius:10,
    marginBottom: 20,
    width:width*0.9,
    alignItems: "center",
    opacity: 0.9,
    marginTop:20,
    marginBottom:30
  },
  questionText: {
    fontSize:19,
    color: "#800000",
    fontWeight: "900",
    textAlign: "center",
  },
  answerList: {
    width:width * 0.8,
    marginTop:20,
    gap: 10
  },
  answerButton: {
    backgroundColor: "#145bde",
    borderColor: "#fff",
    borderWidth: 3,
    borderRadius:10,
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginVertical: 5,
    alignItems: "center",
    opacity: 0.9,
    width:width * 0.8
  },
  answerText: {
    fontSize:13,
    color: "#fff",
    fontWeight: "900",
    textAlign: "center",
  },
  centerOverlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    alignItems: "center",
  },
  trofeoCentralContainer: {
    position: "absolute",
    top:height*0.08,
    alignItems: "center",
    justifyContent: "center",
  },
  card: {
    position:"absolute",
    top:height*0.18,
    alignSelf:"center",
    backgroundColor: "#f2f2f2",
    padding: 25,
    borderRadius: 20,
    alignItems: "center",
    width: "85%",
    maxWidth: 400,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
  congratulations: {
    fontWeight: "900",
    color: "#b30000",
    textAlign: "center",
    fontSize:20, //textPregunta * 1.15,
    marginRight: 10,

  },
  contenedorOptiones: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },
  absoluteConfettiContainer: {
    position: "absolute",
    top: -height * 0.15,
    left: 0,
    width: width,
    height: height + 200,
    zIndex: 9999
  }
});


/*
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
import ConfettiCannon from "react-native-confetti-cannon";
import Trofeo from "../assets/imagenes/trofeo.webp";
import ShareJuego from "../assets/imagenes/share.webp"
import PlayAgain from "../assets/imagenes/playagain.webp"
import Imagen from "./imagen";
import {playSound} from "../utilities/playSound"
import shareExpo from "../utilities/shareDialogueUtility";

const { width, height } = Dimensions.get('screen');

 const shorter = Math.min(width, height)
   
    const textPreguntaIphone = shorter <= 360 ? 17 : shorter >= 400 ? 23 : 19
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

    

    

export default function Campion({empezarDenuevo,dataTorneo,indexJuego,indexRespuesta,saludos}) {
  console.log(height);
  
  const preguntaCompleta =dataTorneo.preguntas[indexJuego]
  const menuRespuestas = dataTorneo.menuRespuestas[indexJuego]

  const trofeoani = useRef(new Animated.Value(0)).current;
  const opacityAni = useRef(new Animated.Value(0.7)).current;
  const cardAni = useRef(new Animated.Value(0)).current;

  const [explosions, setExplosions] = useState([]);

  const smallTrophySize = imageLink * 0.8;

  const crearSonido = async () =>{
    await playSound(require('../assets/sonidos/iniciojuego.wav'),0.02)
  } 

  useEffect(()=>{
    crearSonido()
  },[])

  useEffect(() => {
    Animated.sequence([
      Animated.timing(opacityAni, {
        toValue: 0,
        duration: 1000,
        useNativeDriver: true,
      }),
     
      Animated.timing(trofeoani, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      
      Animated.delay(2000),
      Animated.parallel([
        Animated.timing(trofeoani, {
          toValue: 0,
          duration: 1500,
          useNativeDriver: true,
        }),
        Animated.timing(cardAni, {
          toValue: 1,
          duration: 1500,
          useNativeDriver: true,
        })
      ])
    ]).start();
  }, []);

  useEffect(() => {
   
    const startConfettiTimeout = setTimeout(() => {

      setExplosions([
        { id: 'mb1', count: 150, origin: { x: width * 0.2, y: height * 0.5 } },
        { id: 'mb2', count: 150, origin: { x: width * 0.8, y: height * 0.5 } },
        { id: 'mb3', count: 200, origin: { x: width * 0.5, y: height * 0.7 } },
      ]);

  
      const duration = 4 * 1000;
      const celebrationEnd = Date.now() + duration;

      const intervalId = setInterval(() => {
        const timeLeft = celebrationEnd - Date.now();
        if (timeLeft <= 0) {
          clearInterval(intervalId);
          return;
        }

        const newExplosions = [];
        const idPrefix = `exp_${Date.now()}_${Math.random()}`;

       
        newExplosions.push({
          id: `${idPrefix}_top`,
          count: 20,
          origin: { x: Math.random() * width, y: 0 }
        });

        newExplosions.push(
          { id: `${idPrefix}_tl`, count: 15, origin: { x: 0, y: height * 0.05 } },
          { id: `${idPrefix}_tr`, count: 15, origin: { x: width, y: height * 0.05 } },
          { id: `${idPrefix}_bl`, count: 15, origin: { x: 0, y: height * 1.15 } },
          { id: `${idPrefix}_br`, count: 15, origin: { x: width, y: height * 1.15 } }
        );

        if (Math.random() > 0.6) {
          newExplosions.push({
            id: `${idPrefix}_rand`,
            count: 60,
            origin: { x: Math.random() * width, y: Math.random() * (height * 0.9) }
          });
        }

        setExplosions(prev => [...prev, ...newExplosions]);
      }, 150);

      activeTimers.push(intervalId);
    }, 1000);

    const activeTimers = [startConfettiTimeout];

    return () => {
      activeTimers.forEach(timer => {
        clearTimeout(timer);
        clearInterval(timer);
      });
    };
  }, []);

  console.log(height/2);
  
  return (
   <View style={styles.fullScreenWrapper}>
     <SafeAreaView style={styles.safeArea}>
        <View style={styles.wrapper}>
            <View style={[styles.container,{justifyContent:justContentTest}]}>



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


         
            <View style={styles.centerOverlay} pointerEvents="box-none">
              
             
              <Animated.View
                style={[
                  styles.trofeoCentralContainer,
                  { opacity: trofeoani }
                ]}
              >
                <Imagen item={Trofeo} width={imagencopa} height={imagencopa} margin={0} />
              </Animated.View>

              <Animated.View
                style={[
                  styles.card,
                  { opacity: cardAni }
                ]}
              >
                <View style={styles.headerContainer}>
                  <Text style={styles.congratulations}>
                    {saludos}!
                  </Text>
                  <Imagen item={Trofeo} width={smallTrophySize} height={smallTrophySize} margin={0} />
                </View>

                <View style={styles.contenedorOptiones}>
                  <Pressable onPress={() => empezarDenuevo()} style={{ marginHorizontal: 15 }}>
                    <Imagen item={PlayAgain} width={imageLink} height={imageLink} margin={0} />
                  </Pressable>
                  <Pressable onPress={() => shareExpo()} style={{ marginHorizontal: 15 }}>
                    <Imagen item={ShareJuego} width={imageLink} height={imageLink} margin={0} />
                  </Pressable>
                </View>
              </Animated.View>

            </View>


            </View>
        </View>
     </SafeAreaView>
     <View style={styles.absoluteConfettiContainer} pointerEvents="none">
       {explosions.map(exp => (
         <ConfettiCannon
           key={exp.id}
           count={exp.count}
           origin={exp.origin}
           fallSpeed={2500}
           fadeOut={true}
         />
       ))}
     </View>
   </View>
  );
  }

  const styles = StyleSheet.create({
  fullScreenWrapper: {
    position: "absolute",
    top: 0,
    left: 0,
    width: width,
    height: height,
  },
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
  centerOverlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    alignItems: "center",
  },
  trofeoCentralContainer: {
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
  },
  card: {
    position: "absolute",
    backgroundColor: "#f2f2f2",
    padding: 25,
    borderRadius: 20,
    alignItems: "center",
    width: "85%",
    maxWidth: 400,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
  congratulations: {
    fontWeight: "900",
    color: "#b30000",
    textAlign: "center",
    fontSize: textPregunta * 1.15,
    marginRight: 10,

  },
  contenedorOptiones: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },
  absoluteConfettiContainer: {
    position: "absolute",
    top: -height * 0.15,
    left: 0,
    width: width,
    height: height + 200,
    zIndex: 9999
  }
});
*/
