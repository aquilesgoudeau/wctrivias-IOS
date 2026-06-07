import {StatusBar} from "expo-status-bar"
import { useState,useEffect} from "react";
import {View,ImageBackground,StyleSheet,Dimensions} from "react-native"
import { MobileAds,MaxAdContentRating} from 'react-native-google-mobile-ads';
import {getTrackingPermissionsAsync,requestTrackingPermissionsAsync} from "expo-tracking-transparency"
import {Settings} from "react-native-fbsdk-next"
import * as Device from 'expo-device'
import BannerUtility from "./utilities/bannerUtility";
import { obtenerPreguntasAleatorias } from "./utilities/obtenerPreguntasAleatorias";

import background from "./assets/imagenes/fondomundial.webp"
import Menu from "./components/menu";
import Data from "./data/datawcup.json"
import Imagen from "./components/imagen";

import Balon from "./assets/imagenes/balon.webp";
import BalonC from "./assets/imagenes/balonCorrecto.webp";
import BalonI from "./assets/imagenes/balonIncorrecto.webp";
import Trofeo from "./assets/imagenes/trofeo.webp";
import * as SplashScreen from 'expo-splash-screen';

const { width, height } = Dimensions.get('screen');

 const shorter = Math.min(width, height)  //width<=320?40:100
    //iphone
    const marginBottomAdsIphone = shorter <= 360 ? height*0.07 : shorter >= 400 ? height*0.11 : height*0.1
    const imageHeadingIphone =shorter <= 360  ? 20 : shorter >= 400 ? 27 : 24

   //tablet
    
    const marginBottomAdsTablet = height*0.02   
    const imageHeadingTablet =  shorter <=650?30:shorter>650 && shorter <= 800 ? 40 : shorter >= 1000 ? 55 : 45

    const marginBottomAds = Device.deviceType === 1 ? marginBottomAdsIphone : marginBottomAdsTablet
    const imageHeading =  Device.deviceType === 1 ? imageHeadingIphone : imageHeadingTablet

    

