let catalogoCategoriasProductos = JSON.parse(localStorage.getItem("catalogoCategoriasProductos"));
let catalogoClientes = JSON.parse(localStorage.getItem("catalogoClientes"));
let listaCategorias = document.getElementById("categorias");
let listaProductos = document.getElementById("productos");
let listaClientes = document.getElementById("clientes");
let metodoPago = document.getElementById("metodopago");
let cajaCantidad = document.getElementById("cantidad");
let arregloCompra = [];
let total = 0;



document.addEventListener("DOMContentLoaded", function () {
    llenarCategorias();
    let categoriaEscogida = listaCategorias.value;
    if(categoriaEscogida==""){
        listaProductos.disabled = true;
    }
    else{
        listaProductos.disabled = false;
    }

    llenarClientes();
});

function llenarCategorias() {
    listaCategorias.innerHTML="";
    listaCategorias.innerHTML=`<option value="" selected="selected"> - selecciona -</option>`;
    catalogoCategoriasProductos.forEach( (categoriaActual, indiceActual) => {
        listaCategorias.innerHTML+=
        `
        <option value="${indiceActual}">${categoriaActual.nombreCategoria}</option>
        `;
    });
}


function llenarProductos(){
    let categoriaEscogida = listaCategorias.value;
    console.log(categoriaEscogida);

    if(categoriaEscogida==""){
        listaProductos.disabled = true;
        listaProductos.innerHTML="";
        listaProductos.innerHTML=`<option value="" selected="selected"> - selecciona -</option>`;
    }
    else{
        listaProductos.disabled = false;
        listaProductos.innerHTML="";
        listaProductos.innerHTML=`<option value="" selected="selected"> - selecciona -</option>`;
        catalogoCategoriasProductos[categoriaEscogida].productos.forEach((productoActual, indiceActual) => {
            listaProductos.innerHTML+=`<option value="${indiceActual}">${productoActual.nombre}</option>`;
        });
    }
}

function llenarClientes(){
    listaClientes.innerHTML="";
    listaClientes.innerHTML=`<option value="" selected="selected"> - selecciona -</option>`;
    catalogoClientes.forEach( (clienteActual, indiceActual) => {
        listaClientes.innerHTML+=
        `
        <option value="${indiceActual}">${clienteActual.nombre} ${clienteActual.apellido}</option>
        `;
    });
}

function descargarCotizacion(){
  const element = document.getElementById("contenedorListaCompras");
  html2pdf()
  .from(element)
  .save("cotizacion");
}

function validarProducto(){
  if (listaCategorias.value==""||listaProductos.value==""||cajaCantidad.value<=0) {
    document.getElementById("alertaProducto").classList.add("active");
  }
  else {
    document.getElementById("alertaProducto").classList.remove("active");
    agregarProductoALaCompra();
  }
}

function validarCotizacion(){
  if (arregloCompra.length==0) {
    document.getElementById("alertaProducto").classList.add("active");
  }
  else {
    document.getElementById("alertaProducto").classList.remove("active");
    descargarCotizacion();
  }
}



function quitarAlerta() {

  document.getElementById("alertaProducto").classList.remove("active");
}

function agregarProductoALaCompra() {
    let categoriaEscogida = document.getElementById("categorias");
    let txtCategoria = categoriaEscogida.options[categoriaEscogida.selectedIndex].text;
    let productoEscogido = document.getElementById("productos");
    let txtProducto = productoEscogido.options[productoEscogido.selectedIndex].text;
    let cantidad = parseInt(document.getElementById("cantidad").value,10);

    let compraIndividual = {
        categoria:txtCategoria,
        producto:txtProducto,
        cantidad:cantidad
    };

    arregloCompra.push(compraIndividual);
    categoriaEscogida.value="";
    llenarProductos();
    cajaCantidad.value=0;
    imprimirProductosCompra();

}


