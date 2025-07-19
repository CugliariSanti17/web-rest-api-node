const formAuth = document.getElementById('authForm');
const emailAuth = document.getElementById('email');
const passwordAuth = document.getElementById('password');
const mensajeAuth = document.getElementById('authMessage')

const API_URL = 'https://rest-api-node-azure.vercel.app/api'

formAuth.addEventListener('submit', async (e) =>{
    e.preventDefault();

    const email = emailAuth.value;
    const password = passwordAuth.value;

    try {
        const res = await fetch(`${API_URL}/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });

        const data = await res.json();

        if(!res.ok){
           if (data.errores){
            mensajeAuth.textContent = data.errores.map((error) => error.msg).join(' | ')
           } else{
            mensajeAuth.textContent = 'Error al iniciar sesión.'
           }
           mensajeAuth.style.color = 'red';
           return;
        }

        localStorage.setItem('token', data.token);

        mensajeAuth.textContent = '¡Login exitoso!';
        mensajeAuth.style.color = 'green';

        window.location.href = '../index.html';
    } catch (error) {
        mensajeAuth.textContent = `Error al conectar con el servidor`
        mensajeAuth.style.color = 'red';
        console.error(error)
    }
});