import Dificultad from "./dificultad";
import Idiomas from "./idiomas";
import Inicio from "./inicio";
import Jugar from "./jugar";
import Torneos from "./torneos";
import Goal from "./goal"
import Amarilla from "./amarilla";
import Roja from "./roja";
import JuegoTerminado from "./juegoTerminado";
import Campion from "./campeon";

export default function Menu({
    option,setOption,seleccionarIdioma,dataTorneo,seleccionandoDificultad,seleccionarElTorneo,seleccionarTorneoTitle,indexJuego,jugarTorneo,
    preguntaSiguiente,indexRespuesta,empezarDenuevo,otraOportunidad,mostrarPublicidad,juegoHaTerminado,oportuninades //prepareApp
    
}){
    switch(option){
        case '1':
            return <Idiomas seleccionarIdioma={seleccionarIdioma} dataTorneo={dataTorneo} />
            case '2':
                return <Torneos setOption={setOption} seleccionarElTorneo={seleccionarElTorneo} seleccionarTorneoTitle={seleccionarTorneoTitle}  />
                case '3':
                    return <Dificultad setOption={setOption} dataTorneo={dataTorneo} seleccionandoDificultad={seleccionandoDificultad} />
                    case '4':
                        return <Jugar  indexJuego={indexJuego} dataTorneo={dataTorneo} jugarTorneo={jugarTorneo}/>
                          case '5':
                            return <Goal indexJuego={indexJuego} dataTorneo={dataTorneo} indexRespuesta={indexRespuesta} preguntaSiguiente={preguntaSiguiente} />
                            case '6':
                                return <Amarilla indexJuego={indexJuego} dataTorneo={dataTorneo} indexRespuesta={indexRespuesta} preguntaSiguiente={preguntaSiguiente} />
                                 case '7':
                                    return <Roja indexJuego={indexJuego} dataTorneo={dataTorneo} indexRespuesta={indexRespuesta} setOption={setOption} otraOportunidad={otraOportunidad} mostrarPublicidad={mostrarPublicidad}  oportuninades={oportuninades}/>
                                     case '8':
                                        return <JuegoTerminado empezarDenuevo={empezarDenuevo} juegoHaTerminado={juegoHaTerminado}/>
                                        case '9':
                                            return <Campion indexJuego={indexJuego} dataTorneo={dataTorneo} indexRespuesta={indexRespuesta} empezarDenuevo={empezarDenuevo}/>
        default:
            return <Inicio setOption={setOption} />
    }
}
//prepareApp={prepareApp}