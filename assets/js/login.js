document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('login-form');
    console.log('DOM fully loaded and parsed');

    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        console.log('Form submitted');

        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        console.log(`Username: ${username}, Password: ${password}`);

        const users = JSON.parse(localStorage.getItem('users')) || [];
        console.log('Users from localStorage:', users);

        const user = users.find(user => user.username === username && user.password === password);
        console.log('User found:', user);

        if (user) {
            localStorage.setItem('loggedIn', 'true');
            console.log('Login successful, loggedIn set to true');
            window.location.href = 'tienda.html';
        } else {
            alert('Nombre de usuario o contraseña incorrectos');
            console.log('Login failed');
        }
    });

    const loggedIn = localStorage.getItem('loggedIn');
    console.log('LoggedIn status:', loggedIn);

    if (loggedIn === 'true') {
        console.log('Already logged in, redirecting');
        window.location.href = 'tienda.html';
    }
});
