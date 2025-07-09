const API_URL = 'http://localhost:3000/api/products'
const params = new URLSearchParams(window.location.search)
const id = params.get('id')

const nombreProducto = document.getElementById('nombreProducto')
const precioProducto = document.getElementById('precioProducto')
const descripcionProducto = document.getElementById('descripcionProducto')

fetch(`${API_URL}/${id}`)
.then((res) => res.json())
.then((data) =>{
    nombreProducto.textContent = data.nombre
    precioProducto.textContent = `$${data.precio}`
    descripcionProducto.textContent = data.descripcion 
})
.catch(error  =>{
    console.error({error: `Error al obtener el producto: ${error}`})
})
