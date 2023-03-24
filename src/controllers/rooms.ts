import { NextFunction, Request, Response } from "express";
import { dbQuery } from '../database/connection';
import { Rooms } from "../interfaces/fakerRooms.interface";
import { handleHttp } from "../utils/error.handle";

const getRoom = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const room: Rooms | unknown = await dbQuery('SELECT * FROM rooms WHERE id = ?;', req.params.roomid);
        res.json(room); 
    } catch(e) {
        next(e);
        handleHttp(res, 'ERROR_GET_ROOM');
    }
}

const getRooms = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const rooms: Rooms | unknown = await dbQuery('SELECT * FROM rooms;', null);
        res.json(rooms);
    } catch(e) {
        next(e);
        handleHttp(res, 'ERROR_GET_ROOMS');
    }
}

const updateRoom = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        await dbQuery('UPDATE rooms SET ? WHERE id = ?;', [req.body, req.params.roomid]);
        res.json({success: true, message: 'room update succesfully'});
    } catch(e) {
        next(e);
        handleHttp(res, 'ERROR_UPDATE_ROOM');
    }
}

const postRoom = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        await dbQuery('INSERT INTO rooms SET ?;', req.body);
        res.json({success: true, message: 'room succesfully added'});
    } catch(e) {
        next(e);
        handleHttp(res, 'ERROR_POST_ROOM');
    }
}

const deleteRoom = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        await dbQuery('DELETE FROM rooms WHERE id = ?;', req.params.roomid);
        res.json({success: true, message: 'room deleted'});
    } catch(e) {
        next(e);
        handleHttp(res, 'ERROR_DELETE_ROOM');
    }
}

export { getRoom, getRooms, postRoom, updateRoom, deleteRoom };