let restaurants = [
    { id: 1, name: "Pizza Place", price: 10, img: Food Delivery/pizza.jpg },
    { id: 2, name: "Sushi Spot", price: 15, img: Food Delivery/sushi.jpg },
    { id: 3, name: "Burger Joint", price: 8, img: Food Delivery/Burger.jpg },

let cart = [];

function login() {
    // Simulate login
    window.location.href = "restaurant.html";
}

function loadRestaurants() {
    const restaurantList = document.getElementById("restaurant-list");
    restaurants.forEach(restaurant => {
        const item = document.createElement("div");
        item.className = "restaurant-item";
        item.innerHTML = `
            <img src="${restaurant.img}" alt="${restaurant.name}" style="width: 50px; height: 50px;">
            <div>
                <strong>${restaurant.name}</strong><br>
                $${restaurant.price}
            </div>
            <button onclick="addToCart(${restaurant.id})">Add to Cart</button>
        `;
        restaurantList.appendChild(item);
    });
}

function addToCart(id) {
    const restaurant = restaurants.find(r => r.id === id);
    cart.push(restaurant);
    updateCart();
}

function updateCart() {
    const cartItems = document.getElementById("cart-items");
    cartItems.innerHTML = "";
    cart.forEach((item, index) => {
        const cartItem = document.createElement("div");
        cartItem.className = "cart-item";
        cartItem.innerHTML = `
            <span>${item.name} - $${item.price}</span>
            <button onclick="removeFromCart(${index})">Remove</button>
        `;
        cartItems.appendChild(cartItem);
    });
    const totalPrice = cart.reduce((total, item) => total + item.price, 0);
    cartItems.innerHTML += `<div><strong>Total: $${totalPrice}</strong></div>`;
}

function removeFromCart(index) {
    cart.splice(index, 1);
    updateCart();
}

function checkout() {
    if (cart.length === 0) {
        alert("Your cart is empty. Please add items to your cart before checking out.");
        return;
    }
    
    const orderSummary = cart.map(item => `${item.name} - $${item.price}`).join("\n");
    const totalPrice = cart.reduce((total, item) => total + item.price, 0);
    
    const confirmation = confirm(`You are about to order:\n${orderSummary}\n\nTotal: $${totalPrice}\n\nDo you want to confirm your order?`);
    
    if (confirmation) {
        alert("Checkout successful! Your order has been placed.");
        cart = [];  // Clear the cart after successful checkout
        updateCart();  // Update cart display
    }
}

// Load restaurants on page load
if (document.getElementById("restaurant-list")) {
    loadRestaurants();
}
