import { login } from "../interfaces/login.interface";
const passport = require('passport');
const localStrategy = require('passport-local').Strategy;

const validUser: login = {
    email: 'admin@admin.com',
    password: 'admin'
}

passport.use(
    'login',
    new localStrategy(
        {
            usernameField: 'email',
            passwordField: 'password'
        },
        async (email: string, password: string, done: Function) => {
            try {
                if (validUser.email === email && validUser.password === password) {
                    return done(null, validUser, { message: 'Succesfull login'});
                }
                return done(null, false, { message: 'Invalid credentials'});
            } catch (e) {
                return done(e);
            }
        }
    )
)