const express = require('express');
const passport = require('passport');
const c_user = require('../controllers/c_user');

const router = express.Router();

router.post('/register', c_user.register);

router.post('/login', c_user.login);

router.get(
    '/view',
    passport.authenticate('jwt', { session: false }),
    c_user.view
);

router.put(
    '/update',
    passport.authenticate('jwt', { session: false }),
    c_user.update
);

router.delete(
    '/delete',
    passport.authenticate('jwt', { session: false }),
    c_user.del
)

module.exports = router;