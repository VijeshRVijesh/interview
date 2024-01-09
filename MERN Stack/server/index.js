const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const User = require('./models/user.model')
const jwt = require('jsonwebtoken')

app.use(cors())
app.use(express.json())

const connectDB = async () => {
    try {
        const conn = await mongoose.connect("mongodb://localhost:27017/user")
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`Error ${error.message}`);
        process.exit(1);
    }
}

connectDB();

app.post('/api/register', async (req, res) => {
    console.log(req.body)
    try {
        await User.create({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            role: req.body.role,
        })
        res.json({ status: 'ok' })
    } catch (err) {
        console.log(err)
        res.json({ status: 'error', error: 'same email already exist' })
    }
})

app.post('/api/login', async (req, res) => {
    const user = await User.findOne({
        email: req.body.email,
        password: req.body.password,
    })

    if (user) {
        const token = jwt.sign(
            {
                name: user.name,
                email: user.email,
                role: user.role
            },
            'secret123'
        )
        return res.json({ status: 'ok', user: token })
    } else {
        return res.json({ status: 'error', user: false })
    }
})

app.get('/api/getUserRole', (req, res) => {
    const token = req.headers.authorization;

    if (!token) {
        return res.status(401).json({ error: 'Unauthorized' });
    }

    try {
        const decodedToken = jwt.verify(token, 'secret123');
        const userRole = decodedToken.role;
        console.log("ffffffffff", userRole)
        res.json({ role: userRole });
    } catch (error) {
        console.log(`fffffeefffff ${error}`)
        res.status(401).json({ error: 'Unauthorized' });
    }
});

app.listen(8000, () => {
    console.log('Server started on 8000')
})