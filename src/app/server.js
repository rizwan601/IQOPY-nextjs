const express = require('express');
const mysql = require('mysql');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

// Replace with your MySQL connection data
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'iQopy@123$$',
    database: 'iqopyprrivatesale'
});

db.connect(err => {
    if (err) throw err;
    console.log('Database connected!');
});

// Registration route
app.post('/register', async (req, res) => {
    const { name, email, password } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(password, 10);

        const query = 'INSERT INTO users (name, email, password) VALUES (?, ?, ?)';
        db.query(query, [name, email, hashedPassword], (err, result) => {
            if (err) {
                if (err.code === 'ER_DUP_ENTRY') {
                    // This error code means a user with this email already exists
                    return res.status(400).json({ error: 'A user with this email already exists' });
                }

                // Some other error occurred
                throw err;
            }

            // Get the ID of the newly inserted user
            const userId = result.insertId;

            // Generate a token that includes the user's ID
            const token = jwt.sign({ id: userId }, 'secret');

            res.json({ success: true, token });
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'An error occurred while registering' });
    }
});

// Login route
app.post('/login', (req, res) => {
    const { email, password } = req.body;

    const query = 'SELECT * FROM users WHERE email = ?';
    db.query(query, [email], async (err, result) => {
        if (err) throw err;

        if (result.length === 0) {
            return res.status(400).json({ error: 'Invalid email or password' });
        }

        const user = result[0];
        const validPassword = await bcrypt.compare(password, user.password);

        if (!validPassword) {
            return res.status(400).json({ error: 'Invalid email or password' });
        }

        // Generate a token that includes the user's ID
        const token = jwt.sign({ id: user.id }, 'secret');

        res.json({ token });
    });
});

// Transaction route
app.post('/private-sale', (req, res) => {
    // Log the request body
    console.log('Request body:', req.body);

    const { txid, amount, coin, senderAddress, tokenAmount } = req.body;

    // Extract the token from the Authorization header
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1];

    try {
        // Extract the user's ID from the token
        const { id: userId } = jwt.verify(token, 'secret');
        console.log('User ID:', userId);

        const query = 'INSERT INTO transactions (userId, txId, amount, coin, senderAddress, tokenAmount) VALUES (?, ?, ?, ?, ?, ?)';
        db.query(query, [userId, txid, amount, coin, senderAddress, tokenAmount], (err, result) => {
            if (err) {
                console.error('Database error:', err);
                return res.status(500).json({ error: 'An error occurred while saving the transaction data', details: err.message });
            }

            res.json({ success: true });
        });
    } catch (err) {
        console.error('JWT verification error:', err);
        return res.status(500).json({ error: 'An error occurred while verifying the token', details: err.message });
    }
});

// Add the error-handling middleware
app.use(function (err, req, res, next) {
    console.error(err.stack)
    res.status(500).send('Something broke!')
  });

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server running on port ${port}`));