let carrito = [];

const botonVaciar = document.getElementById('vaciar-carrito');

botonVaciar.addEventListener('click', () => {
    carrito.length = 0;
    actualizarCarrito()
    actualizarTotalProductos(carrito)
})

const productoContenedor = document.getElementById("producto-contenedor");

productoContenedor.addEventListener("click", (e) => {
    if (e.target.classList.contains('agregar')) {
    validarProductoRepetido(e.target.id)
    }
})

const validarProductoRepetido = (productoId) => {
    const productoRepetido = carrito.find(producto => producto.id == productoId)
    if (!productoRepetido){
        const producto = productos.find(producto => producto.id == productoId);
        carrito.push(producto);
        pintarProductoCarrito(producto)
        guardarStorage(carrito);
        actualizarTotalProductos(carrito)
    }else{
        productoRepetido.cantidad++
        const cantidadProducto = document.getElementById(`cantidad${productoRepetido.id}`);
        cantidadProducto.innerText = `Cantidad: ${productoRepetido.cantidad}`
        actualizarTotalProductos(carrito)
    }
};



const pintarProductoCarrito = (producto) => {
    const contenedor = document.getElementById("carrito-contenedor");
    const div = document.createElement("div");
    div.classList.add("productoEnCarrito");
    div.innerHTML = `
            <p>${producto.nombre}</p>
            <p>Precio:$ ${producto.precio}</p>
            <p id=cantidad${producto.id}>Cantidad: ${producto.cantidad}</p>
            <button class="btn waves-effect waves-ligth boton-eliminar" value="${producto.id}">Eliminar</button>
    `
    contenedor.appendChild(div);
};

const eliminarProducto = (productoId) => {
    const productoIndex = carrito.findIndex(producto => producto.id == productoId);
    carrito.splice(productoIndex, 1);
    actualizarCarrito(carrito);
    actualizarTotalProductos(carrito);
}

const actualizarCarrito = () => {
    const contenedor = document.getElementById("carrito-contenedor");

    contenedor.innerHTML = ''
    
    carrito.forEach(producto => {
        const div = document.createElement("div");
        div.classList.add("productoEnCarrito");
        div.innerHTML += `
            <p>${producto.nombre}</p>
            <p>Precio:$ ${producto.precio}</p>
            <p id=cantidad${producto.id}>Cantidad: ${producto.cantidad}</p>
            <button class="btn waves-effect waves-ligth boton-eliminar" value="${producto.id}">Eliminar</button>
    `
    contenedor.appendChild(div);
    })
};


const guardarStorage = (carrito) => {
    localStorage.setItem('carrito', JSON.stringify(carrito))
};

const obtenerStorage = () => {
    const carritoStorage = JSON.parse(localStorage.getItem('carrito'));
    return carritoStorage;
};

const actualizarTotalProductos = (carrito) => {
    const totalCantidad= carrito.reduce((acc, item) => acc + item.cantidad, 0);
    const totalCompra = carrito.reduce((acc, item) => acc + (item.precio * item.cantidad), 0);

    pintarTotalesCarrito(totalCantidad, totalCompra);
    guardarStorage(carrito);
};

const pintarTotalesCarrito = (totalCantidad, totalCompra) => {
    console.log(totalCantidad);
    const contadorCarrito = document.getElementById('contador-carrito');
    const precioTotal = document.getElementById('precio-total');

    contadorCarrito.innerText = totalCantidad;
    precioTotal.innerText = totalCompra;
}


