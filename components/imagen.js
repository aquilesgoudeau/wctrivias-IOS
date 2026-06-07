import { Image,View } from "react-native"

export default function Imagen({item,width,height,margin}){
    return(
        <View>
            <Image source={item} style={{width,height,margin}}/>
        </View>
    )
}