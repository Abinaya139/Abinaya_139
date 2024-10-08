let cart = [];
let total = 0;

function showHome() {
    document.getElementById('home').style.display = 'block';
    document.getElementById('menu').style.display = 'none';
    updateCartDisplay();
}

function showMenu() {
    document.getElementById('home').style.display = 'none';
    document.getElementById('menu').style.display = 'block';
    updateCartDisplay();
}

function addToCart(itemName, itemPrice) {
    cart.push({ name: itemName, price: itemPrice });
    total += itemPrice;
    updateCartDisplay();
}

function updateCartDisplay() {
    const cartItems = document.getElementById('cart-items');
    cartItems.innerHTML = '';

    cart.forEach(item => {
        const listItem = document.createElement('li');
        listItem.textContent = `${item.name} - $${item.price.toFixed(2)}`;
        cartItems.appendChild(listItem);
    });

    document.getElementById('total-price').textContent = `Total: $${total.toFixed(2)}`;
}

function placeOrder() {
    if (cart.length === 0) {
        alert('Your cart is empty!');
        return;
    }
    alert('Order placed successfully!');
    cart = [];
    total = 0;
    updateCartDisplay();
    showHome(); // Go back to home after placing the order
}