export default function App(){
const [dataTorneo,setDataTorneo] = useState([])
const [option,setOption] = useState()
const [juegoHaTerminado,setJuegoTerminado] = useState()
const [mostrarPublicidad,setMostrarPublicidad] = useState()
const [seleccionarTorneoTitle,setSeleccionarTorneoTitle] = useState()
const [oportuninades,setOportunidades] = useState(0)
const [indexJuego,setIndexJuego] = useState(0)
const [indexArrayHeader,setindexArrayHeader] = useState(0)
const [amarillas,setAmarillas] = useState(0)
const [goles,setGoles] = useState(0)
const [arrayHeader,setArrayHeader] = useState([Balon,Balon,Balon,Balon,Balon,Balon,Balon,Trofeo])
const [indexRespuesta,setIndexRespuesta] = useState(0)

const [preguntarPermiso,setPreguntaPermiso] = useState(false)

useEffect(() => {
  const init = async () => {
    // Esperamos a que el sistema esté completamente listo (render, UI, estado "active")
    await new Promise((resolve) => setTimeout(resolve, 1500));

    const { status } = await getTrackingPermissionsAsync();

    if (status === "not-determined" || status === "undetermined") {
      await requestTrackingPermissionsAsync();
    }

    // Inicializar Facebook SDK
     Settings.initializeSDK();

    await MobileAds().initialize();
    MobileAds().setRequestConfiguration({
      maxAdContentRating: MaxAdContentRating.PG,
      tagForChildDirectedTreatment: false,
      tagForUnderAgeOfConsent: false,
    });

    setPreguntaPermiso(true);
  };

  init();

  setDataTorneo(Data);
}, []);


const seleccionarIdioma = (index) => {
    if(dataTorneo[index].torneos.length>1){
       setOption('2'),
       setDataTorneo(dataTorneo[index].torneos)
       setSeleccionarTorneoTitle(dataTorneo[index].seleccionarTorneo)
    }else{
      setOption('3'),
      setDataTorneo(dataTorneo[index].torneos[0].seleccionarDificultad)
    }
}
const seleccionandoDificultad = index =>{
    setJuegoTerminado(dataTorneo[index].juegoTerminado)
    setMostrarPublicidad(dataTorneo[index].publicidad)
    setDataTorneo(obtenerPreguntasAleatorias(dataTorneo[index]))
    setOption('4')
    
   
}
const seleccionarElTorneo = index => {
      setOption('3'),
      setDataTorneo(dataTorneo[index].seleccionarDificultad)
}
 const jugarTorneo = (item,index) => {
    if(item === dataTorneo.respuestas[indexJuego]){
      if(goles<6){
        setOption('5')
        setGoles(goles+1)
        setIndexRespuesta(index)
        arrayHeader.splice(indexArrayHeader, 1,BalonC)
      }else{
        setOption('9')
        setGoles(0)
        setIndexRespuesta(index)
        arrayHeader.splice(indexArrayHeader, 1,BalonC)
      }
    }else{
      if(amarillas<2){
        setOption('6')
        setIndexRespuesta(index)
        setAmarillas(amarillas+1)
        arrayHeader.splice(indexArrayHeader, 1,BalonI)
        arrayHeader.splice(arrayHeader.length - 1, 0, Balon)
      }else{
         setOption('7')
         setIndexRespuesta(index)
         setAmarillas(amarillas+1)
         arrayHeader.splice(indexArrayHeader, 1,BalonI)
      }
      
    }
  }
const preguntaSiguiente = () => {
    setOption('4')
    setIndexJuego(indexJuego+1)
    setindexArrayHeader(indexArrayHeader +1)
  } 
   const empezarDenuevo = () => {
    setOption('')
    setDataTorneo(Data)
    setAmarillas(0)
    setGoles(0)
    setArrayHeader([Balon,Balon,Balon,Balon,Balon,Balon,Balon,Trofeo])
    setIndexJuego(0)
    setindexArrayHeader(0)
    setOportunidades(0)
  }
  const otraOportunidad = (isRewarded) => {
      console.log("el valor del reward es: "+isRewarded);
      if(isRewarded > 0){
      
      setOportunidades(oportuninades+1)
      setOption('4')
      setAmarillas(amarillas-1)
      setIndexJuego(indexJuego+1)
      setindexArrayHeader(indexArrayHeader)
      arrayHeader.splice(indexArrayHeader, 1,Balon)
      }else{
        setOption('8')
      }
     
    }



  return<View>
          <ImageBackground source={background} style={styles.backgroundStyle}>
           {
              option === '4' ||  option === '5' || option === '6' || option === '7' ||  option === '9'?
           <View style={[styles.resultContainer,{opacity:1}]}>
                       {arrayHeader.map((item, index) => (
                         <Imagen key={index} item={item} width={imageHeading} height={imageHeading} margin={3} />
                           ))}
                            </View>:<View></View>
            }
           { preguntarPermiso ?
            <Menu 
              option={option} 
                setOption={setOption} 
                  seleccionarIdioma={seleccionarIdioma} 
                     dataTorneo={dataTorneo} 
                        seleccionandoDificultad={seleccionandoDificultad}
                          juegoHaTerminado={juegoHaTerminado}
                            mostrarPublicidad={mostrarPublicidad}
                              seleccionarElTorneo={seleccionarElTorneo}
                                seleccionarTorneoTitle={seleccionarTorneoTitle}
                                  indexJuego = {indexJuego}
                                    jugarTorneo={jugarTorneo}
                                      preguntaSiguiente={preguntaSiguiente}
                                        indexRespuesta={indexRespuesta}
                                          indexArrayHeader={indexArrayHeader}
                                            empezarDenuevo={empezarDenuevo}
                                             otraOportunidad={otraOportunidad}
                                                 oportuninades={oportuninades}
                                                  // prepareApp={prepareApp}
                                                 />:<></>}
            {
       option === '3' || option === '4' ||  option === '5' || option === '6' || option === '7' ||  option === '9' ?
                       <View style={[styles.bannerContainer,{marginBottom: width<=320?height*0.03:marginBottomAds},{opacity:option==='7'  || option === '9' || option === '3'? 0:1 }]}>
                          <BannerUtility/>
                        </View>:<View></View>
            }
            <StatusBar style="auto" hidden={true}/>
            </ImageBackground>
             </View>
}
const styles = StyleSheet.create({
  backgroundStyle:{
    width,
    height,
    opacity:0.9
  },
   resultContainer: {
    flexDirection: "row",
    marginBottom: 10,
    alignSelf:"center",
    marginTop:height*0.06
  },
  bannerContainer: {
    marginTop: 10,
    alignItems: "center",
  },
})



/*


ios: {
  ...
  infoPlist: {
    NSUserTrackingUsageDescription: "Este identificador se usará para mostrarte anuncios personalizados.",
    ITSAppUsesNonExemptEncryption: false,
   

  }
}









const requestATTAndInitialize = async () => {
    const { status } = await getTrackingPermissionsAsync();

    if (status === "not-determined" || status === "undetermined") {
      await requestTrackingPermissionsAsync();
    }

    await MobileAds().initialize();
    MobileAds().setRequestConfiguration({
      maxAdContentRating: MaxAdContentRating.PG,
      tagForChildDirectedTreatment: false,
      tagForUnderAgeOfConsent: false,
    });

    setPreguntaPermiso(true);
  };

  useEffect(() => {
    const handleAppStateChange = (nextAppState) => {
      if (appState.current.match(/inactive|background/) && nextAppState === "active") {
        requestATTAndInitialize();
      }
      appState.current = nextAppState;
    };

    if (appState.current === "active") {
      requestATTAndInitialize();
    }

    const subscription = AppState.addEventListener("change", handleAppStateChange);

    setDataTorneo(Data);

    return () => subscription.remove();
  }, []);





  useEffect(() => {
  const checkAndRequest = async () => {
    const { status } = await getTrackingPermissionsAsync();
    if (status === 'not-determined' || status === 'undetermined') {
      await requestTrackingPermissionsAsync(); // Esto lanza el popup nativo de Apple
    }
    
    testAdmob(); // Siempre se puede llamar luego, no depende del permiso
    
    setPermisoResuelto(true);
    console.log(status);
    
  };

  checkAndRequest();
}, []);


https://www.amarjanica.com/add-app-tracking-transparency-permission-to-expo/
 
 */
