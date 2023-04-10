import { NextFunction, Request, Response } from "express";
import { connect, disconnect } from "../database/connection";
import { handleHttp } from "../utils/error.handle";
import { userModel } from "../database/Models/userSchema";
import bcrypt from "bcrypt";

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

const updateUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        req.body.pass = bcrypt.hashSync(req.body.pass, 6);
        await connect();
        await userModel.findOneAndUpdate({ id: `${req.params.userid}` }, req.body);
        await disconnect();
        res.json({ success: true, data: req.params.userid });
    } catch(e) {
        next(e);
        handleHttp(res, 'ERROR_UPDATE_USER');
    }
}

const postUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        await connect();
        const idForNewUser = await userModel.find();
        idForNewUser.sort((a: any, b: any) => b.id - a.id);
        req.body.id = idForNewUser[0].id + 1;
        req.body.pass = bcrypt.hashSync(req.body.pass, 6);
        await userModel.create(req.body);
        await disconnect();
        res.json({ success: true, data: req.body });
    } catch(e) {
        next(e);
        handleHttp(res, 'ERROR_POST_USER');
    }
}

const deleteUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        await connect();
        await userModel.findOneAndDelete({ id: `${req.params.userid}` });
        await disconnect();
        res.json({ success: true, data: req.params.userid });
    } catch(e) {
        next(e);
        handleHttp(res, 'ERROR_DELETE_USER');
    }
}

export { getUser, getUsers, postUser, updateUser, deleteUser };