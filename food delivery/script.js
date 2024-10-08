let cart = [];
let totalPrice = 0;
let orderHistory = [];
let reviews = [];

function showHome() {
    document.getElementById('home').style.display = 'block';
    document.getElementById('menu').style.display = 'none';
    document.getElementById('cart').style.display = 'none';
    document.getElementById('order-history').style.display = 'none';
    document.getElementById('reviews').style.display = 'none';
}

function showMenu() {
    document.getElementById('home').style.display = 'none';
    document.getElementById('menu').style.display = 'block';
    document.getElementById('cart').style.display = 'none';
    document.getElementById('order-history').style.display = 'none';
    document.getElementById('reviews').style.display = 'none';

    const menuItems = [
        { name: 'Pizza', price: 9.99 },
        { name: 'Burger', price: 5.99 },
        { name: 'Sushi', price: 12.99 },
        { name: 'Pasta', price: 7.99 },
        { name: 'Salad', price: 4.99 }
    ];

    const menuList = document.getElementById('menu-items');
    menuList.innerHTML = '';

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
    cartItemsList.innerHTML = '';

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
    document.getElementById('order-history').style.display = 'none';
    document.getElementById('reviews').style.display = 'none';

    updateCart();
}

function placeOrder() {
    if (cart.length === 0) {
        alert('Your cart is empty!');
        return;
    }

    const orderList = cart.map(item => `${item.name} - $${item.price.toFixed(2)}`).join('\n');
    alert(`Your order:\n${orderList}\nTotal: $${totalPrice.toFixed(2)}`);

    // Save the order in history
    orderHistory.push({ items: cart.slice(), total: totalPrice });
    
    // Clear the cart
    cart = [];
    totalPrice = 0;
    updateCart();
    showOrderHistory();
}

function showOrderHistory() {
    document.getElementById('home').style.display = 'none';
    document.getElementById('menu').style.display = 'none';
    document.getElementById('cart').style.display = 'none';
    document.getElementById('order-history').style.display = 'block';
    document.getElementById('reviews').style.display = 'none';

    const orderList = document.getElementById('order-list');
    orderList.innerHTML = '';

    orderHistory.forEach((order, index) => {
        const li = document.createElement('li');
        li.textContent = `Order ${index + 1}: ${order.items.map(item => `${item.name} - $${item.price.toFixed(2)}`).join(', ')} | Total: $${order.total.toFixed(2)}`;
        orderList.appendChild(li);
    });
}

function showReviews() {
    document.getElementById('home').style.display = 'none';
    document.getElementById('menu').style.display = 'none';
    document.getElementById('cart').style.display = 'none';
    document.getElementById('order-history').style.display = 'none';
    document.getElementById('reviews').style.display = 'block';

    const reviewList = document.getElementById('review-list');
    reviewList.innerHTML = '';

    reviews.forEach(review => {
        const li = document.createElement('li');
        li.textContent = review;
        reviewList.appendChild(li);
    });
}

function submitReview() {
    const reviewInput = document.getElementById('review-input');
    const reviewText = reviewInput.value.trim();

    if (reviewText) {
        reviews.push(reviewText);
        reviewInput.value = ''; // Clear the input
        showReviews(); // Refresh reviews
    } else {
        alert('Please enter a review.');
    }
}

// Initialize to show home page
showHome();
