import { Request, Response } from "express"
import { handleHttp } from "../utils/error.handle"

const getRoom = (req: Request, res: Response) => {
    try {
        
    } catch(e) {
       handleHttp(res, 'ERROR_GET_ROOM');
    }
}

const getRooms = (req: Request, res: Response) => {
    try {
        res.send('hola')
    } catch(e) {
       handleHttp(res, 'ERROR_GET_ROOMS');
    }
}

const updateRoom = (req: Request, res: Response) => {
    try {

    } catch(e) {
       handleHttp(res, 'ERROR_UPDATE_ROOM');
    }
}

const postRoom = ({ body }: Request, res: Response) => {
    try {
        res.send(body);
    } catch(e) {
       handleHttp(res, 'ERROR_POST_ROOM');
    }
}

const deleteRoom = (req: Request, res: Response) => {
    try {

    } catch(e) {
       handleHttp(res, 'ERROR_DELETE_ROOM');
    }
}

export { getRoom, getRooms, postRoom, updateRoom, deleteRoom };