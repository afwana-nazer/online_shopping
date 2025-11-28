// Seed default data
if (!localStorage.getItem('users')) {
  const defaultUsers = [
    { id: 1, name: "Admin", email: "admin@gmail.com", password: "admin123", isAdmin: true },
    { id: 2, name: "John", email: "john@gmail.com", password: "123456", isAdmin: false }
  ];
  localStorage.setItem('users', JSON.stringify(defaultUsers));
}

if (!localStorage.getItem('products')) {
  const sampleProducts = [
    { id: 1, name: "Laptop", price: 999, description: "High performance laptop", imagename: "p1.jpg" },
    { id: 2, name: "Phone", price: 699, description: "Latest smartphone", imagename: "p2.jpg" },
    // Add more...
  ];
  localStorage.setItem('products', JSON.stringify(sampleProducts));
}

function registerUser(name, email, password) {
  let users = JSON.parse(localStorage.getItem('users')) || [];
  if (users.find(u => u.email === email)) {
    showSnackbar("Email already exists!");
    return;
  }
  const newUser = {
    id: Date.now(),
    name,
    email,
    password,
    isAdmin: email === "admin@gmail.com"
  };
  users.push(newUser);
  localStorage.setItem('users', JSON.stringify(users));
  showSnackbar("Registration successful!");
  setTimeout(() => location.href = "login.html", 1500);
}

function loginUser(email, password) {
  let users = JSON.parse(localStorage.getItem('users')) || [];
  const user = users.find(u => u.email === email && u.password === password);
  if (user) {
    localStorage.setItem('loggedInUser', email);
    showSnackbar("Login successful!");
    setTimeout(() => location.href = "index.html", 1000);
  } else {
    showSnackbar("Invalid email or password!");
  }
}

function logout() {
  localStorage.removeItem('loggedInUser');
  location.href = "login.html";
}

function checkLogin() {
  if (!localStorage.getItem('loggedInUser') && !window.location.href.includes('login.html') && !window.location.href.includes('register.html')) {
    location.href = "login.html";
  }
}

function getCurrentUser() {
  const email = localStorage.getItem('loggedInUser');
  if (!email) return null;
  const users = JSON.parse(localStorage.getItem('users')) || [];
  return users.find(u => u.email === email);
}

function showAdminLink() {
  const user = getCurrentUser();
  if (user && user.isAdmin) {
    document.querySelectorAll('#adminLink').forEach(el => el.style.display = 'block');
  }
}