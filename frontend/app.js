const API_URL = 'https://node-crud-api-fuoh.onrender.com/api/products';

// 1. Fetch and display products (GET)
async function fetchProducts() {
    try {
        const response = await fetch(API_URL);
        const products = await response.json();
        const tbody = document.getElementById('productTableBody');
        tbody.innerHTML = '';

        products.forEach(product => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${product.id}</td>
                <td>${product.product_name}</td>
                <td>${product.category}</td>
                <td>$${product.price}</td>
                <td>${product.stock_quantity}</td>
                <td>${product.manufacturer}</td>
                <td>
                    <button class="edit-btn" onclick="editProduct(${product.id}, '${product.product_name}', '${product.category}', ${product.price}, ${product.stock_quantity}, '${product.manufacturer}')">Edit</button>
                    <button class="delete-btn" onclick="deleteProduct(${product.id})">Delete</button>
                </td>
            `;
            tbody.appendChild(tr);
        });
    } catch (error) {
        console.error("Error fetching products:", error);
    }
}

// 2. Handle Form Submission (POST and PUT)
document.getElementById('productForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const id = document.getElementById('productId').value;
    const productData = {
        product_name: document.getElementById('productName').value,
        category: document.getElementById('category').value,
        price: document.getElementById('price').value,
        stock_quantity: document.getElementById('stockQuantity').value,
        manufacturer: document.getElementById('manufacturer').value
    };

    if (id) {
        // Update (PUT)
        await fetch(`${API_URL}/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(productData)
        });
        document.getElementById('submitBtn').innerText = 'Add Product';
        document.getElementById('productId').value = '';
    } else {
        // Create (POST)
        await fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(productData)
        });
    }

    document.getElementById('productForm').reset();
    fetchProducts();
});

// 3. Populate form for Edit
function editProduct(id, name, category, price, stock, manufacturer) {
    document.getElementById('productId').value = id;
    document.getElementById('productName').value = name;
    document.getElementById('category').value = category;
    document.getElementById('price').value = price;
    document.getElementById('stockQuantity').value = stock;
    document.getElementById('manufacturer').value = manufacturer;
    document.getElementById('submitBtn').innerText = 'Update Product';
    window.scrollTo(0, 0);
}

// 4. Delete a product (DELETE)
async function deleteProduct(id) {
    if (confirm('Are you sure you want to delete this product?')) {
        await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
        fetchProducts();
    }
}

// Load initial data when the page opens
fetchProducts();