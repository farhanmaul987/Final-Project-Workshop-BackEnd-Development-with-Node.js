const express = require('express');
const dotenv = require('dotenv');
const passport = require('passport');

const r_user = require('./routers/r_user');
const r_todos = require('./routers/r_todos');

require('./middlewares/passport');

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.use('/user', r_user);
app.use('/todos', r_todos)

process.env.TZ = 'UTC';


app.listen(port, () => {
    console.log(`Server berjalan pada port ${port}!`);
})