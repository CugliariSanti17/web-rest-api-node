const token = localStorage.getItem('token')

if (!token) {
    window.location.href = './pages/auth.html'
}

const API_URL = 'https://rest-api-node-azure.vercel.app/api/products'
const contenedorProductos = document.getElementById('productsContainer')

const renderizarProductos = (productos) => {
    contenedorProductos.innerHTML = ''

    productos.forEach(producto => {
        const div = document.createElement("div");
        div.className = "product"

        div.innerHTML = `
            <h3>${producto.nombre}</h3>
            <p>${producto.descripcion}</p>
            <strong>$${producto.precio}</strong>
            <div class="botonesContainer">
                <button class="eliminar-btn" data-id="${producto.id}">Eliminar</button>
                <button class="editar-btn" data-id="${producto.id}">Editar</button>
            </div>
            <button class="detalle-btn" data-id="${producto.id}">Ver mas detalles</button>
        `

        contenedorProductos.appendChild(div);
    });

    const botonEliminar = document.querySelectorAll('.eliminar-btn')

    botonEliminar.forEach((btn) => {
        btn.addEventListener('click', () => {
            const id = btn.getAttribute('data-id');

            Swal.fire({
                title: '¿Estás seguro?',
                text: "No podrás revertir esto",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#d33',
                cancelButtonColor: '#3085d6',
                confirmButtonText: 'Sí, eliminar',
                cancelButtonText: 'Cancelar'
            }).then((result) => {
                if (result.isConfirmed) {
                    fetch(`${API_URL}/${id}`, {
                        headers: {
                            Authorization: `Bearer ${token}`
                        },
                        method: "DELETE",
                    })
                        .then(res => res.json())
                        .then(() => {
                            fetch(API_URL, {
                                headers: { Authorization: `Bearer ${token}` }
                            })
                                .then(res => res.json())
                                .then(data => renderizarProductos(data));

                            Swal.fire(
                                'Eliminado',
                                'El producto fue eliminado correctamente.',
                                'success'
                            );
                        });
                }
            });
        });

    })

    const botonEditar = document.querySelectorAll('.editar-btn')

    botonEditar.forEach((btn) => {
        btn.addEventListener('click', () => {
            const id = btn.getAttribute('data-id')

            window.location.href = `./pages/editarProducto.html?id=${id}`
        })
    })

    const botonDetalle = document.querySelectorAll('.detalle-btn')

    botonDetalle.forEach((btn) => {
        btn.addEventListener('click', () => {
            const id = btn.getAttribute('data-id')

            window.location.href = `./pages/verDetalle.html?id=${id}`
        })
    })
};

const filtroCategoria = document.getElementById('filtroCategoria');

filtroCategoria.addEventListener('change', () => {
    const categoria = filtroCategoria.value;
    const url = categoria ? `${API_URL}?category=${encodeURIComponent(categoria)}` : API_URL;

    fetch(url, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
        .then(res => res.json())
        .then(data => renderizarProductos(data))
        .catch(error => {
            contenedorProductos.innerHTML = "<p>Error al filtrar productos.</p>";
            console.error("Error:", error);
        });
})

const formBuscar = document.getElementById('searchProductForm');
const buscador = document.getElementById('buscador')

formBuscar.addEventListener('submit', (e) => {
    e.preventDefault();

    const nombreProducto = buscador.value.trim();
    const url = nombreProducto ? `${API_URL}/search?name=${encodeURIComponent(nombreProducto)}` : API_URL;

    fetch(url, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
        .then(res => res.json())
        .then(data => renderizarProductos(data))
        .catch(error => {
            contenedorProductos.innerHTML = "<p>Error al buscar productos.</p>";
            console.error("Error:", error);
        });
});

fetch(API_URL, {
    headers: {
        Authorization: `Bearer ${token}`
    }
})
    .then((res) => {
        if (res.status === 401 || res.status === 403) {
            localStorage.removeItem('token');
            Swal.fire({
                icon: 'info',
                title: 'Sesión expirada',
                text: 'Por favor, iniciá sesión nuevamente.'
            }).then(() => {
                window.location.href = './pages/auth.html';
            });
            return;
        }

        return res.json()
    })
    .then(data => {
        renderizarProductos(data)
    })
    .catch((error) => {
        contenedorProductos.innerHTML = "<p>Error al cargar productos.</p>";
        console.error("Error:", error);
    })

