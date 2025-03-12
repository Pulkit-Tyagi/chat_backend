// const express = require('express');
// const app = express();
// const PORT = process.env.PORT || 3000;

// // Middleware to parse JSON
// app.use(express.json());

// // Basic route
// app.get('/', (req, res) => {
//     res.send('Hello, World!');
// });

// // Start server
// app.listen(PORT, () => {
//     console.log(`Server is running on port ${PORT}`);
// });
const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON
app.use(express.json());

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Sample in-memory database
const users = [
    { id: 1, name: 'John Doe', email: 'john@example.com' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com' }
];

// Get all users
app.get('/users', (req, res) => {
    res.json(users);
});

// Get a single user by ID
app.get('/users/:id', (req, res) => {
    const user = users.find(u => u.id === parseInt(req.params.id));
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
});

// Create a new user
app.post('/users', (req, res) => {
    const { name, email } = req.body;
    if (!name || !email) {
        return res.status(400).json({ message: 'Name and email are required' });
    }
    const newUser = { id: users.length + 1, name, email };
    users.push(newUser);
    res.status(201).json(newUser);
});

// Update a user
app.put('/users/:id', (req, res) => {
    const user = users.find(u => u.id === parseInt(req.params.id));
    if (!user) return res.status(404).json({ message: 'User not found' });
    
    const { name, email } = req.body;
    if (name) user.name = name;
    if (email) user.email = email;
    
    res.json(user);
});

// Delete a user
app.delete('/users/:id', (req, res) => {
    const index = users.findIndex(u => u.id === parseInt(req.params.id));
    if (index === -1) return res.status(404).json({ message: 'User not found' });
    
    users.splice(index, 1);
    res.json({ message: 'User deleted successfully' });
});

// Route to serve a UI page
// Route to return an HTML page with a textbox
app.get('/vk', (req, res) => {
    res.send(`
        <html>
            <head>
                <title>VK Page</title>
            </head>
            <body>
                <h1>Enter Text Below</h1>
                <input type="text" placeholder="Type here...">
            </body>
        </html>
    `);
});


// Route to return a random number in JSON
app.get('/tk', (req, res) => {
    const randomNumber = Math.floor(Math.random() * 1000);
    res.json({ "lkikikk":"randomlunNumber" });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
