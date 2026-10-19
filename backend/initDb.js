const db = require('./db');

const schema = `
CREATE TABLE IF NOT EXISTS products (
    id SERIAL PRIMARY KEY,
    product_name VARCHAR(150) NOT NULL,
    category VARCHAR(100) NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    stock_quantity INT NOT NULL,
    manufacturer VARCHAR(120) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO products (product_name, category, price, stock_quantity, manufacturer) VALUES
('MacBook Pro 14', 'Laptops', 1999.99, 50, 'Apple'),
('iPhone 15 Pro', 'Smartphones', 999.99, 120, 'Apple'),
('Galaxy S24 Ultra', 'Smartphones', 1199.99, 80, 'Samsung'),
('Dell XPS 13', 'Laptops', 1299.00, 30, 'Dell'),
('Sony WH-1000XM5', 'Audio', 399.99, 200, 'Sony'),
('Logitech MX Master 3S', 'Accessories', 99.99, 300, 'Logitech'),
('iPad Air', 'Tablets', 599.00, 75, 'Apple'),
('Surface Pro 9', 'Tablets', 1099.99, 40, 'Microsoft'),
('Nintendo Switch OLED', 'Gaming', 349.99, 150, 'Nintendo'),
('Keychron K2 Keyboard', 'Accessories', 79.99, 250, 'Keychron');
`;

db.query(schema)
    .then(() => {
        console.log('Database setup complete. Table created and 10 records inserted.');
        process.exit(0);
    })
    .catch((err) => {
        console.error('Error creating database tables:', err);
        process.exit(1);
    });