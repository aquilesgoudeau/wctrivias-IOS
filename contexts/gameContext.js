import createDataContext from "./createDataContext";
import Balon from "../assets/imagenes/balon.webp";
import BalonC from "../assets/imagenes/balonCorrecto.webp";
import BalonI from "../assets/imagenes/balonIncorrecto.webp";
import Trofeo from "../assets/imagenes/trofeo.webp";
import { obtenerPreguntasAleatorias } from "../utilities/obtenerPreguntasAleatorias";

// 1. CONSTANTES PARA CONTROL DE PANTALLAS / ESTADOS
export const GAME_OPTIONS = {
  HOME: '',
  SELECT_IDIOMA: '1',
  SELECT_TOURNAMENT: '2',
  SELECT_DIFFICULTY: '3',
  PLAYING: '4',
  CORRECT_ANSWER: '5',
  WRONG_ANSWER_YELLOW: '6',
  WRONG_ANSWER_RED: '7',
  GAME_OVER: '8',
  CHAMPION: '9',
};

const INITIAL_HEADER = [Balon, Balon, Balon, Balon, Balon, Balon, Balon, Trofeo];

const getInitialState = () => ({
  dataTorneo: [],
  option: GAME_OPTIONS.HOME,
  juegoHaTerminado: '',
  mostrarPublicidad: [],
  seleccionarTorneoTitle: '',
  oportuninades: 0,
  indexJuego: 0,
  indexArrayHeader: 0,
  amarillas: 0,
  goles: 0,
  arrayHeader: [...INITIAL_HEADER],
  indexRespuesta: 0,
  saludos: '',
  preguntarPermiso: false,
});

const gameReducer = (state, action) => {
  switch (action.type) {
    case 'SET_OPTION':
      return { 
        ...state, 
        option: action.payload.option, 
        dataTorneo: action.payload.dataTorneo ?? state.dataTorneo 
      };

    case "SELECT_IDIOMA":
      return { 
        ...state, 
        option: GAME_OPTIONS.SELECT_DIFFICULTY, 
        dataTorneo: action.payload.dataTorneo 
      };

    case "SELECT_DIFICULTAD":
      return {
        ...state,
        juegoHaTerminado: action.payload.juegoHaTerminado,
        saludos: action.payload.saludos,
        mostrarPublicidad: action.payload.mostrarPublicidad,
        option: GAME_OPTIONS.PLAYING,
        dataTorneo: action.payload.dataTorneo,
        indexJuego: 0,
      };

    case "JUGAR_RESPUESTA": {
      const { respuesta, indexRespuesta } = action.payload;
      
      // Evaluamos la respuesta directamente usando el estado del reducer
      const esCorrecta = respuesta === state.dataTorneo.respuestas[state.indexJuego];
      const nuevoHeader = [...state.arrayHeader];

      if (esCorrecta) {
        nuevoHeader[state.indexArrayHeader] = BalonC;
        const esCampeon = state.goles >= 6;
        
        return {
          ...state,
          option: esCampeon ? GAME_OPTIONS.CHAMPION : GAME_OPTIONS.CORRECT_ANSWER,
          goles: esCampeon ? 0 : state.goles + 1,
          indexRespuesta,
          arrayHeader: nuevoHeader,
        };
      } else {
        nuevoHeader[state.indexArrayHeader] = BalonI;
        const esRoja = state.amarillas >= 2;

        if (!esRoja) {
          nuevoHeader.splice(nuevoHeader.length - 1, 0, Balon);
        }

        return {
          ...state,
          option: esRoja ? GAME_OPTIONS.WRONG_ANSWER_RED : GAME_OPTIONS.WRONG_ANSWER_YELLOW,
          amarillas: state.amarillas + 1,
          indexRespuesta,
          arrayHeader: nuevoHeader,
        };
      }
        }
    case "SIGUIENTE_PREGUNTA":
      return {
        ...state,
        option: GAME_OPTIONS.PLAYING,
        indexJuego: state.indexJuego + 1,
        indexArrayHeader: state.indexArrayHeader + 1,
      };

    case "REWARD_GIVEN":
      return {
        ...state,
        oportuninades: state.oportuninades + 1,
        option: GAME_OPTIONS.PLAYING,
        amarillas: state.amarillas - 1,
        indexJuego: state.indexJuego + 1,
        arrayHeader: state.arrayHeader.map((item, idx) =>
          idx === state.indexArrayHeader ? Balon : item
        ),
      };

    case "RESET_VALUES":
      return getInitialState();

    default:
      return state;
  }
};

