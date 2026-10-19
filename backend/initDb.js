const fs = require('fs');
const db = require('./db');

const schema = fs.readFileSync('./schema.sql', 'utf8');

db.query(schema)
    .then(() => {
        console.log('Database setup complete. Table created and 10 records inserted.');
        process.exit(0);
    })
    .catch((err) => {
        console.error('Error creating database tables:', err);
        process.exit(1);
    });