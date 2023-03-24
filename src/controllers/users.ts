import { NextFunction, Request, Response } from "express";
import { dbQuery } from "../database/connection";
import { Users } from "../interfaces/fakerUsers.interface";
import { handleHttp } from "../utils/error.handle";
import bcrypt from "bcrypt";

const getUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const user: Users | unknown = await dbQuery('SELECT *, NULL AS pass FROM users WHERE user_id = ?;', Number(req.params.userid));
        res.json(user);
    } catch(e) {
        next(e);
        handleHttp(res, 'ERROR_GET_USER');
    }
}

const getUsers = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const users: Users | unknown = await dbQuery('SELECT *, NULL AS pass FROM users;', null);
        res.json(users);
    } catch(e) {
        next(e);
        handleHttp(res, 'ERROR_GET_USERS');
    }
}

const updateUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        req.body.pass = bcrypt.hashSync(req.body.pass, 6);
        await dbQuery('UPDATE users SET ? WHERE user_id = ?;', [req.body, Number(req.params.roomid)]);
        res.json({success: true, message: 'user update succesfully'});
    } catch(e) {
        next(e);
        handleHttp(res, 'ERROR_UPDATE_USER');
    }
}

const postUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        req.body.pass = bcrypt.hashSync(req.body.pass, 6);
        await dbQuery('INSERT INTO users SET ?;', req.body);
        res.json({success: true, message: 'user succesfully added'});
    } catch(e) {
        next(e);
        handleHttp(res, 'ERROR_POST_USER');
    }
}

const deleteUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        await dbQuery('DELETE FROM users WHERE user_id = ?;', Number(req.params.roomid));
        res.json({success: true, message: 'user deleted'});
    } catch(e) {
        next(e);
        handleHttp(res, 'ERROR_DELETE_USER');
    }
}

export { getUser, getUsers, postUser, updateUser, deleteUser };