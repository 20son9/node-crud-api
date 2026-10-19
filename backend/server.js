const express = require('express');
const cors = require('cors');
const db = require('./db');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// GET all products
app.get('/api/products', async (req, res) => {
    try {
        const result = await db.query('SELECT * FROM products');
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// GET one product by ID
app.get('/api/products/:id', async (req, res) => {
    try {
        const result = await db.query('SELECT * FROM products WHERE id = $1', [req.params.id]);
        if (result.rows.length === 0) return res.status(404).json({ error: 'Product not found' });
        res.json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// POST (Create) a new product
app.post('/api/products', async (req, res) => {
    const { product_name, category, price, stock_quantity, manufacturer } = req.body;
    try {
        const result = await db.query(
            'INSERT INTO products (product_name, category, price, stock_quantity, manufacturer) VALUES ($1, $2, $3, $4, $5) RETURNING id',
            [product_name, category, price, stock_quantity, manufacturer]
        );
        res.status(201).json({ id: result.rows[0].id, message: 'Product created' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// PUT (Update) a product
app.put('/api/products/:id', async (req, res) => {
    const { product_name, category, price, stock_quantity, manufacturer } = req.body;
    try {
        const result = await db.query(
            'UPDATE products SET product_name = $1, category = $2, price = $3, stock_quantity = $4, manufacturer = $5 WHERE id = $6',
            [product_name, category, price, stock_quantity, manufacturer, req.params.id]
        );
        if (result.rowCount === 0) return res.status(404).json({ error: 'Product not found' });
        res.json({ message: 'Product updated successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// DELETE a product
app.delete('/api/products/:id', async (req, res) => {
    try {
        const result = await db.query('DELETE FROM products WHERE id = $1', [req.params.id]);
        if (result.rowCount === 0) return res.status(404).json({ error: 'Product not found' });
        res.json({ message: 'Product deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});