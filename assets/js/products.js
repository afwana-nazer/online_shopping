// assets/js/products.js   ← FULL & FINAL VERSION

function loadProducts() {
  let products = JSON.parse(localStorage.getItem('products')) || [];
  const container = document.getElementById('productsContainer');
  if (!container) return;

  // Create sample products only the very first time
  if (products.length === 0) {
    products = [
      { id: 1, name: "Laptop",          price: 999,  description: "High performance laptop",   imagename: "p1.jpg" },
      { id: 2, name: "Phone",           price: 699,  description: "Latest smartphone",         imagename: "p2.jpeg" },
      { id: 3, name: "Smart Watch",     price: 349,  description: "Fitness tracker",           imagename: "p3.jpg" },
      { id: 4, name: "Headphones",      price: 199,  description: "Wireless premium sound",     imagename: "p4.jpg" }
    ];
    localStorage.setItem('products', JSON.stringify(products));
  }

  container.innerHTML = products.map(product => `
    <div class="col-12 col-md-6 col-lg-4 mb- mb-4">
      <div class="card h-100 shadow-sm border-0">
        <img 
          src="images/${product.imagename}" 
          class="card-img-top" 
          style="height: 250px; object-fit: cover;"
          alt="${product.name}"
          onerror="this.onerror=null; this.src='https://via.placeholder.com/400x300/eee/666?text=No+Image';"
        >
        <div class="card-body d-flex flex-column">
          <h5 class="card-title">${product.name}</h5>
          <p class="card-text text-muted">${product.description}</p>
          <p class="text-primary fw-bold fs-3 mb-4">$${product.price}</p>
          <button class="btn btn-primary btn-lg mt-auto" onclick="addToCart(${product.id})">
            Add to Cart
          </button>

          ${getCurrentUser()?.isAdmin ? `
            <div class="mt-3 d-grid gap-2 d-md-flex">
              <a href="edit-product.html?id=${product.id}" class="btn btn-warning btn-sm">Edit</a>
              <button class="btn btn-danger btn-sm" onclick="deleteProduct(${product.id})">Delete</button>
            </div>
          ` : ''}
        </div>
      </div>
    </div>
  `).join('');
}

// Delete product function
function deleteProduct(id) {
  if (!confirm("Delete this product permanently?")) return;
  let products = JSON.parse(localStorage.getItem('products')) || [];
  products = products.filter(p => p.id !== id);
  localStorage.setItem('products', JSON.stringify(products));
  showSnackbar("Product deleted!");
  loadProducts(); // refresh list
}

// Auto-run when page loads
document.addEventListener("DOMContentLoaded", loadProducts);