const connection = require('../config/database')

// Pengambilan data kolom email dari database
const getEmail = async (email) => {
    const query = 'SELECT * FROM users WHERE email = ?';
    const [rows] = await connection.promise().query(query, [email]);
    return rows[0];
}

// Pengambilan data kolom id dari database
const getUser = async (id) => {
    const query = 'SELECT * FROM users WHERE id = ?';
    const [rows] = await connection.promise().query(query, [id]);
    return rows[0];
}

// Create data baru
const register = async (user) => {
    const query = 'INSERT INTO users (username, email, password) VALUES (?, ?, ?)';
    const { username, email, password } = user;
    await connection.promise().query(query, [username, email, password]);
}

// Update data
const update = async (id, user) => {
    const { username, email, password } = user;
    const query = 'UPDATE users SET username = ?, email = ?, password = ? WHERE id = ?';
    await connection.promise().query(query, [username, email, password, id]);
}

// Delete data
const del = async (id) => {
    const query = 'DELETE FROM users WHERE id = ?';
    await connection.promise().query(query, [id]);
}

module.exports = {
    getEmail,
    getUser,
    register,
    update,
    del
}