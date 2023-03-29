import { NextFunction, Request, Response } from "express";
import { handleHttp } from "../utils/error.handle";
import { connect, disconnect } from "../database/connection";
import { roomModel } from "../database/Models/roomSchema";

const getRoom = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        await connect();
        const room = await roomModel.findOne({ id: `${req.params.roomid}` });
        await disconnect();
        res.json({ success: true, data: room });
    } catch(e) {
        next(e);
        handleHttp(res, 'ERROR_GET_ROOM');
    }
}

const getRooms = async (_req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        await connect();
        const rooms = await roomModel.find();
        await disconnect();
        res.json({ success: true, data: rooms });
    } catch(e) {
        next(e);
        handleHttp(res, 'ERROR_GET_ROOMS');
    }
}

const updateRoom = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        await connect();
        await roomModel.findOneAndUpdate({ id: `${req.params.roomid}` }, req.body);
        await disconnect();
        res.json({ success: true, data: req.params.roomid });
    } catch(e) {
        next(e);
        handleHttp(res, 'ERROR_UPDATE_ROOM');
    }
}

const postRoom = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        await connect();
        const idForNewRoom = await roomModel.find();
        idForNewRoom.sort((a: any, b: any) => b.id - a.id);
        req.body.id = idForNewRoom[0].id + 1;
        await roomModel.create(req.body);
        await disconnect();
        res.json({ success: true, data: req.body });
    } catch(e) {
        next(e);
        handleHttp(res, 'ERROR_POST_ROOM');
    }
}

const deleteRoom = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        await connect();
        await roomModel.findOneAndDelete({ id: `${req.params.roomid}` });
        await disconnect();
        res.json({ success: true, data: req.params.roomid });
    } catch(e) {
        next(e);
        handleHttp(res, 'ERROR_DELETE_ROOM');
    }
}

export { getRoom, getRooms, postRoom, updateRoom, deleteRoom };