// 2. ACCIONES DEL CONTEXTO (Simplificadas)
const kickOff = (dispatch) => ( option, data ) => {
  dispatch({ type: 'SET_OPTION', payload: { option ,dataTorneo: data } });
};

const seleccionarIdioma = (dispatch) => (index, dataTorneo) => {
  dispatch({
    type: "SELECT_IDIOMA",
    payload: { dataTorneo: dataTorneo[index].torneos[0].seleccionarDificultad },
  });
};

const seleccionandoDificultad = (dispatch) => (index, dataTorneo) => {
  dispatch({
    type: "SELECT_DIFICULTAD",
    payload: {
      juegoHaTerminado: dataTorneo[index].juegoTerminado,
      saludos: dataTorneo[index].saludos,
      mostrarPublicidad: dataTorneo[index].publicidad,
      dataTorneo: obtenerPreguntasAleatorias(dataTorneo[index]),
    },
  });
};

const jugarTorneo = (dispatch) => (respuesta, indexRespuesta) => {
  dispatch({
    type: "JUGAR_RESPUESTA",
    payload: { respuesta, indexRespuesta },
  });
};

const preguntaSiguiente = (dispatch) => () => {
  dispatch({ type: "SIGUIENTE_PREGUNTA" });
};

const setOption = (dispatch) => (option) => {
  dispatch({ type: 'SET_OPTION', payload: { option } });
};

const empezarDenuevo = (dispatch) => () => {
  dispatch({ type: "RESET_VALUES" });
};

const otraOportunidad = (dispatch) => (reward) => {
  if (reward > 0) {
    dispatch({ type: "REWARD_GIVEN" });
  } else {
    dispatch({ type: "SET_OPTION", payload: { option: GAME_OPTIONS.GAME_OVER } });
  }
};

export const { Provider, Context } = createDataContext(
  gameReducer,
  {
    kickOff,
    seleccionarIdioma,
    seleccionandoDificultad,
    jugarTorneo,
    preguntaSiguiente,
    setOption,
    empezarDenuevo,
    otraOportunidad,
  },
  getInitialState()
);

