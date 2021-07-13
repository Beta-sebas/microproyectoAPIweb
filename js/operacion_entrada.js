let catalogoCategoriasProductos = JSON.parse(localStorage.getItem("catalogoCategoriasProductos"));
let catalogoProveedores = JSON.parse(localStorage.getItem("catalogoProveedores")); 
let listaCategorias = document.getElementById("categorias");
let listaProductos = document.getElementById("productos");
let listaProveedores = document.getElementById("proveedores");

let arregloCompra = [];



document.addEventListener("DOMContentLoaded", function () {
    llenarCategorias();
    let categoriaEscogida = listaCategorias.value;
    if(categoriaEscogida==""){
        listaProductos.disabled = true;
    }
    else{
        listaProductos.disabled = false;
    }

    llenarProveedores();
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
    }
    else{
        listaProductos.disabled = false;
    }

    listaProductos.innerHTML="";
    listaProductos.innerHTML=`<option value="" selected="selected"> - selecciona -</option>`;
    catalogoCategoriasProductos[categoriaEscogida].productos.forEach((productoActual, indiceActual) => {
        listaProductos.innerHTML+=`<option value="${indiceActual}">${productoActual.nombre}</option>`;
    });
}

function llenarProveedores(){
    listaProveedores.innerHTML="";
    listaProveedores.innerHTML=`<option value="" selected="selected"> - selecciona -</option>`;
    catalogoProveedores.forEach( (proveedorActual, indiceActual) => {
        listaProveedores.innerHTML+=
        `
        <option value="${indiceActual}">${proveedorActual.nombre} ${proveedorActual.apellido}</option>
        `;
    });
}

function agregarProductoALaCompra() {
    let categoriaEscogida = document.getElementById("categorias");
    let txtCategoria = categoriaEscogida.options[categoriaEscogida.selectedIndex].text;
    let productoEscogido = document.getElementById("productos");
    let txtProducto = productoEscogido.options[productoEscogido.selectedIndex].text;
    let cantidad = document.getElementById("cantidad").value;

    let compraIndividual = {
        categoria:txtCategoria,
        producto:txtProducto,
        cantidad:cantidad
    };

    arregloCompra.push(compraIndividual);
    categoriaEscogida.value="";
    llenarProductos();
    document.getElementById("cantidad").value=0;
    
}


function imprimirProductosCompra() {
    document.getElementById("contenedorListaCompras").innerHTML="";
    arregloCompra.forEach((compraIndividualActual, indiceActual) => {
        document.getElementById("contenedorListaCompras").innerHTML=
        `
        `;
    });
}