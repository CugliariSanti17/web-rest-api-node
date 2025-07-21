const API_URL = 'https://rest-api-node-azure.vercel.app/api/products'
const token = localStorage.getItem('token')

const form = document.getElementById('formPublicar');
const nombre = document.getElementById('nombreProducto');
const precio = document.getElementById('precioProducto');
const descripcion = document.getElementById('descripcionProducto');
const stock = document.getElementById('stockProducto');
const categoria1 = document.getElementById('categoria1')
const categoria2 = document.getElementById('categoria2')
const mensaje = document.getElementById('mensajeCrearProducto');

form.addEventListener('submit', async (e) => {
    e.preventDefault()

    const nuevoProducto = {
        nombre: nombre.value.trim(),
        precio: parseFloat(precio.value),
        descripcion: descripcion.value.trim(),
        stock: parseInt(stock.value),
        categoria: [categoria1.value, categoria2.value]
    }

    try {
    const res = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(nuevoProducto)
    });

    const data = await res.json();

    //Producto con errores
    if (!res.ok) {
      // Si el servidor responde con errores de validación
      if (data.errores) {
        mensaje.textContent = data.errores.map(error => error.msg).join(' | ');
      } else {
        mensaje.textContent = 'Error al crear producto';
      }
      mensaje.style.color = 'red';
      return;
    };

    //Producto creado
    mensaje.textContent = 'Producto creado correctamente';
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