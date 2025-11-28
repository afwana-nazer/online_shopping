function showSnackbar(message) {
  const snackbar = document.getElementById('snackbar');
  if (!snackbar) return;
  snackbar.textContent = message;
  snackbar.className = "show";
  setTimeout(() => snackbar.className = "", 3000);
}