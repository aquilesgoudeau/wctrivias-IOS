import {StatusBar} from "expo-status-bar"
import {useState,useEffect,useContext} from "react";
import {View,ImageBackground,StyleSheet,Dimensions,Text} from "react-native"
import {MobileAds,MaxAdContentRating} from 'react-native-google-mobile-ads';
import {getTrackingPermissionsAsync,requestTrackingPermissionsAsync} from "expo-tracking-transparency"
import {Settings} from "react-native-fbsdk-next"
import * as Device from 'expo-device'
import BannerUtility from "../utilities/bannerUtility"
import background from "../assets/imagenes/fondomundial.webp"
import Menu from "../components/menu";
import * as SplashScreen from 'expo-splash-screen';
import { Context as GameContext, GAME_OPTIONS } from "../contexts/gameContext"
import Imagen from "../components/imagen";



export default function MainScreen(){
const { width, height } = Dimensions.get('screen');
const [preguntarPermiso,setPreguntaPermiso] = useState(true) // acuerdate que es false
const {state} = useContext(GameContext)

console.log(width/height)
console.log(9/16)

useEffect(() => {
 const init = async () => {
    await new Promise((resolve) => setTimeout(resolve, 1500));

    const { status } = await getTrackingPermissionsAsync();

    if (status === "not-determined" || status === "undetermined") { await requestTrackingPermissionsAsync();}
    Settings.initializeSDK();  // Inicializar Facebook SDK

    await MobileAds().initialize();
      MobileAds().setRequestConfiguration({
      maxAdContentRating: MaxAdContentRating.PG,
      tagForChildDirectedTreatment: false,
      tagForUnderAgeOfConsent: false,
    });

    setPreguntaPermiso(true);
  };

  init();


}, []);

const {arrayHeader,option} = state

  const { HOME, SELECT_IDIOMA, SELECT_DIFFICULTY,PLAYING, CORRECT_ANSWER, WRONG_ANSWER_YELLOW, WRONG_ANSWER_RED, GAME_OVER, CHAMPION } = GAME_OPTIONS || {};
  const mostrarHeader = [PLAYING, CORRECT_ANSWER, WRONG_ANSWER_YELLOW, WRONG_ANSWER_RED,CHAMPION].includes(option);
  const mostrarBanner = [PLAYING, CORRECT_ANSWER, WRONG_ANSWER_YELLOW].includes(option);

return<View>
          <ImageBackground source={background} style={styles.backgroundStyle}>

              { mostrarHeader && (
                  <View style={[{flexDirection:"row",margin:3,alignSelf:"center",marginTop:100}]}>
                       {arrayHeader.map((item, index) => (
                         <Imagen key={index} item={item} width={30} height={30} margin={3} />
                           ))}
                            </View>
              )}

            { preguntarPermiso ? <Menu /> :  null }

            { 
              mostrarBanner && (
                       <View style={[styles.bannerContainer,{marginBottom:height*0.1},{opacity: option==='7'  || option === '9' || option === '3'? 0:1 }]}>
                        <BannerUtility/> 
                        </View>
            )}

              <StatusBar style="auto" hidden={true}/>
               </ImageBackground>
                </View>
} 
const styles = StyleSheet.create({
  backgroundStyle:{
    width:"100%",
    height:"100%"
  },
   bannerContainer: {
    alignItems: "center",
  },
})


