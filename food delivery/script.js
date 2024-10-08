let cart = [];
let totalPrice = 0;

function showHome() {
    document.getElementById('home').style.display = 'block';
    document.getElementById('menu').style.display = 'none';
    document.getElementById('cart').style.display = 'none';
}

function showMenu() {
    document.getElementById('home').style.display = 'none';
    document.getElementById('menu').style.display = 'block';
    document.getElementById('cart').style.display = 'none';

    // Populate the menu items
    const menuItems = [
        { name: 'Pizza', price: 9.99 },
        { name: 'Burger', price: 5.99 },
        { name: 'Sushi', price: 12.99 },
        { name: 'Pasta', price: 7.99 },
        { name: 'Salad', price: 4.99 }
    ];

    const menuList = document.getElementById('menu-items');
    menuList.innerHTML = ''; // Clear previous items

    menuItems.forEach(item => {
        const li = document.createElement('li');
        li.textContent = `${item.name} - $${item.price.toFixed(2)}`;
        const addButton = document.createElement('button');
        addButton.textContent = 'Add to Cart';
        addButton.onclick = () => addToCart(item);
        li.appendChild(addButton);
        menuList.appendChild(li);
    });
}

function addToCart(item) {
    cart.push(item);
    totalPrice += item.price;
    updateCart();
}

function updateCart() {
    const cartItemsList = document.getElementById('cart-items');
    cartItemsList.innerHTML = ''; // Clear previous items

    cart.forEach(item => {
        const li = document.createElement('li');
        li.textContent = `${item.name} - $${item.price.toFixed(2)}`;
        cartItemsList.appendChild(li);
    });

    document.getElementById('total-price').textContent = totalPrice.toFixed(2);
}

function showCart() {
    document.getElementById('home').style.display = 'none';
    document.getElementById('menu').style.display = 'none';
    document.getElementById('cart').style.display = 'block';

    updateCart();
}

function placeOrder() {
    if (cart.length === 0) {
        alert('Your cart is empty!');
        return;
    }

    const orderList = cart.map(item => `${item.name} - $${item.price.toFixed(2)}`).join('\n');
    alert(`Your order:\n${orderList}\nTotal: $${totalPrice.toFixed(2)}`);
    
    // Clear the cart after placing the order
    cart = [];
    totalPrice = 0;
    updateCart();
    showHome();
}

// Initialize to show home page
showHome();
