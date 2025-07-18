const API_URL = 'https://rest-api-node-azure.vercel.app/api/products'
const params = new URLSearchParams(window.location.search)
const id = params.get('id')

const form = document.getElementById('formEditar');
const nombre = document.getElementById('nombre');
const precio = document.getElementById('precio');
const descripcion = document.getElementById('descripcion')
const stock = document.getElementById('stock')
const mensaje = document.getElementById('mensaje')

fetch(`${API_URL}/${id}`)
    .then(res => res.json())
    .then(data => {
        nombre.value = data.nombre;
        precio.value = data.precio;
        descripcion.value = data.descripcion;
        stock.value = data.stock;
    })
    .catch(error => {
        mensaje.textContent = 'Error al cargar el producto';
        console.error(error);
    });

form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const productoActualizado = {
        nombre: nombre.value,
        precio: precio.value,
        descripcion: descripcion.value,
        stock: stock.value
    };

    try {
        const res = await fetch(`${API_URL}/${id}`, {
            method: 'PUT',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(productoActualizado)
        });

        const data = await res.json();

        //Producto con errores
        if (!res.ok) {
            if (data.errores) {
                mensaje.textContent = data.errores.map(error => error.msg).join(' | ');
            } else {
                mensaje.textContent = 'Error al actualizar el producto';
            }
            mensaje.style.color = 'red';
            return;
        };

        //Producto creado
        mensaje.textContent = 'Producto actualizado correctamente';
        mensaje.style.color = 'green';
        form.reset();

        setTimeout(() => {
            window.location.href = '../index.html';
        }, 1000);

    }catch (error) {
        mensaje.textContent = 'Error al conectar con el servidor';
        mensaje.style.color = 'red';
        console.error(error);
    }
});