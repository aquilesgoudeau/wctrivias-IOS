import MainScreen from "./screens/MainScreen"
import { Provider as GameProvider} from "./contexts/gameContext"

export default function App(){
  return(
        <GameProvider>
            <MainScreen/>
              </GameProvider>
   
  )
}
