let items = JSON.parse(localStorage.getItem('inventory')) || [];
const tableBody = document.querySelector('#inventoryTable tbody');
const form = document.getElementById('itemForm');
const toastContainer = document.getElementById('toastContainer');

// Toast
function showToast(message, type = 'success') {
  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.textContent = message;

  toastContainer.appendChild(toast);
  setTimeout(() => toast.remove(), 3000);
}

// Save to localStorage
function saveItems() {
  localStorage.setItem('inventory', JSON.stringify(items));
}

// Render table
function renderItems() {
  tableBody.innerHTML = '';
  items.forEach((item, index) => {
    const row = document.createElement('tr');

    row.innerHTML = `
      <td data-label="Name">${item.name}</td>
      <td data-label="Quantity">${item.quantity}</td>
      <td data-label="Category">${item.category}</td>
      <td data-label="Actions" class="actions">
        <button class="edit" onclick="editItem(${index})">Edit</button>
        <button class="delete" onclick="deleteItem(${index}, this)">Delete</button>
      </td>
    `;
    tableBody.appendChild(row);
  });
}

// Delete item
function deleteItem(index, btn) {
  const row = btn.closest('tr');
  row.classList.add('fade-out');
  setTimeout(() => {
    items.splice(index, 1);
    saveItems();
    renderItems();
    showToast('Item deleted', 'error');
  }, 300);
}

// Edit item
function editItem(index) {
  const item = items[index];
  document.getElementById('itemName').value = item.name;
  document.getElementById('itemQuantity').value = item.quantity;
  document.getElementById('itemCategory').value = item.category;

  items.splice(index, 1);
  saveItems();
  renderItems();
  showToast('Ready to edit. Submit to save.');
}

// Add item
form.addEventListener('submit', function (e) {
  e.preventDefault();
  const name = document.getElementById('itemName').value.trim();
  const quantity = parseInt(document.getElementById('itemQuantity').value);
  const category = document.getElementById('itemCategory').value.trim();

  if (name && quantity && category) {
    items.push({ name, quantity, category });
    saveItems();
    renderItems();
    form.reset();
    showToast('Item added successfully!');
  } else {
    showToast('All fields are required', 'error');
  }
});

// Dark Mode Toggle
const toggleBtn = document.getElementById('toggleTheme');

// Load theme on page load
window.addEventListener('DOMContentLoaded', () => {
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'dark') {
    document.body.classList.add('dark');
    toggleBtn.textContent = '☀️';
  } else {
    toggleBtn.textContent = '🌙';
  }
});

// Toggle theme on button click
toggleBtn.addEventListener('click', () => {
  const isDark = document.body.classList.toggle('dark');
  toggleBtn.textContent = isDark ? '☀️' : '🌙';
  localStorage.setItem('theme', isDark ? 'dark' : 'light');
});



// Initial load
renderItems();
