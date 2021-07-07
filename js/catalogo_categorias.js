document.addEventListener("DOMContentLoaded", function () {

  imprimirCategorias();

});

function imprimirCategorias () {
  let catalogoCategoriasProductos = JSON.parse(localStorage.getItem("catalogoCategoriasProductos"));
  document.getElementById('contenedorInformacion').innerHTML=" ";

    catalogoCategoriasProductos.forEach( (categoriaActual, indiceCategoriaActual) => {
      let txt = "";
      for (let x in categoriaActual.productos) {
        txt += `
                <div class="itemInformacion producto">
                      <div class="parteIzquierdaitemInformacion">
                        <div class="tituloProducto">
                          <h2> ${categoriaActual.productos[x].nombre}</h2>
                        </div>
                        <div class="descripcionProducto">
                          <ul>
                            <li>Ubicacion: ${categoriaActual.productos[x].ubicacion}</li>
                            <li>Precio: ${categoriaActual.productos[x].precioSalidas}</li>
                            <li>Unidades: ${categoriaActual.productos[x].unidades}</li>
                          </ul>
                        </div>
                      </div>
                      <div class="parteDerechaitemInformacion">
                        <div>
                            <a class="botonModProducto" href="modificar_clientes.html" onclick=""><img class="imgModificar" src="../imagenes/lapiz.png" alt="Modificar" title="Modificar"></a>
                        </div>
                        <div>
                        <a class="botonElimiProducto" href="#" onclick=""><img class="imgEliminar" src="../imagenes/eliminar.png" alt="Eliminar" title="Eliminar"></a>
                        </div>
                      </div>
                </div>
                `;
      }
    document.getElementById('contenedorInformacion').innerHTML+=
    `
    <div class="itemInformacion categoria">
          <div class="parteIzquierdaitemInformacion">
            <div class="titulo">
              <h2 class="titulocategoria">${categoriaActual.nombreCategoria}</h2>
            </div>
          </div>

          <div class="parteDerechaitemInformacion">
            
            <div>
              <a class="botonModificar"  onclick="abrirPopupModificarCategoria(${indiceCategoriaActual})"><img class="imgModificar" src="../imagenes/lapiz.png" alt="Modificar Categoría" title="Modificar Categoría"></a>
            </div>
            <div>
              <a class="botonEliminar"  onclick="eliminarCategoria(${indiceCategoriaActual})"><img class="imgEliminar" src="../imagenes/eliminar.png" alt="Eliminar Categoría" title="Eliminar Categoría"></a>
            </div>
          </div>
          <div class="productos">
          ${txt}
          </div>
          <div class="contenedor-boton-agregar">
              <a class="botonAgregar" href="#" onclick=""><i class="fa fa-plus"></i></a>
          </div>
    </div>
    `;
  });
}


const overlayModificarCategoria = document.getElementById("overlay-mod-categoria");
const popupModificarCategoria = document.getElementById("popup-mod-categoria");


function abrirPopupModificarCategoria(indiceCategoriaActual) {
  overlayModificarCategoria.classList.add("active");
  popupModificarCategoria.classList.add("active");
  var catalogoCategoriasProductos = JSON.parse(localStorage.getItem("catalogoCategoriasProductos"));
  document.getElementById("nombreCategoriaMod").value = catalogoCategoriasProductos[indiceCategoriaActual].nombreCategoria;
  localStorage.setItem("indiceParaModificar",indiceCategoriaActual);
  document.getElementById("btn-submit-mod-categoria").value="Modificar Categoría";
}

function abrirPopupAgregarCategoria() {
  overlayModificarCategoria.classList.add("active");
  popupModificarCategoria.classList.add("active");
  document.getElementById("nombreCategoriaMod").value="";
  document.getElementById("btn-submit-mod-categoria").value="Agregar Categoría";
}

function cerrarPopup(){
  overlayModificarCategoria.classList.remove("active");
  popupModificarCategoria.classList.remove("active");  
}



function eliminarCategoria(indiceCategoriaActual){
  var catalogoCategoriasProductos = JSON.parse(localStorage.getItem("catalogoCategoriasProductos"));
  catalogoCategoriasProductos.splice(indiceCategoriaActual,1);
  localStorage.setItem("catalogoCategoriasProductos", JSON.stringify(catalogoCategoriasProductos));
  imprimirCategorias();
}

function verificarAccion(){
  if(document.getElementById("btn-submit-mod-categoria").value=="Modificar Categoría"){
    return modificarCategoria();
  }
  if(document.getElementById("btn-submit-mod-categoria").value=="Agregar Categoría"){
    return agregarCategoria();
  }
}


function agregarCategoria(){
  var catalogoCategoriasProductos = JSON.parse(localStorage.getItem("catalogoCategoriasProductos"));
  var categoriaNueva = {
    nombreCategoria:"",
    productos:[]
  }

  if(document.getElementById("nombreCategoriaMod").value==""){
    return false;
  }
  categoriaNueva.nombreCategoria = document.getElementById("nombreCategoriaMod").value;
  catalogoCategoriasProductos.push(categoriaNueva);
  localStorage.setItem("catalogoCategoriasProductos",JSON.stringify(catalogoCategoriasProductos));
  return true;
}

function modificarCategoria(){
  var catalogoCategoriasProductos = JSON.parse(localStorage.getItem("catalogoCategoriasProductos"));
  var indiceParaModificar = localStorage.getItem("indiceParaModificar");

  if(document.getElementById("nombreCategoriaMod").value==""){
    return false;
  }

  catalogoCategoriasProductos[indiceParaModificar].nombreCategoria = document.getElementById("nombreCategoriaMod").value;
  localStorage.setItem("catalogoCategoriasProductos", JSON.stringify(catalogoCategoriasProductos));

  return true;
}