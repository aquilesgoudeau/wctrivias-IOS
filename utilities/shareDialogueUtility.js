import {Share} from "react-native"

const urlDestination = "https://apps.apple.com/us/app/wctrivias/id6747020946"

export default function shareExpo(){
    const onShare = async () => {
      try {
        const result = await Share.share({
          message:'https://wctrivias.com' //urlDestination,
        });
        if (result.action === Share.sharedAction) {
          if (result.activityType) {
            // shared with activity type of result.activityType onResetMostrarAdd
            
          } else {
            // shared
          }
        } else if (result.action === Share.dismissedAction) {
          // dismissed
        }
      } catch (error) {
        Alert.alert(error.message);
      }
    };
     return onShare()
   
}

