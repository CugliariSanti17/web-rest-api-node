const API_URL = 'https://rest-api-node-azure.vercel.app/api/products'
const params = new URLSearchParams(window.location.search)
const id = params.get('id')
const token = localStorage.getItem('token')

const form = document.getElementById('formEditar');
const nombre = document.getElementById('nombre');
const precio = document.getElementById('precio');
const descripcion = document.getElementById('descripcion')
const stock = document.getElementById('stock')
const categoria1 = document.getElementById('categoria1');
const categoria2 = document.getElementById('categoria2')
const mensaje = document.getElementById('mensaje')

fetch(`${API_URL}/${id}`,{
    headers: {
        Authorization: `Bearer ${token}`
    }
})
    .then(res => res.json())
    .then(data => {
        nombre.value = data.nombre;
        precio.value = data.precio;
        descripcion.value = data.descripcion;
        stock.value = data.stock;
        categoria1.value = data.categoria[0];
        categoria2.value = data.categoria[1];
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
        stock: stock.value,
        categoria: [categoria1.value, categoria2.value]
    };

    try {
        const res = await fetch(`${API_URL}/${id}`, {
            method: 'PUT',
            headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
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