const connection = require('../config/database');

const getID = async (id) => {
    const query = 'SELECT users.username, todos.title, todos.description, todos.deadline FROM todos JOIN users ON todos.user_id = users.id WHERE todos.id = ?';
    const [rows] = await connection.promise().query(query, [id]);
    return rows[0];
}

const getUserID = async (userID) => {
    const query = 'SELECT todos.title, todos.description, todos.deadline FROM todos JOIN users ON todos.user_id = users.id WHERE todos.user_id = ?';
    const [rows] = await connection.promise().query(query, [userID]);

    return rows;
}

const create = async (todo) => {
    const query = 'INSERT INTO todos (user_id, title, description, deadline) VALUES (?, ?, ?, ?)';
    const { userID, title, description, deadline } = todo;
    await connection.promise().query(query, [userID, title, description, deadline]);
}

const update = async (id, todo) => {
    const { title, description, deadline } = todo;
    const query = 'UPDATE todos SET title = ?, description = ?, deadline = ? WHERE id = ?';
    await connection.promise().query(query, [title, description, deadline, id]);
}

const del = async (id) => {
    const query = 'DELETE FROM todos WHERE id = ?';
    await connection.promise().query(query, [id]);
}

module.exports = {
    getID,
    getUserID,
    create,
    update,
    del
}