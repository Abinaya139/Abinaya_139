const menuItems = [
    { id: 1, name: "Margherita Pizza", price: 12.99, image: "images/margherita-pizza.jpg" },
    { id: 2, name: "Pepperoni Pizza", price: 14.99, image: "images/pepperoni-pizza.jpg" },
    { id: 3, name: "Caesar Salad", price: 9.99, image: "images/caesar-salad.jpg" },
    { id: 4, name: "Spaghetti Carbonara", price: 13.99, image: "images/spaghetti-carbonara.jpg" },
    { id: 5, name: "Cheeseburger", price: 11.99, image: "images/cheeseburger.jpg" },
];

let cart = JSON.parse(localStorage.getItem('cart')) || [];

function showHome() {
    document.querySelector('#home').style.display = 'block';
    document.querySelector('#menu').style.display = 'none';
    document.querySelector('#cart').style.display = 'none';
}

function showMenu() {
    renderMenu();
    document.querySelector('#home').style.display = 'none';
    document.querySelector('#menu').style.display = 'block';
    document.querySelector('#cart').style.display = 'none';
}

function showCart() {
    renderCart();
    document.querySelector('#home').style.display = 'none';
    document.querySelector('#menu').style.display = 'none';
    document.querySelector('#cart').style.display = 'block';
}

function renderMenu() {
    const menuList = document.getElementById("menu-items");
    menuList.innerHTML = ""; // Clear previous items
    menuItems.forEach(item => {
        const li = document.createElement("li");
        li.className = "menu-item";
        li.innerHTML = `
            <img src="${item.image}" alt="${item.name}">
            <span>${item.name} - $${item.price.toFixed(2)}</span>
            <button onclick="addToCart(${item.id})">Add to Cart</button>
        `;
        menuList.appendChild(li);
    });
}

function addToCart(itemId) {
    const item = menuItems.find(i => i.id === itemId);
    const cartItem = cart.find(i => i.id === itemId);

    if (cartItem) {
        cartItem.quantity++;
    } else {
        cart.push({ ...item, quantity: 1 });
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    renderCart();
}

function renderCart() {
    const cartList = document.getElementById("cart-items");
    const totalPriceElement = document.getElementById("total-price");
    
    cartList.innerHTML = "";
    let totalPrice = 0;

    cart.forEach(item => {
        totalPrice += item.price * item.quantity;
        const li = document.createElement("li");
        li.innerHTML = `${item.name} - $${item.price.toFixed(2)} x ${item.quantity}`;
        cartList.appendChild(li);
    });

    totalPriceElement.innerText = totalPrice.toFixed(2);
}

document.getElementById("place-order").addEventListener("click", () => {
    if (cart.length === 0) {
        alert("Your cart is empty!");
        return;
    }

    let orderSummary = "Your Order:\n";
    cart.forEach(item => {
        orderSummary += `${item.name} - $${item.price.toFixed(2)} x ${item.quantity}\n`;
    });
    orderSummary += `Total: $${document.getElementById("total-price").innerText}`;

    if (confirm(orderSummary + "\nDo you want to place this order?")) {
        alert("Order placed successfully!");
        cart.length = 0; // Clear the cart
        localStorage.removeItem('cart'); //
