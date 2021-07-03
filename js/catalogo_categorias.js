document.addEventListener("DOMContentLoaded", function () {

  imprimirCategorias();

});

function imprimirCategorias () {
  let catalogoCategoriasProductos = JSON.parse(localStorage.getItem("catalogoCategoriasProductos"));
  document.getElementById('contenedorInformacion').innerHTML=" ";

    catalogoCategoriasProductos.forEach( (categoriaActual, indiceActual) => {
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
                            <a class="botonModProducto" href="modificar_clientes.html" onclick="modificarCliente(${indiceActual})"><img class="imgModificar" src="../imagenes/lapiz.png" alt="Modificar" title="Modificar"></a>
                        </div>
                        <div>
                        <a class="botonElimiProducto" href="#" onclick="eliminarCliente(${indiceActual})"><img class="imgEliminar" src="../imagenes/eliminar.png" alt="Eliminar" title="Eliminar"></a>
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
              <a class="botonAgregar" href="#" onclick="eliminarCliente(${indiceActual})"><img class="imgAgregar" src="../imagenes/agregar.png" alt="Añadir" title="Agregar"></a>
            </div>
            <div>
              <a class="botonModificar" href="modificar_clientes.html" onclick="modificarCliente(${indiceActual})"><img class="imgModificar" src="../imagenes/lapiz.png" alt="Modificar" title="Modificar"></a>
            </div>
            <div>
              <a class="botonEliminar" href="#" onclick="eliminarCliente(${indiceActual})"><img class="imgEliminar" src="../imagenes/eliminar.png" alt="Eliminar" title="Eliminar"></a>
            </div>
          </div>
          <div class="productos">
          ${txt}
          </div>
    </div>
    `;
  });
}
