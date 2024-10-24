// Initialize users and ads in local storage if not present
if (!localStorage.getItem('users')) {
    localStorage.setItem('users', JSON.stringify([]));
}

if (!localStorage.getItem('ads')) {
    localStorage.setItem('ads', JSON.stringify([]));
}

document.getElementById('login-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    
    const users = JSON.parse(localStorage.getItem('users'));
    const user = users.find(u => u.username === username && u.password === password);
    
    if (user) {
        localStorage.setItem('loggedInUser', username);
        loadUserDashboard();
    } else {
        alert('Invalid login credentials');
    }
});

// Register button logic
document.getElementById('register-btn').addEventListener('click', function() {
    document.getElementById('auth-section').style.display = 'none';
    document.getElementById('register-section').style.display = 'block';
});

document.getElementById('register-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const newUsername = document.getElementById('new-username').value;
    const newPassword = document.getElementById('new-password').value;
    
    const users = JSON.parse(localStorage.getItem('users'));
    const existingUser = users.find(u => u.username === newUsername);
    
    if (existingUser) {
        alert('Username already exists!');
    } else {
        users.push({ username: newUsername, password: newPassword });
        localStorage.setItem('users', JSON.stringify(users));
        alert('Registration successful! You can now log in.');
        document.getElementById('register-section').style.display = 'none';
        document.getElementById('auth-section').style.display = 'block';
        document.getElementById('register-form').reset();
    }
});

document.getElementById('back-to-login-btn').addEventListener('click', function() {
    document.getElementById('register-section').style.display = 'none';
    document.getElementById('auth-section').style.display = 'block';
});

document.getElementById('form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const title = document.getElementById('title').value;
    const description = document.getElementById('description').value;
    const price = document.getElementById('price').value;
    const rating = document.getElementById('rating').value;
    const imageInput = document.getElementById('image');
    const location = document.getElementById('location').value;
    
    const reader = new FileReader();
    reader.onload = function(event) {
        const imageDataUrl = event.target.result;
        
        const username = localStorage.getItem('loggedInUser');
        const ads = JSON.parse(localStorage.getItem('ads'));
        
        const currentDateTime = new Date().toLocaleString();
        
        ads.push({ title, description, price, rating, username, image: imageDataUrl, location, dateTime: currentDateTime });
        localStorage.setItem('ads', JSON.stringify(ads));

        loadAds();
        document.getElementById('form').reset();
    };
    
    if (imageInput.files.length > 0) {
        reader.readAsDataURL(imageInput.files[0]);
    }
});

document.getElementById('logout-btn').addEventListener('click', function() {
    localStorage.removeItem('loggedInUser');
    loadLoginPage();
});

function loadLoginPage() {
    document.getElementById('auth-section').style.display = 'block';
    document.getElementById('register-section').style.display = 'none';
    document.getElementById('ad-form').style.display = 'none';
    document.getElementById('ads').style.display = 'none';
    document.getElementById('user-info').innerText = '';
    document.getElementById('logout-btn').style.display = 'none';
    document.getElementById('order-summary').style.display = 'none';
}

function loadUserDashboard() {
    document.getElementById('auth-section').style.display = 'none';
    document.getElementById('register-section').style.display = 'none';
    document.getElementById('ad-form').style.display = 'block';
    document.getElementById('ads').style.display = 'block';
    document.getElementById('user-info').innerText = `Logged in as: ${localStorage.getItem('loggedInUser')}`;
    document.getElementById('logout-btn').style.display = 'inline-block';
    loadAds();
}

function loadAds() {
    const ads = JSON.parse(localStorage.getItem('ads'));
    const adList = document.getElementById('ad-list');
    adList.innerHTML = '';

    ads.forEach((ad, index) => {
        const li = document.createElement('li');
        li.innerHTML = `
            <strong>${ad.title}</strong><br>
            ${ad.image ? `<img src="${ad.image}" alt="${ad.title}" style="max-width: 200px; max-height: 150px;"><br>` : ''}
            ${ad.description}<br>
            <em>Price: ₹${ad.price} | Rating: ${ad.rating}</em><br>
            <small>Posted by: ${ad.username} on ${ad.dateTime}</small><br>
            <small>Location: ${ad.location}</small><br>
        `;
        
        const buyButton = document.createElement('button');
        buyButton.className = 'buy-button';
        buyButton.innerText = 'Buy Now';
        buyButton.onclick = () => buyAd(ad);
        
        li.appendChild(buyButton);
        adList.appendChild(li);
    });
}

function buyAd(ad) {
    const deliveryName = prompt("Please enter your name:");
    const deliveryAddress = prompt("Please enter your delivery address:");
    const deliveryPhone = prompt("Please enter your phone number:");
    const paymentMethod = prompt("Please enter your payment method (e.g., Cash on Delivery):");

    if (deliveryName && deliveryAddress && deliveryPhone && paymentMethod) {
        const summaryDetails = document.getElementById('summary-details');
        summaryDetails.innerHTML = `
            <strong>Item:</strong> ${ad.title}<br>
            <strong>Price:</strong> ₹${ad.price}<br>
            <strong>Delivery Name:</strong> ${deliveryName}<br>
            <strong>Delivery Address:</strong> ${deliveryAddress}<br>
            <strong>Phone:</strong> ${deliveryPhone}<br>
            <strong>Payment Method:</strong> ${paymentMethod}
        `;

        document.getElementById('order-summary').style.display = 'block';
    } else {
        alert("Purchase canceled. Delivery details are required.");
    }
}

document.getElementById('close-summary-btn').addEventListener('click', function() {
    document.getElementById('order-summary').style.display = 'none';
});

// Load the login page on initial load
loadLoginPage();
