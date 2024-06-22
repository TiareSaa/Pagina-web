document.addEventListener("DOMContentLoaded", () => {
    // Redirigir al login si no está autenticado
    if (localStorage.getItem("loggedIn") !== "true") {
        window.location.href = "login.html";
    }

    const catalog = document.getElementById("catalog");
    let cartCount = null;
    let cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
    let vehicles = [];

    // Función para generar stock aleatorio
    function generateRandomStock() {
        return Math.floor(Math.random() * 100) + 1; // Stock entre 1 y 100
    }

    // Función para inicializar el stock en localStorage
    function initializeStock(vehicles) {
        let storedStock = JSON.parse(localStorage.getItem("vehicleStock"));
        if (!storedStock) {
            storedStock = vehicles.map(vehicle => ({
                id: vehicle.id,
                stock: generateRandomStock()
            }));
            localStorage.setItem("vehicleStock", JSON.stringify(storedStock));
        }
        return storedStock;
    }

    // Función para renderizar las cartas
    function renderCards(vehicles) {
        catalog.innerHTML = "";
        vehicles.forEach((vehicle) => {
            const card = document.createElement("div");
            card.className = "col-xs-12 col-sm-6 col-md-4 col-lg-4 mb-4";
            card.innerHTML = `
                <div class="card h-100">
                    <img src="${vehicle.imageUrl}" class="card-img-top" alt="${vehicle.Marca}">
                    <div class="card-body">
                        <h5 class="card-title">${vehicle.Marca}</h5>
                        <p class="card-text">
                            Año: ${vehicle.AÑO}<br>
                            País: ${vehicle.pais}<br>
                            HP: ${vehicle.HP}<br>
                            Motor: ${vehicle.MOTOR}<br>
                            Stock: ${vehicle.stock}
                        </p>
                        <button class="btn btn-primary" onclick="buyVehicle(${vehicle.id})">Comprar</button>
                    </div>
                </div>
            `;
            catalog.appendChild(card);
        });
    }

    // Función para actualizar el contador del carrito
    const updateCartCount = () => {
        cartCount = document.querySelector("#cart-count");
        if (cartCount) {
            cartCount.textContent = cartItems.length;
        }
    };

    // Función para comprar un vehículo
    window.buyVehicle = (id) => {
        const vehicle = vehicles.find(v => v.id === id);
        if (vehicle) {
            if (vehicle.stock <= 0) {
                alert("Vehículo no disponible en stock.");
                return;
            }
            vehicle.stock -= 1;
            cartItems.push(vehicle);
            updateCartCount();
            localStorage.setItem("cartItems", JSON.stringify(cartItems));
            localStorage.setItem("vehicleStock", JSON.stringify(vehicles.map(v => ({ id: v.id, stock: v.stock }))));
            renderCards(vehicles);
        } else {
            alert("Vehículo no encontrado.");
        }
    };

    // Obtener vehículos desde la API
    fetch("https://api-vehiculos-lj3j.onrender.com/")
        .then((response) => response.json())
        .then((data) => {
            if (data.ok && data.statusCode === 200) {
                let vehicleStock = initializeStock(data.vehiculos);
                vehicles = data.vehiculos.map(vehicle => ({
                    ...vehicle,
                    stock: vehicleStock.find(stockItem => stockItem.id === vehicle.id).stock,
                    imageUrl: vehicle.imageUrl // Asignar imágenes
                }));
                renderCards(vehicles);
            } else {
                console.error("Error en la respuesta de la API:", data);
            }
        })
        .catch((error) => console.error("Error fetching data:", error));

    updateCartCount();
});
