document.addEventListener('DOMContentLoaded', () => {
    const registerForm = document.querySelector('form');

    registerForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const username = document.getElementById('username').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const confirmPassword = document.getElementById('confirm-password').value;

        if (password !== confirmPassword) {
            alert('Las contraseñas no coinciden');
            return;
        }

        const users = JSON.parse(localStorage.getItem('users')) || [];
        users.push({ username, email, password });

        localStorage.setItem('users', JSON.stringify(users));

        alert('Registro exitoso');
        window.location.href = './login.html';
    });
});
