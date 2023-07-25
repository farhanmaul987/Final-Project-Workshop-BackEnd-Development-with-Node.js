const s_user = require('../services/s_user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const error500 = {
    message: 'Terjadi kesalahan pada server'
}

const register = async (req, res) => {
    const { username, email, password } = req.body;

    try {
        // Pengecekan duplikasi email
        const duplicate = await s_user.getEmail(email);
        if (duplicate) {
            return res.status(400).json({ message: 'Email sudah digunakan' });
        }

        // Hash Password
        const hash = await bcrypt.hash(password, 10);

        // Input data user ke database
        await s_user.register(
            {
                username,
                email,
                password: hash
            }
        )

        return res.status(201).json({
            message: 'User berhasil ditambahkan'
        })
    } catch (error) {
        return res.status(500).json(error500)
    }
}

const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Check if email is registered
        const user = await s_user.getEmail(email);
        if (!user) {
            return res.status(401).json({ message: 'Email atau Password salah' });
        }

        // Check password
        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if (!isPasswordCorrect) {
            return res.status(401).json({ message: 'Email atau Password salah' });
        }

        // Generate JWT token
        const token = jwt.sign(
            { id: user.id },
            process.env.SECRET_KEY,
            {
                expiresIn: '1h',
            })

        return res.status(200).json({
            message: 'Berhasil login',
            token: token,
            user: {
                username: user.username,
                email: user.email
            }
        })
    } catch (error) {
        return res.status(500).json(error500)
    }
}

const view = async (req, res) => {
    const user = req.user;

    const data = {
        username: user.username,
        email: user.email
    }

    return res.status(200).json(data);
}

const update = async (req, res) => {
    const data = req.user.id
    const { username, email, password } = req.body

    try {
        const user = await s_user.getUser(data)

        // Hash password baru
        let hashed;
        if (password) {
            hashed = await bcrypt.hash(password, 10)
        } else {
            // Apabila password tidak diubah, maka tidak perlu hash lagi
            hashed = user.password
        }

        // Update data user ke database
        await s_user.update(data, {
            username,
            email,
            password: hashed
        })

        return res.status(200).json({
            message: 'User berhasil diubah',
            user: {
                username: user.username,
                email: user.email
            }
        })
    } catch (error) {
        return res.status(500).json(error500)
    }
}

const del = async (req, res) => {
    const data = req.user.id

    try {
        await s_user.del(data)

        return res.status(200).json({
            message: 'User berhasil dihapus'
        })
    } catch (error) {
        return res.status(500).json(error500)
    }

}

module.exports = {
    register,
    login,
    view,
    update,
    del
}