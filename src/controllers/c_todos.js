const s_todos = require('../services/s_todos');
const moment = require('moment');

const error500 = {
    message: 'Internal Server Error'
}

const viewID = async (req, res) => {
    const todoID = req.params.id;

    try {
        const todo = await s_todos.getID(todoID);

        if (!todo) {
            return res.status(404).json({
                message: 'Agenda tidak ditemukan'
            });
        }

        // Moment.js
        const format = {
            username: todo.username,
            title: todo.title,
            description: todo.description,
            // Menghilangkan karakter T dan Z
            deadline: moment(todo.deadline).format('YYYY-MM-DD HH:mm:ss')
        };

        res.status(200).json(format);
    } catch (error) {
        res.status(500).json(error500)
    }
}

const view = async (req, res) => {
    const userID = req.user.id;

    try {
        const todos = await s_todos.getUserID(userID);

        // Moment.js
        const format = todos.map((todo) => ({
            title: todo.title,
            description: todo.description,
            // Menghilangkan karakter T dan Z
            deadline: moment(todo.deadline).format('YYYY-MM-DD HH:mm:ss')
        }));

        res.status(200).json(format);
    } catch (error) {
        res.status(500).json(error500)
    }
}

const create = async (req, res) => {
    const { title, description, deadline } = req.body;
    const userID = req.user.id;

    try {
        await s_todos.create({
            userID,
            title,
            description,
            deadline
        })

        res.status(201).json({
            message: 'Agenda berhasil ditambahkan'
        })
    } catch (error) {
        res.status(500).json(error500)
    }
}

const update = async (req, res) => {
    const todoID = req.params.id;
    const { title, description, deadline } = req.body;

    try {
        const todo = await s_todos.getID(todoID);

        if (!todo) {
            return res.status(404).json({
                message: 'Agenda tidak ditemukan'
            });
        }

        await s_todos.update(todoID, {
            title,
            description,
            deadline
        })

        res.status(200).json({
            message: 'Agenda berhasil diperbarui'
        })
    } catch (error) {
        res.status(500).json(error500)
    }
}

const del = async (req, res) => {
    const todoId = req.params.id;

    try {
        // Check if the todo exists
        const todo = await s_todos.getID(todoId);
        if (!todo) {
            return res.status(404).json({ message: 'Todo not found' });
        }

        await s_todos.del(todoId);

        res.status(200).json({ message: 'Todo deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
};

module.exports = {
    viewID,
    view,
    create,
    update,
    del
}