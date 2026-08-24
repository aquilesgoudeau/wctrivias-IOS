import MainScreen from "./screens/MainScreen"
import { Provider as GameProvider} from "./contexts/gameContext"
//holaß
export default function App(){
  return(
        <GameProvider>
            <MainScreen/>
              </GameProvider>
   
  )
}
