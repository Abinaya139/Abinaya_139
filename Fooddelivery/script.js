const restaurants = [
    {
        id: 1,
        name: "Italian Bistro",
        menuItems: [
            { id: 1, name: "Margherita Pizza", price: 1099 },
            { id: 2, name: "Pepperoni Pizza", price: 1249 },
            { id: 3, name: "Caesar Salad", price: 749 },
            { id: 4, name: "Spaghetti Carbonara", price: 1049 },
            { id: 5, name: "Tiramisu", price: 499 },
        ]
    },
    {
        id: 2,
        name: "Burger Palace",
        menuItems: [
            { id: 6, name: "Cheeseburger", price: 899 },
            { id: 7, name: "Veggie Burger", price: 799 },
            { id: 8, name: "Fries", price: 249 },
            { id: 9, name: "Onion Rings", price: 299 },
            { id: 10, name: "Milkshake", price: 399 },
        ]
    }
];

let cart = JSON.parse(localStorage.getItem('cart')) || [];
let orderHistory = JSON.parse(localStorage.getItem('orderHistory')) || [];

// Function to render the restaurant menu
function renderMenu() {
    const menuList = document.getElementById("menu-items");
    menuList.innerHTML = ''; // Clear existing menu items

    restaurants.forEach(restaurant => {
        const restaurantHeader = document.createElement("h3");
        restaurantHeader.innerText = restaurant.name;
        menuList.appendChild(restaurantHeader);

        restaurant.menuItems.forEach(item => {
            const itemDiv = document.createElement("div");
            itemDiv.className = "menu-item";
            itemDiv.innerHTML = `
                <div>${item.name} - ₹${item.price.toFixed(2)}</div>
                <button onclick="addToCart(${item.id})">Add to Cart</button>
            `;
            menuList.appendChild(itemDiv);
        });
    });
}

// Function to add items to the cart
function addToCart(itemId) {
    const item = restaurants.flatMap(r => r.menuItems).find(i => i.id === itemId);
    const cartItem = cart.find(i => i.id === itemId);

    if (cartItem) {
        cartItem.quantity++;
    } else {
        cart.push({ ...item, quantity: 1 });
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    renderCart();
}

// Function to render the cart
function renderCart() {
    const cartList = document.getElementById("cart-items");
    const totalPriceElement = document.getElementById("total-price");
    const cartActions = document.querySelector('.cart-actions');
    
    cartList.innerHTML = "";
    let totalPrice = 0;

    cart.forEach(item => {
        totalPrice += item.price * item.quantity;
        const li = document.createElement("li");
        li.innerHTML = ${item.name} - ₹${item.price.toFixed(2)} x ${item.quantity};
        cartList.appendChild(li);
    });

    totalPriceElement.innerText = ₹${totalPrice.toFixed(2)};
    cartActions.style.display = cart.length > 0 ? 'block' : 'none';
}

// Event listener for placing an order
document.getElementById("place-order").addEventListener("click", () => {
    if (cart.length === 0) {
        alert("Your cart is empty!");
        return;
    }

    const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    orderHistory.push({
        total: totalPrice.toFixed(2),
        date: new Date().toLocaleString()
    });

    localStorage.setItem('orderHistory', JSON.stringify(orderHistory));
    cart.length = 0; // Clear the cart
    localStorage.removeItem('cart'); // Clear local storage
    renderCart();
    renderOrderHistory();
    alert("Order placed successfully!");
});

// Function to render order history
function renderOrderHistory() {
    const orderHistoryList = document.getElementById("order-history-list");
    orderHistoryList.innerHTML = ""; // Clear existing order history

    orderHistory.forEach(order => {
        const li = document.createElement("li");
        li.innerHTML = Order on ${order.date}: Total ₹${order.total};
        orderHistoryList.appendChild(li);
    });
}

// Clear Cart Button
document.getElementById('clear-cart').addEventListener('click', () => {
    if (confirm("Are you sure you want to clear the cart?")) {
        cart.length = 0; // Clear the cart
        localStorage.removeItem('cart'); // Clear local storage
        renderCart(); // Update cart display
    }
});

// Initialize menu, cart, and order history on page load
renderMenu();
renderCart();
renderOrderHistory();
