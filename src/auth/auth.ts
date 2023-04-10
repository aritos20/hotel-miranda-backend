const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;
const JWTstrategy = require('passport-jwt').Strategy;
import { connect, disconnect } from "../database/connection";
import { userModel } from "../database/Models/userSchema";
import bcrypt from "bcrypt";


passport.use(
    'login',
    new localStrategy(
        {
            usernameField: 'email',
            passwordField: 'password'
        },
        async (email: string, password: string, done: Function) => {
            try {
                await connect();
                const userValidation = await userModel.findOne({email});
                await disconnect();
                if (!userValidation) {
                    return done(null, false, { message: 'User not found'});
                }
                const compare = await bcrypt.compare(password, userValidation.pass);
                if (!compare) {
                    return done(null, false, { message: 'Invalid credentials'});
                }
                return done(null, userValidation, { message: 'Logged in Successfully' })
            } catch (e) {
                return done(e);
            }
        }
    )
)

passport.use(
    new JWTstrategy(
        {
            secretOrKey: process.env.SECRET_KEY,
            jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken()
        },
        async (token: any, done: any) => {
            try {
                return done(null, token.user);
            } catch (error) {
                done(error);
            }
        }
    )
)