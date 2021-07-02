document.addEventListener('DOMContentLoaded', function () {

    imprimirClientes();

});


function imprimirClientes(){
    //arreglo de clientes
    var catalogoClientes= JSON.parse(localStorage.getItem('catalogoClientes'));
    document.getElementById('contenedorInformacion').innerHTML=" ";

    catalogoClientes.forEach( (clienteActual, indiceActual) => {
      document.getElementById('contenedorInformacion').innerHTML+=
      `
      <div class="itemInformacion">
            <div class="parteIzquierdaitemInformacion">
              <div class="titulo">
                <h2>${clienteActual.nombre} ${clienteActual.apellido}</h2>
              </div>
              <div class="descripcion">
                <ul>
                  <li>Direccion: ${clienteActual.direccion}</li>
                  <li>Email: ${clienteActual.email}</li>
                  <li>Telefono: ${clienteActual.telefono}</li>
                </ul>
              </div>
            </div>

            <div class="parteDerechaitemInformacion">
              <div>
                  <a class="botonModificar" href="modificar_clientes.html" onclick="modificarCliente(${indiceActual})"><img class="imgModificar" src="../imagenes/lapiz.png" alt="Modificar" title="Modificar"></a>
              </div>
              <div>
              <a class="botonEliminar" href="#" onclick="eliminarCliente(${indiceActual})"><img class="imgEliminar" src="../imagenes/eliminar.png" alt="Eliminar" title="Eliminar"></a>
              </div>
            </div>
      </div>
      `;

    });
  }

  function eliminarCliente(indiceActual){
    var catalogoClientes= JSON.parse(localStorage.getItem('catalogoClientes'));
    catalogoClientes.splice(indiceActual,1);
    localStorage.setItem("catalogoClientes",JSON.stringify(catalogoClientes));
    imprimirClientes();
  }

  function modificarCliente(indiceActual) {
    localStorage.setItem("indiceParaModificar", indiceActual);
  }
