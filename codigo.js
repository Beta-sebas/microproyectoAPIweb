

const menu = document.querySelector("#boton-menu");
menu.addEventListener("click", myFunction);

function myFunction() {
  let x = document.querySelector(".nav-movil");
  if (x.className.indexOf("mostrar-menu") == -1) {
    x.className += " mostrar-menu";
  } else {
    x.className = x.className.replace(" mostrar-menu", "");
  }
}
