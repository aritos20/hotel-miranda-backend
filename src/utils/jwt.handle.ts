import { sign, verify } from "jsonwebtoken";
import { login } from "../interfaces/login.interface";

const JWT_SECRET = process.env.JWT_SECRET || "token.01010101";

const generateToken = (email: string) => {
    const jwt = sign(email, JWT_SECRET);
    return jwt;
};

const verifyToken = (jwt: string) => {
    const isOk = verify(jwt, JWT_SECRET);
    return isOk;
};

export { generateToken, verifyToken };