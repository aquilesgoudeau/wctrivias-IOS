import {useState,useEffect} from "react"
import {View,StyleSheet,Platform,Dimensions,AppState} from "react-native"
import {BannerAd,BannerAdSize,TestIds} from "react-native-google-mobile-ads"
import { Audio } from "expo-av";
import Constants from "expo-constants"

const resultPlatform = Platform.OS === 'ios'? 220:120

const bannerUnitId = Constants.expoConfig.extra.bannerIdIos

const adUnitId = __DEV__ ? TestIds.BANNER : bannerUnitId

const {width} = Dimensions.get('window');

export default function bannerUtility(){
    const [AdLoadedBanner,setAdLoadedBanner] = useState(true)
    const [appState, setAppState] = useState(AppState.currentState);

    useEffect(() => {
      const subscription = AppState.addEventListener("change",async (nextAppState) => {
        if (appState.match(/inactive|background/) && nextAppState === "active") {
          // Cuando la app vuelve a primer plano, recargamos el banner
          console.log('the ads is active');

          await Audio.setAudioModeAsync({
            playsInSilentModeIOS: true,
            staysActiveInBackground: true,
          });
          
          setAdLoadedBanner(true);
        } else if (nextAppState === "background") {
         console.log('the ads is in background');
          // Cuando la app pasa al background, desactivamos el banner
          setAdLoadedBanner(false);
        }
        setAppState(nextAppState);
      });
  
      return () => {
        subscription.remove();
      };
    }, [appState]);

       return<View >
             {
                AdLoadedBanner?
                   <BannerAd unitId={adUnitId} size={ width>320?BannerAdSize.LARGE_BANNER:BannerAdSize.BANNER }
                      requestOptions={{requestNonPersonalizedAdsOnly:true}} 
                        onAdFailedToLoad={(error)=>{
                          console.error("error cargar banner",error)
                             setAdLoadedBanner(false)
                            }} />:
                            <View></View>
             }
                             </View>
}
const styles = StyleSheet.create({
    bannerStyle:{
       width:320,
       height:100
       }
})