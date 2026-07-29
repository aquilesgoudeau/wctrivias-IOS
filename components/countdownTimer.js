import React, { useEffect, useState, useRef } from "react";
import { View, Text, Dimensions, Animated } from "react-native";
import respuestaEquivocada from "../utilities/respuestaEquivocada";
import {playSound} from "../utilities/playSound"

const { width,height } = Dimensions.get("screen");

export default function CountDownTimer({ testRespuesta, testMenuRespuestas, indexjuego, jugarTorneo }) {
  const [timeLeft, setTimeLeft] = useState(40); //20
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

  const testFontSize = 60 // width < 340 ? 16 : width >= 340 && width < 550 ? 36 : width >= 550 && width < 850 ? 24 : 45;

  return (
  <View style={{position:"absolute",top:height*0.2}}>
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
import React, { useEffect, useState, useRef } from "react";
import { View, Text, Dimensions, Animated } from "react-native";
import respuestaEquivocada from "../utilities/respuestaEquivocada";
import {playSound} from "../utilities/playSound"

const { width } = Dimensions.get("screen");

export default function CountDownTimer({ testRespuesta, testMenuRespuestas, indexjuego, jugarTorneo }) {
  const [timeLeft, setTimeLeft] = useState(40); //20
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


*/