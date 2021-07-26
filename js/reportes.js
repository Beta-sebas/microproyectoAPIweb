const fechaInicial = document.getElementById("fechaInicial");
const fechaFinal = document.getElementById("fechaFinal");
let contenedor1 = document.getElementById("contenedorInformacion1");
let contenedor2 = document.getElementById("contenedorInformacion2");
let listaReportes = document.getElementById("reporte");

document.addEventListener("DOMContentLoaded", function () {

    
  
  });

  function buscarPorFechas(){
      let fechaInicialEscogida = Date.parse(fechaInicial.value);
      let fechaFinalEscogida = Date.parse(fechaFinal.value);
      let operacionesSalida = JSON.parse(localStorage.getItem("operacionesSalida"));
      let operacionesEntrada = JSON.parse(localStorage.getItem("operacionesEntrada"));
      let reporteEscogido = listaReportes.value;
      console.log(reporteEscogido);
      
      switch (reporteEscogido) {
        case "1": //--------------------------------------------reporte de inventario----------------------------
          let productosEntrada = [];
          let productosSalida = [];
          let productoAuxiliar = {
            nombre:"",
            cantidad:"",
            fecha:""
          };
          //Operaciones de Entrada
          operacionesEntrada.forEach((operacionEntradaActual, indiceOperacionActual) => {
            if(fechaInicialEscogida <= operacionEntradaActual.fecha && operacionEntradaActual.fecha <= fechaFinalEscogida) {
              operacionEntradaActual.productos.forEach((productoActual, indiceProductoActual) => {
                productoAuxiliar = {
                  nombre:"",
                  cantidad:"",
                  fecha:""
                };
                productoAuxiliar.nombre = productoActual.producto;
                productoAuxiliar.cantidad = productoActual.cantidad;
                productoAuxiliar.fecha = operacionEntradaActual.fecha;
                productosEntrada.push(productoAuxiliar);
              });   
            }
            else{
              console.log("No hubo operaciones de entrada en ese rango de fechas");
            } 
          });  
          imprimirOperacionesEntrada(productosEntrada);

          //Operaciones de Salida           
          operacionesSalida.forEach((operacionSalidaActual, indiceActual) => {
            if(fechaInicialEscogida <= operacionSalidaActual.fecha && operacionSalidaActual.fecha <= fechaFinalEscogida) {
              if(operacionSalidaActual.estado=="Terminado"){
                operacionSalidaActual.productos.forEach((productoActual, indiceProductoActual) => {
                  productoAuxiliar = {
                    nombre:"",
                    cantidad:"",
                    fecha:""
                  };
                  productoAuxiliar.nombre = productoActual.producto;
                  productoAuxiliar.cantidad = productoActual.cantidad;
                  productoAuxiliar.fecha = operacionSalidaActual.fecha;
                  productosSalida.push(productoAuxiliar);
                }); 
              }
            }
            else{
              console.log("No hubo operaciones de salida en ese rango de fechas");
            }
          });
          imprimirOperacionesSalida(productosSalida);
          break; //----------------------------------------------------------------------------------------------
      

        case "2": //reporte ventas y compras totales
          console.log("Se selecciono ventas y compras");
          break;

        case "3": //reporte de ordenes
          console.log("Se selecciono reporte de ordenes");
          break;
        

        default : //cuando no se ha escogido ninguno de los 3 reportes
          console.log("NO ha seleccionado reporte");
          
      }
  }
  
  function imprimirOperacionesEntrada (productosEntrada){
    contenedor1.innerHTML="";
    contenedor1.innerHTML=`<h2 class="tituloContenedorInformacion">Operaciones de Entrada</h2>`; 
    productosEntrada.forEach((productoActual, indiceActual) => {
      let n = new Date(productoActual.fecha).toLocaleString();
      contenedor1.innerHTML+=
      `
      <div class="itemInformacion">

            <div class="parteIzquierdaitemInformacion">
              <div class="titulo">
                <h2>${productoActual.nombre} </h2>
              </div>
              <div class="descripcion">
                <ul>
                  <li>Cantidad: ${productoActual.cantidad}</li>
                  <li>Fecha: ${n}</li>
                </ul>
              </div>
            </div>

      </div>
      `;
    });
  }

  function imprimirOperacionesSalida (productosSalida){
    contenedor2.innerHTML="";
    contenedor2.innerHTML=`<h2 class="tituloContenedorInformacion">Operaciones de Salida</h2>`; 
    productosSalida.forEach((productoActual, indiceActual) => {
      let n = new Date(productoActual.fecha).toLocaleString();
      contenedor2.innerHTML+=
      `
      <div class="itemInformacion">

            <div class="parteIzquierdaitemInformacion">
              <div class="titulo">
                <h2>${productoActual.nombre} </h2>
              </div>
              <div class="descripcion">
                <ul>
                  <li>Cantidad: ${productoActual.cantidad}</li>
                  <li>Fecha: ${n}</li>
                </ul>
              </div>
            </div>

      </div>
      `;
    });
  }