const fechaInicial = document.getElementById("fechaInicial");
const fechaFinal = document.getElementById("fechaFinal");
const listaReportes = document.getElementById("reporte");

document.addEventListener("DOMContentLoaded", function () {

    
  
  });

  function prueba(){
      //Date.parse("cadena");
      let fechaInicialEscogida = Date.parse(fechaInicial.value);
      let fechaFinalEscogida = Date.parse(fechaFinal.value);

      let operacionesEntrada = localStorage.getItem("operacionesEntrada");

      let fechaAEvaluar = new Date(17-11-2021);
    
      if ( fechaAEvaluar >= fechaInicialEscogida && fechaAEvaluar <= fechaFinalEscogida ){
          console.log("La fecha SÍ está entre el rango escogido");
          console.log("Fecha Inicial escogida en segundos: "+fechaInicialEscogida);
          console.log("Fecha a evaluar en segundos: "+fechaAEvaluar);
          console.log("Fecha Final escogida en segundos: "+fechaFinalEscogida);
      }
      else{
        console.log("La fecha NO está entre el rango escogido");
        console.log("Fecha Inicial escogida en segundos: "+fechaInicialEscogida);
        console.log("Fecha a evaluar en segundos: "+fechaAEvaluar);
        console.log("Fecha Final escogida en segundos: "+fechaFinalEscogida);
      }
  }