const addToCartButtons = document.querySelectorAll('.add-to-cart');
const cartItemsList = document.getElementById('cart-items');
const cartTotal = document.getElementById('cart-total');

let total = 0;
const cart = {};

addToCartButtons.forEach(button => {
  button.addEventListener('click', () => {
    const item = button.parentElement;
    const itemName = item.querySelector('h2').textContent;
    const itemPrice = parseFloat(item.querySelector('.price')
.textContent.slice(1));

    if (cart[itemName]) {
      cart[itemName] += 1;
    } else {
      cart[itemName] = 1;
    }

    total += itemPrice;
    updateCart();
  });
});

function updateCart() {
  cartItemsList.innerHTML = '';
  for (const item in cart) {
    const li = document.createElement('li');
    li.textContent = `${item} x${cart[item]}`;
    cartItemsList.appendChild(li);
  }
  cartTotal.textContent = total.toFixed(2);
}
