function addToCart(productId) {
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  const existing = cart.find(item => item.id === productId);
  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({ id: productId, qty: 1 });
  }
  localStorage.setItem('cart', JSON.stringify(cart));
  updateCartCount();
  showSnackbar("Added to cart!");
}

function updateCartCount() {
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  const total = cart.reduce((sum, item) => sum + item.qty, 0);
  document.querySelectorAll('#cartCount').forEach(el => el.textContent = total);
}