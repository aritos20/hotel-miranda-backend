import { Request, Response } from "express"
import { handleHttp } from "../utils/error.handle"

const getUser = (req: Request, res: Response) => {
    try {
        
    } catch(e) {
       handleHttp(res, 'ERROR_GET_USER');
    }
}

const getUsers = (req: Request, res: Response) => {
    try {
        res.send('hola')
    } catch(e) {
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