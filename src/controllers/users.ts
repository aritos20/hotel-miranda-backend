import { NextFunction, Request, Response } from "express";
import { connect, disconnect } from "../database/connection";
import { userModel } from "../database/Models/userSchema";
import { handleHttp } from "../utils/error.handle";

const getUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        await connect();
        const user = await userModel.findOne({ id: `${req.params.userid}`}, "-pass");
        await disconnect();
        res.json({ success: true, data: user });
    } catch(e) {
        next(e);
        handleHttp(res, 'ERROR_GET_USER');
    }
}

const getUsers = async (_req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        await connect();
        const users = await userModel.find({}, "-pass");
        await disconnect();
        res.json({ success: true, data: users });
    } catch(e) {
        next(e);
        handleHttp(res, 'ERROR_GET_USERS');
    }
}

const updateUser = (req: Request, res: Response) => {
    try {

    } catch(e) {
       handleHttp(res, 'ERROR_UPDATE_USER');
    }
}

const postUser = ({ body }: Request, res: Response) => {
    try {
        res.send(body);
    } catch(e) {
       handleHttp(res, 'ERROR_POST_USER');
    }
}

const deleteUser = (req: Request, res: Response) => {
    try {

    } catch(e) {
       handleHttp(res, 'ERROR_DELETE_USER');
    }
}

export { getUser, getUsers, postUser, updateUser, deleteUser };