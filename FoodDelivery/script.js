function login(event) {
    event.preventDefault(); // Prevent form submission

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Dummy validation - replace with actual validation
    if (username === "user" && password === "pass") {
        // Redirect to the restaurant page
        window.location.href = "restaurant.html"; // Ensure this path is correct
    } else {
        alert("Invalid credentials. Please try again.");
    }
}
// Sample user data for demonstration
const validCredentials = {
    username: "user",
    password: "pass"
};

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

// Login function
function login(event) {
    event.preventDefault(); // Prevent form submission

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Validate credentials
    if (username === validCredentials.username && password === validCredentials.password) {
        // Redirect to the restaurant page
        window.location.href = "restaurant.html"; // Ensure this path is correct
    } else {
        alert("Invalid credentials. Please try again.");
    }
}

// Display restaurants on page load
window.onload = displayRestaurants;

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

// View menu for a specific restaurant
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

// Add item to cart
function addToCart(item, price) {
    cart.push({ item, price });
    updateCartDisplay();
}

// Update cart display
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

// Close the menu
function closeMenu() {
    const menuContainer = document.getElementById('menuContainer');
    menuContainer.style.display = 'none';
}

// Show order summary
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

// Logout function to redirect back to the login page
function logout() {
    window.location.href = "index.html"; // Redirect back to the login page
}
