const API_URL = 'http://localhost:3000/api/products'
const params = new URLSearchParams(window.location.search)
const id = params.get('id')

const nombreProducto = document.getElementById('nombreProducto')
const precioProducto = document.getElementById('precioProducto')
const descripcionProducto = document.getElementById('descripcionProducto')
const idProducto = document.getElementById('idProducto')
const categoriaProducto = document.getElementById('categoriaProducto')
const stockProducto = document.getElementById('stockProducto')

fetch(`${API_URL}/${id}`)
.then((res) => res.json())
.then((data) =>{
    nombreProducto.textContent = data.nombre
    idProducto.textContent = data.id
    precioProducto.textContent = `$${data.precio}`
    descripcionProducto.textContent = data.descripcion 
    stockProducto.textContent = `${data.stock} unidades`
    categoriaProducto.textContent = data.categoria.join(' - ').toUpperCase()
    
   
})
.catch(error  =>{
    console.error({error: `Error al obtener el producto: ${error}`})
})
