import { NextFunction, Request, Response, Router } from "express";
import { loginCtrl } from "../controllers/login";
const passport = require('passport');
const jwt = require('jsonwebtoken');


const routerLogin = Router();

// routerLogin.post('/',
//     async (req: Request, res: Response, next: NextFunction) => {
//         passport.authenticate(
//             'login',
//             async(err: any, user: any, info: any) => {
//                 try {
//                     if (err || !user) {
//                         const error = new Error('An error ocurred.');
//                         return next(error);
//                     }

//                     req.login(
//                         user,
//                         { session: false },
//                         async (error) => {
//                             if (error) return next(error);
                            
//                             const body = { _id: user._id, email: user.email };
//                             const token = jwt.sign({ user: body }, process.env.SECRET_KEY, {expiresIn: '12h'});
//                             return res.json({ token });
//                         }
//                     );
//                 } catch (error) {
//                     return next (error);
//                 }
//             }
//         )(req, res, next);
//     });

routerLogin.post('/', loginCtrl);

export { routerLogin };