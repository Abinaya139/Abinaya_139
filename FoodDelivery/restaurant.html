<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="style.css">
    <title>Restaurant - Food Delivery</title>
</head>
<body>

<header>
    <h1>Available Restaurants</h1>
    <button onclick="logout()">Logout</button>
</header>

<section class="restaurants">
    <h2>Available Restaurants</h2>
    <div class="restaurant-list" id="restaurantList">
        <!-- Restaurant cards will be dynamically inserted here -->
    </div>
</section>

<section id="menuContainer" style="display: none;">
    <h3>Menu</h3>
    <div id="menuItems"></div>
    <button onclick="closeMenu()">Close</button>
</section>

<section id="cartContainer">
    <h3>Your Cart</h3>
    <div id="cartItems"></div>
    <p id="totalAmount"></p>
    <button onclick="showOrderSummary()">Checkout</button>
</section>

<section id="orderSummaryContainer" style="display: none;">
    <h3>Order Summary</h3>
    <div id="orderSummary"></div>
</section>

<footer>
    <div class="container">
        <p>&copy; 2024 Food Delivery Service. All rights reserved.</p>
    </div>
</footer>

<script src="script.js"></script>
<script>
// Sample data for demonstration
const restaurants = [
    { id: 1, name: "Italian Bistro" },
    { id: 2, name: "Sushi Place" },
    { id: 3, name: "Burger Shack" }
];

const menuData = {
    1: [{ item: "Pasta", price: 12 }, { item: "Pizza", price: 10 }],
    2: [{ item: "Sushi Roll", price: 8 }, { item: "Sashimi", price: 15 }],
    3: [{ item: "Cheeseburger", price: 9 }, { item: "Fries", price: 4 }]
};

const cart = [];

// Function to display restaurants
function displayRestaurants() {
    const restaurantList = document.getElementById('restaurantList');
    restaurants.forEach(restaurant => {
        const restaurantCard = document.createElement('div');
        restaurantCard.className = 'restaurant-card';
        restaurantCard.innerHTML = `
            <h4>${restaurant.name}</h4>
            <button onclick="viewMenu(${restaurant.id})">View Menu</button>
        `;
        restaurantList.appendChild(restaurantCard);
    });
}

// Function to view menu
function viewMenu(restaurantId) {
    const menuContainer = document.getElementById('menuContainer');
    const menuItems = document.getElementById('menuItems');
    menuItems.innerHTML = ""; // Clear previous items

    menuData[restaurantId].forEach(menuItem => {
        const itemDiv = document.createElement('div');
        itemDiv.innerHTML = `
            ${menuItem.item} - $${menuItem.price} 
            <button onclick="addToCart('${menuItem.item}', ${menuItem.price})">Add to Cart</button>
        `;
        menuItems.appendChild(itemDiv);
    });

    menuContainer.style.display = 'block';
}

// Function to add items to cart
function addToCart(item, price) {
    cart.push({ item, price });
    updateCartDisplay();
}

// Function to update cart display
function updateCartDisplay() {
    const cartItems = document.getElementById('cartItems');
    cartItems.innerHTML = ""; // Clear previous items
    let total = 0;

    cart.forEach(cartItem => {
        const itemDiv = document.createElement('div');
        itemDiv.textContent = `${cartItem.item} - $${cartItem.price}`;
        cartItems.appendChild(itemDiv);
        total += cartItem.price;
    });

    document.getElementById('totalAmount').textContent = `Total: $${total}`;
}

// Function to close the menu
function closeMenu() {
    const menuContainer = document.getElementById('menuContainer');
    menuContainer.style.display = 'none';
}

// Function to show order summary
function showOrderSummary() {
    const orderSummaryContainer = document.getElementById('orderSummaryContainer');
    const orderSummary = document.getElementById('orderSummary');

    orderSummary.innerHTML = ""; // Clear previous summary
    cart.forEach(cartItem => {
        const itemDiv = document.createElement('div');
        itemDiv.textContent = `${cartItem.item} - $${cartItem.price}`;
        orderSummary.appendChild(itemDiv);
    });

    orderSummaryContainer.style.display = 'block';
}

// Function to logout
function logout() {
    window.location.href = "index.html"; // Redirect back to the login page
}

// Display restaurants when the page loads
window.onload = displayRestaurants;
</script>
</body>
</html>
