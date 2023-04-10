import { NextFunction, Request, Response } from "express";
const passport = require('passport');
const jwt = require('jsonwebtoken');

export const loginCtrl = async (req: Request, res: Response, next: NextFunction) => {
    passport.authenticate(
        'login',
        async(err: any, user: any, info: any) => {
            try {
                if (err || !user) {
                    const error = new Error('An error ocurred.');
                    return next(error);
                }

                req.login(
                    user,
                    { session: false },
                    async (error) => {
                        if (error) return next(error);
                        
                        const body = { _id: user._id, email: user.email };
                        const token = jwt.sign({ user: body }, process.env.SECRET_KEY);
                        return res.json({ token });
                    }
                );
            } catch (error) {
                return next (error);
            }
        }
    )(req, res, next);
}