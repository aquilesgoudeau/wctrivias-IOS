export const  obtenerPreguntasAleatorias =(arrayPreguntas)=>{
  var a = arrayPreguntas.preguntas
  var b = arrayPreguntas.respuestas
  var c = arrayPreguntas.menuRespuestas

  for (var i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
    [b[i], b[j]] = [b[j], b[i]];
    [c[i], c[j]] = [c[j], c[i]];
  }
  //console.log(c.slice(0, 14));
  
  return {
    preguntas:a.slice(0, 14),
    respuestas:b.slice(0, 14),
    menuRespuestas:mezclarMenuRespuestasInternamente(c.slice(0, 14))
  };
  
};

// Esta función mezcla aleatoriamente los valores internos de cada índice en el array
const mezclarMenuRespuestasInternamente = (menuRespuestas) => {
  return menuRespuestas.map(opciones => {
    const copia = [...opciones];
    for (let i = copia.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [copia[i], copia[j]] = [copia[j], copia[i]];
    }
    return copia;
  });
};
