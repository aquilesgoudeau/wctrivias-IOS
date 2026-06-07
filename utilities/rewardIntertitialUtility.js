import { useEffect,useState,useRef} from "react"; //added useState
import {Platform,AppState} from "react-native" //added AppState
import { TestIds, RewardedInterstitialAd, RewardedAdEventType ,AdEventType} from 'react-native-google-mobile-ads'
import Constants from "expo-constants"

const rewardUnitId = Constants.expoConfig.extra.rewardUnitIdIos

const adUnitId = __DEV__
  ? TestIds.REWARDED_INTERSTITIAL
  : rewardUnitId

export default function RewardedInterstitialAdUtility(onRewardedCallback){
  const [isAdLoaded, setIsAdLoaded] = useState(false); //added 
 
  const backgroundTime = useRef(null);
  const rewardedInterstitial = useRef(null);
  const isRewarded = useRef(0);
  
  
  const loadRewardedAd = () => {

    if (rewardedInterstitial.current) {
      console.log("El anuncio ya está cargado o en proceso de carga.");
      return;
    }

    console.log("Cargando anuncio...");
    rewardedInterstitial.current = RewardedInterstitialAd.createForAdRequest(adUnitId, {
      requestNonPersonalizedAdsOnly: true,
      keywords:["Live Sports Streaming","Sports Highlights","Sports News Updates","Upcoming Matches","Top Sports Teams",
        "Game Schedule","Sports Tournaments"]
    });

    const unsubscribeLoaded=rewardedInterstitial.current.addAdEventListener(
      RewardedAdEventType.LOADED, 
      () => {
      console.log("Anuncio cargado");
      setIsAdLoaded(true);
    });
     const unsubscribeEarned = rewardedInterstitial.current.addAdEventListener(
      RewardedAdEventType.EARNED_REWARD,
      (reward)=>{
         console.log(`reward consedido: ${reward.amount} ${reward.type}`);
         isRewarded.current=reward.amount
         
      })

    const unsubscribeClosed =rewardedInterstitial.current.addAdEventListener(AdEventType.CLOSED, () => {
       console.log("Anuncio cerrado, recargando...");
       setIsAdLoaded(false);

        onRewardedCallback(isRewarded.current)

       rewardedInterstitial.current = null;
       loadRewardedAd();
    });
    const unsubscribeError= rewardedInterstitial.current.addAdEventListener(AdEventType.ERROR, (error) => {
      console.error("Error con el anuncio:", error);
      rewardedInterstitial.current = null;
      setIsAdLoaded(false);
      loadRewardedAd();
    });

    rewardedInterstitial.current.load();

    return () => {
      unsubscribeEarned();
      unsubscribeLoaded();
      unsubscribeError();
      unsubscribeClosed();
    };
  };



  useEffect(() => {
    const handleAppStateChange = (nextAppState) => {
      if (nextAppState === "background") {
        console.log("App en background");
        backgroundTime.current = Date.now();

      } else if (nextAppState === "active") {
        console.log("App volvió a activo");
        if (backgroundTime.current) {
          const timeInBackground = Date.now() - backgroundTime.current;
          const oneMinute = 1 * 60 * 1000; // 1 minuto

          if (timeInBackground > oneMinute) {
            console.log("Recargando anuncio después de inactividad...");
            loadRewardedAd();
          }
        }
      }
    };

    const subscription = AppState.addEventListener("change", handleAppStateChange);
    
    return () => {
      subscription.remove();
    };
  }, []);
                           
  useEffect(() => {
        loadRewardedAd()
      }, []);

  const showAd = () => {
       if (isAdLoaded && rewardedInterstitial.current) {
          rewardedInterstitial.current.show();
        } else {
          console.log("El anuncio aún no está listo");
        }
      };
    
      return { isAdLoaded, showAd };

    
}




