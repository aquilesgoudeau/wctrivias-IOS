
import React, { useEffect, useRef, useContext } from "react";
import { View, StyleSheet, Animated, Pressable, FlatList, Text, Dimensions } from "react-native";
import { playSound } from "../utilities/playSound";
import { Context as GameContext} from "../contexts/gameContext"

const { width } = Dimensions.get("screen");

const IdiomaItem = ({ item, onPress }) => {
  return (
    <View style={styles.itemContainer}>
      <Pressable onPress={onPress} style={styles.pressableStyle}>
        <Text style={styles.idiomaTexto}>
          {item?.idioma || "Sin nombre"}
        </Text>
      </Pressable>
    </View>
  );
};

export default function Idiomas() {
  const opacity = useRef(new Animated.Value(0)).current;
  const {state,seleccionarIdioma} = useContext(GameContext)
  
  
  const crearSonido = async () => {
    await playSound(require('../assets/sonidos/ball.wav'), 0.04);
  }; 

  useEffect(() => {
    crearSonido();
  }, []);

  useEffect(() => {
    Animated.timing(opacity, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
    }).start();
  }, []);
   
const {dataTorneo} = state

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.idiomasStyles, { opacity: opacity }]}>
        <FlatList
          contentContainerStyle={styles.flatListContent}
          data={Array.isArray(dataTorneo) ? dataTorneo : []}
          numColumns={3}
          scrollEnabled={false}
          keyExtractor={(_, index) => index.toString()}
          renderItem={({ item, index }) => (
            <IdiomaItem
              item={item}
              onPress={() => seleccionarIdioma(index,dataTorneo)}
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
    alignItems: "center"
  },
  idiomasStyles: {
    backgroundColor: "#e6f0ff",
    borderRadius: 20,
    paddingVertical: 15,
    paddingHorizontal: 10,
    width: width * 0.90, // Cambiado a ancho absoluto basado en pantalla
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  flatListContent: {
    width: "100%",
    justifyContent: "center",
  },
  itemContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 5,
    maxWidth: "33.3%", // Evita que se expandan incorrectamente
  },
  pressableStyle: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  idiomaTexto: {
    textAlign: "center",
    paddingTop: 8,
    paddingHorizontal:7,
    color: "#800000",
    fontWeight: "900",
    fontSize: 18
  }
});

