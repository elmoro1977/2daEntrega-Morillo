const contenedorCarrito = document.querySelector('.contenedor-carrito')
const checkout = document.querySelector('.contenedor-carrito')



contenedorCarrito.addEventListener('click', (e) => {
    e.stopPropagation();
    if (e.target.classList.contains('boton-eliminar')){
        eliminarProducto(e.target.value);
    }
    
})