function imprimirProductosCompra() {
  let catalogoCategoriasProductos = JSON.parse(localStorage.getItem("catalogoCategoriasProductos"));
  let txt = "";
    document.getElementById("contenedorListaCompras").innerHTML="";
    total=0;
    arregloCompra.forEach((compraIndividualActual, indiceActual) => {
      let categoriaEncontrada = catalogoCategoriasProductos.find(element => element.nombreCategoria==compraIndividualActual.categoria);
      let productoEncontrado = categoriaEncontrada.productos.find(element => element.nombre==compraIndividualActual.producto);
      let precioIndividual = productoEncontrado.precioEntradas;
      let precioTotal = precioIndividual*compraIndividualActual.cantidad;
      
      total+= precioTotal;
        txt+=
        `
        <tr>
          <td>${compraIndividualActual.producto}</td>
          <td>${compraIndividualActual.cantidad}</td>
          <td>${precioTotal}</td>
          <td class="transparente"><input type="button" class="botonEliminar" name="eliminar" value="x" onclick = "eliminarProducto(${indiceActual})"></td>
        </tr>
        `;
    });
    document.getElementById("contenedorListaCompras").innerHTML="";
    let tablaCompleta =
     `
      <table>
        <thead>
          <tr>
            <th>Producto</th>
            <th>Cantidad</th>
            <th>Precio</th>
            <th>Eliminar</th>
          </tr>
        </thead>
        <tbody>
        ${txt}
        <tr>
          <td colspan="2">TOTAL:</td>
          <td>${total}</td>
        </tr>
        </tbody>
      </table>
      `;
    document.getElementById("contenedorListaCompras").innerHTML= tablaCompleta;
}

function eliminarProducto (indice){
  arregloCompra.splice(indice,1);
  imprimirProductosCompra();
}

function validarCliente(){
  if (listaClientes.value==""||metodoPago.value=="") {
    document.getElementById("alertaCliente").classList.add("active");
  }
  else {
    document.getElementById("alertaCliente").classList.remove("active");
    operacionSalida();
  }
}

function quitarAlertaCliente(){
  document.getElementById("alertaCliente").classList.remove("active");
}

function operacionSalida(){
  let d = new Date();
  let n = d.toLocaleString();
  let ventaFinal = {
    numeroVenta:0,
    cliente:"",
    productos:[],
    total:0,
    fecha:"",
    metodoPago:"",
    responsable:""
  };

  let clienteEscogido = document.getElementById("clientes");
  let txtCliente = clienteEscogido.options[clienteEscogido.selectedIndex].text;
  let metodoPago = document.getElementById("metodopago");
  let txtMetodoPago = metodoPago.options[metodoPago.selectedIndex].text;
  let usuarios = JSON.parse(localStorage.getItem("usuarios"));
  let usuarioEncontrado = usuarios.find(element => element.logueado==1);
  ventaFinal.cliente = txtCliente;
  ventaFinal.productos = arregloCompra;
  ventaFinal.total = total;
  ventaFinal.fecha = n;
  ventaFinal.metodoPago = txtMetodoPago;
  ventaFinal.responsable = usuarioEncontrado.usuario;
  

  if (localStorage.getItem("operacionesSalida")==null) {
    let arregloVacio = [];
    localStorage.setItem("operacionesSalida", JSON.stringify(arregloVacio));
    ventaFinal.numeroVenta = 1;
  }
  else {
    let numeroDeOpercaion = JSON.parse(localStorage.getItem("operacionesSalida"));
    ventaFinal.numeroVenta = numeroDeOpercaion.length+1;
  }

  let operacionesSalida = JSON.parse(localStorage.getItem("operacionesSalida"));
  operacionesSalida.push(ventaFinal);
  localStorage.setItem("operacionesSalida", JSON.stringify(operacionesSalida));

  let catalogoCategoriasProductos = JSON.parse(localStorage.getItem("catalogoCategoriasProductos"));
  arregloCompra.forEach((compraIndividualActual, indiceActual) => {
    let categoriaEncontrada = catalogoCategoriasProductos.find(element => element.nombreCategoria==compraIndividualActual.categoria);
    let productoEncontrado = categoriaEncontrada.productos.find(element => element.nombre==compraIndividualActual.producto);
    productoEncontrado.unidades-= compraIndividualActual.cantidad;
  });
  localStorage.setItem("catalogoCategoriasProductos", JSON.stringify(catalogoCategoriasProductos)); 
  window.location.href = "home.html";
}
