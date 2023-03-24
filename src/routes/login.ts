import { NextFunction, Request, Response, Router } from "express";
import { loginCtrl } from "../controllers/login";
const passport = require('passport');
const jwt = require('jsonwebtoken');


const routerLogin = Router();

routerLogin.post('/', loginCtrl);

export { routerLogin };