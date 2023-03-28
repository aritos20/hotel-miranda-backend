import { Router } from "express";
import { loginCtrl } from "../controllers/login";

const routerLogin = Router();

routerLogin.post('/', loginCtrl);

export { routerLogin };