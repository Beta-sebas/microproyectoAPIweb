document.addEventListener('DOMContentLoaded', function () {

    imprimirProveedores();

});


function imprimirProveedores(){
    //arreglo de proveedores
    var catalogoProveedores= JSON.parse(localStorage.getItem('catalogoProveedores'));
    document.getElementById('contenedorInformacion').innerHTML=" ";

    catalogoProveedores.forEach( (proveedorActual, indiceActual) => {
      document.getElementById('contenedorInformacion').innerHTML+=
      `
      <div class="itemInformacion">
            <div class="parteIzquierdaitemInformacion">
              <div class="titulo">
                <h2>${proveedorActual.nombre} ${proveedorActual.apellido}</h2>
              </div>
              <div class="descripcion">
                <ul>
                  <li>Direccion: ${proveedorActual.direccion}</li>
                  <li>Email: ${proveedorActual.email}</li>
                  <li>Telefono: ${proveedorActual.telefono}</li>
                </ul>
              </div>
            </div>

            <div class="parteDerechaitemInformacion">
              <div>
                  <a class="botonModificar" href="modificar_proveedores.html" onclick="modificarProveedor(${indiceActual})"><img class="imgModificar" src="../imagenes/lapiz.png" alt="Modificar" title="Modificar"></a>
              </div>
              <div>
              <a class="botonEliminar" href="#" onclick="eliminarProveedor(${indiceActual})"><img class="imgEliminar" src="../imagenes/eliminar.png" alt="Eliminar" title="Eliminar"></a>
              </div>
            </div>
      </div>
      `;

    });
  }

  function eliminarProveedor(indiceActual){
    var catalogoProveedores= JSON.parse(localStorage.getItem('catalogoProveedores'));
    catalogoProveedores.splice(indiceActual,1);
    localStorage.setItem("catalogoProveedores",JSON.stringify(catalogoProveedores));
    imprimirProveedores();
  }

  function modificarProveedor(indiceActual) {
    localStorage.setItem("indiceParaModificar", indiceActual);
  }
