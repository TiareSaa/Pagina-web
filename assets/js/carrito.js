document.addEventListener("DOMContentLoaded", () => {
    // Redirigir al login si no está autenticado
    if (localStorage.getItem('loggedIn') !== 'true') {
        window.location.href = '../pages/AUTH-inicio-sesion.html';
    }

    // Elementos del DOM
    const cartItemsContainer = document.getElementById('cart-items');
    const purchaseBtn = document.getElementById('purchase-btn');
    const cancelBtn = document.getElementById('cancel-btn');
    const cartCount = document.querySelector('#cart-count');

    // Cargar elementos del carrito y vehículos desde localStorage
    let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    let vehicles = JSON.parse(localStorage.getItem('vehicles')) || [];

    // Función para renderizar los elementos del carrito
    const renderCartItems = () => {
        cartItemsContainer.innerHTML = '';
        cartItems.forEach((item, index) => {
            const cartItem = document.createElement('div');
            cartItem.className = 'col-xs-12 col-sm-6 col-md-4 col-lg-4 mb-4';
            cartItem.innerHTML = `
                <div class="card h-100">
                    <img src="${item.imageUrl}" class="card-img-top" alt="${item.Marca}">
                    <div class="card-body">
                        <h5 class="card-title">${item.Marca}</h5>
                        <p class="card-text">
                            Año: ${item.AÑO}<br>
                            País: ${item.pais}<br>
                            HP: ${item.HP}<br>
                            Motor: ${item.MOTOR}
                        </p>
                        <button class="btn btn-danger" onclick="removeFromCart(${index})">Eliminar</button>
                    </div>
                </div>
            `;
            cartItemsContainer.appendChild(cartItem);
        });
    };

    // Función para actualizar el contador del carrito
    const updateCartCount = () => {
        if (cartCount) {
            cartCount.textContent = cartItems.length;
        }
    };

    // Función para eliminar un elemento del carrito
    window.removeFromCart = (index) => {
        const item = cartItems.splice(index, 1)[0];
        const vehicle = vehicles.find(v => v.id === item.id);
        if (vehicle) {
            vehicle.stock += 1;
        }
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
        localStorage.setItem('vehicles', JSON.stringify(vehicles));
        renderCartItems();
        updateCartCount();
    };

    // Función para realizar la compra
    purchaseBtn.addEventListener('click', () => {
        alert('Su compra está en camino.');
        cartItems = [];
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
        window.location.href = 'tienda.html';
    });

    // Función para cancelar la compra
    cancelBtn.addEventListener('click', () => {
        alert('Compra cancelada.');
        // Restaurar el stock de los vehículos
        vehicles.forEach(vehicle => {
            const cartItemCount = cartItems.filter(item => item.id === vehicle.id).length;
            vehicle.stock += cartItemCount;
        });
        cartItems = [];
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
        localStorage.setItem('vehicles', JSON.stringify(vehicles));
        window.location.href = 'tienda.html';
    });

    // Renderizar los elementos del carrito
    renderCartItems();
    updateCartCount();
});
