export default function respuestaEquivocada(array,exclude){
    
    // Filtramos el elemento que queremos excluir
    const filteredArray = array
      .map((item, index) => ({ item, index })) // Creamos un array de objetos con elementos e índices
      .filter(obj => obj.item !== exclude); // Excluimos el elemento
  
    // Seleccionamos un elemento aleatorio de los que quedan
    const randomIndex = Math.floor(Math.random() * filteredArray.length);
    return [filteredArray[randomIndex],randomIndex];

}