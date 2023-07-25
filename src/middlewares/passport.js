const passport = require('passport');
const passportJwt = require('passport-jwt');
const dotenv = require('dotenv');
const s_user = require('../services/s_user');

dotenv.config();
const JwtStrategy = passportJwt.Strategy;
const ExtractJwt = passportJwt.ExtractJwt;

const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.SECRET_KEY,
};

passport.use(
    new JwtStrategy(options, async (payload, done) => {
        try {
            const user = await s_user.getUser(payload.id);
            if (user) {
                return done(null, user);
            } else {
                return done(null, false);
            }
        } catch (error) {
            return done(error, false);
        }
    })
);