/*
import createDataContext from "./createDataContext"
import Balon from  "../assets/imagenes/balon.webp"
import BalonC from "../assets/imagenes/balonCorrecto.webp";
import BalonI from "../assets/imagenes/balonIncorrecto.webp";
import Trofeo from "../assets/imagenes/trofeo.webp"
import { obtenerPreguntasAleatorias } from "../utilities/obtenerPreguntasAleatorias";

const initialState = {
    dataTorneo:[],
    option:'',
    juegoHaTerminado:'',
    mostrarPublicidad:[],
    seleccionarTorneoTitle:'',
    oportuninades:0,
    indexJuego:0,
    indexArrayHeader:0,
    amarillas:0,
    goles:0,
    arrayHeader:[Balon,Balon,Balon,Balon,Balon,Balon,Balon,Trofeo],
    indexRespuesta:0,
    saludos:'',
    preguntarPermiso:false

}
const gameReducer = (state,action) =>{
              switch(action.type){
                case 'SET_OPTION':
                return { ...state, option:action.payload.option, dataTorneo:action.payload.dataTorneo }
                  case "SELECT_IDIOMA":
                  return { ...state, option:action.payload.option, dataTorneo:action.payload.dataTorneo}
                     case "SELECT_DIFICULTAD":
                     return { ...state, juegoHaTerminado: action.payload.juegoHaTerminado, saludos: action.payload.saludos,
                                        mostrarPublicidad: action.payload.mostrarPublicidad, option: action.payload.option,
                                        dataTorneo: action.payload.dataTorneo, indexJuego: action.payload.indexJuego }
                        case "JUGAR_TORNEO":
                        return {...state, option: action.payload.option, goles: action.payload.goles, indexRespuesta: action.payload.indexRespuesta,
                                          arrayHeader: action.payload.arrayHeader}
                            case "JUGAR_CAMPEON":
                            return {...state, option: action.payload.option, goles: action.payload.goles, indexRespuesta: action.payload.indexRespuesta,
                                              arrayHeader: action.payload.arrayHeader}
                                case "JUGAR_AMARILLA":
                                return {...state, option: action.payload.option, amarillas: action.payload.amarillas,
                                                  indexRespuesta: action.payload.indexRespuesta, arrayHeader: action.payload.arrayHeader }
                                    case "JUGAR_ROJA":
                                    return { ...state, option: action.payload.option, amarillas: action.payload.amarillas, indexRespuesta: action.payload.indexRespuesta,
                                                       arrayHeader: action.payload.arrayHeader}
                                        case "SIGUIENTE_PREGUNTA":
                                        return {...state, option: action.payload.option, indexJuego: action.payload.indexJuego, indexArrayHeader: action.payload.indexArrayHeader}
                                           case "OPTION":
                                           return {...state, option: action.payload }
                                              case "RESET_VALUES":
                                                return  {
                                                          ...initialState,
                                                          arrayHeader: [...initialState.arrayHeader],
                                                          dataTorneo: [],
                                                          mostrarPublicidad: []
                                                        };
                                                      case 'REWARD_GIVEN':
                                                      return{
                                                              ...state,
                                                              oportuninades: state.oportuninades+1,
                                                              option: '4',
                                                              amarillas: state.amarillas-1,
                                                              indexJuego: state.indexJuego+1,
                                                              arrayHeader: state.arrayHeader.map((item, idx) => 
                                                              idx === state.indexArrayHeader ? Balon : item )
                                                        }
                                            default:
                                            return state
    }
}

const kickOff = (dispatch) => (option,data)=> {
    dispatch({ type: 'SET_OPTION',payload:{option,dataTorneo:data}});
}
const seleccionarIdioma = (dispatch) => (index,dataTorneo) =>{
     dispatch({ 
            type:"SELECT_IDIOMA",
            payload:{option:'3', dataTorneo:dataTorneo[index].torneos[0].seleccionarDificultad}
            })
}
const seleccionandoDificultad = (dispatch) => (index,dataTorneo) =>{
    dispatch({
        type:"SELECT_DIFICULTAD",
        payload:{
                 juegoHaTerminado:dataTorneo[index].juegoTerminado, 
                 saludos:dataTorneo[index].saludos, 
                 mostrarPublicidad:dataTorneo[index].publicidad,
                 option:'4',
                 dataTorneo:obtenerPreguntasAleatorias(dataTorneo[index]),
                 indexJuego:0
        }
    })
}
const jugarTorneo = (dispatch) => (respuesta,index,dataTorneo,arrayHeader,indexJuego,goles,amarillas,indexArrayHeader) => {
      const nuevoArrayHeader = [...arrayHeader];
       if(respuesta === dataTorneo.respuestas[indexJuego]){
          nuevoArrayHeader.splice(indexArrayHeader, 1, BalonC);
          if(goles<6){
              dispatch({
                  type:"JUGAR_TORNEO",
                  payload:{ option:'5', goles:goles+1,indexRespuesta:index,arrayHeader:nuevoArrayHeader}
              })
            }else{
               dispatch({
                   type:"JUGAR_CAMPEON",
                   payload:{ option:'9',goles:0,indexRespuesta:index,arrayHeader:nuevoArrayHeader }
               })
         } 
        }else{
          nuevoArrayHeader.splice(indexArrayHeader, 1, BalonI);
           if(amarillas<2){
             nuevoArrayHeader.splice(nuevoArrayHeader.length - 1, 0, Balon);
                dispatch({
                    type:"JUGAR_AMARILLA",
                    payload:{ option:'6',amarillas:amarillas+1,indexRespuesta:index,arrayHeader:nuevoArrayHeader}
                 })
             }else{
                dispatch({
                     type:"JUGAR_ROJA",
                     payload:{ option:'7',amarillas:amarillas+1,indexRespuesta:index,arrayHeader:nuevoArrayHeader}
                   })
             }
          }
     }
const preguntaSiguiente = (dispatch) => (indexJuego,indexArrayHeader) => {
    dispatch({
        type: "SIGUIENTE_PREGUNTA",
        payload:{ option:'4',indexJuego:indexJuego+1,indexArrayHeader:indexArrayHeader+1}
      })
}

const setOption =(dispatch) => (test) =>{
  dispatch({ type: "OPTION", payload:test})
}

const empezarDenuevo = (dispatch) =>()=> {
   dispatch({type:"RESET_VALUES"})
}
const otraOportunidad = (dispatch) => (reward) => {
   if(reward>0){
     dispatch({ type:"REWARD_GIVEN"})
   }else{
      dispatch({ type:"OPTION", payload:'8'})
   }
}

export const {Provider,Context} = createDataContext(
    gameReducer,
    {kickOff, seleccionarIdioma, seleccionandoDificultad, jugarTorneo, preguntaSiguiente,setOption,empezarDenuevo,otraOportunidad},
    initialState 
)
*/
