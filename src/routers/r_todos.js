const express = require('express');
const passport = require('passport');

const c_todos = require('../controllers/c_todos');

const router = express.Router();

router.get(
    '/view/:id',
    passport.authenticate('jwt', { session: false }),
    c_todos.viewID
)

router.get(
    '/view',
    passport.authenticate('jwt', { session: false }),
    c_todos.view
)

router.post(
    '/create',
    passport.authenticate('jwt', { session: false }),
    c_todos.create
)

router.put(
    '/update/:id',
    passport.authenticate('jwt', { session: false }),
    c_todos.update
)

router.delete(
    '/delete/:id',
    passport.authenticate('jwt', { session: false }),
    c_todos.del
)

module.exports = router