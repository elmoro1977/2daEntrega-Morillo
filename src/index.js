document.addEventListener("DOMContentLoaded", () =>{
    pintarProductos();


    if (localStorage.getItem('carrito')){
        carrito = obtenerStorage();
        actualizarCarrito(carrito)
        actualizarTotalProductos(carrito)
    }
})