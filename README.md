# Inventario de productos

## Funcionalidades de la aplicacion:
- **Inicio de sesión**
- **Ver todos los productos**
- **Buscar productos por nombre**
- **Filtrar productos por categoria**
- **Ver más detalles del producto**
- **Editar producto**
- **Agregar producto**
- **Eliminar producto**

---

### Inicio de sesión

- **Descripción:** Inicio de sesion para verificar que el usuarios esté autorizado para realizar todas las funcionalidades. El mismo tiene un vencimiento de 1 hora. Pasado el tiempo, se volverá a pedir el registro del usuario nuevamente.

- **Campos a completar:**
    - `Email = user@gmail.com`
    - `Contraseña = talentotech`

---

### Ver todos los productos
- **Descripción:** Al cargar la página podrás ver un listado de todos los productos.

---

### Buscar productos por nombre
- **Descripción:** En el buscador ubicado arriba a la izquierda podrás buscar productos por su nombre.

- **Campos a completar:**
    - `Nombre del producto`

> ⚠️ **Importante:** ⚠️
>Aquellos productos que llevan tilde en su nombre deberán ser buscados tal cual como están escritos. De lo contrario la busqueda no será efectiva. 

---

### Filtrar productos por categoria

- **Descripción:** En la parte superior derecha podrás encontrar un selector de opciones. Cada opcion equivale a una categoria diferente donde se mostrarán los productos que pertenecen a la misma.


---

### Ver más detalles del producto

- **Descripción:** Cada producto contiene un boton que dice "Ver más detalles". El mismo permite ver informacion del producto que no se ve a simple vista (Id, categoria y stock).

---

### Editar producto

- **Descripción:** En cada producto podrás encontrar un boton llamado "Editar". El mismo permite cambiar los datos de un producto específico mediante un formulario.

- **Campos a completar:**
    - `Nombre` 
    - `Precio`
    - `Descripción`
    - `Stock`
    - `Categoría 1`
    - `Categoría 2`

> ⚠️ **Importante:** ⚠️
> Intenta NO dejar algun campo del formulario vacío. Si esto sucede, la propiedad del campo vacío será borrada.

---

### Agregar un producto

- **Descripción:** En la parte superior central encontraremos un boton "Agregar producto". El mismo permite subir un nuevo producto al inventario.

- **Campos a completar:**
    - `Nombre`
    - `Precio`
    - `Descripción`
    - `Stock`
    - `Categoría 1`
    - `Categoría 2`

> ⚠️ **Importante:** ⚠️
> Todos los campos son requeridos.

---

### Eliminar un producto

- **Descripción:** Cada producto contiene un boton de eliminar. Antes de hacerlo saldrá una alerta para confirmar que estas seguro de ejecutar la acción.

> ⚠️ **Importante:** ⚠️
> Una vez eliminado el producto no hay forma de recuperarlo. Debes crear un nuevo producto con las propiedas iguales o similares al producto eliminado. 

---

## Estructura del proyecto

```
web/
├── Pages/
│   ├── auth.html
│   └── editarProdudcto.html
│   ├── publicarProductos.html
│   └── verDetalle.html 
│
├── Js/
│   ├── agregar.js
│   └── auth.js
│   ├── detalle.js
│   └── editar.js
│    
│ 
└── Css/
    ├── stylesAuth.css
    └── stylesDetalle.css
    ├── stylesEditar.css
    ├── stylesIndex.css
    └── stylesPublicar.css

``` 

---

