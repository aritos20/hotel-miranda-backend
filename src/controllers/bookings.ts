import { NextFunction, Request, Response } from "express";
import { dbQuery } from '../database/connection';
import { Bookings } from "../interfaces/fakerBooking.interface";
import { handleHttp } from "../utils/error.handle";

const getBooking = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const booking: Bookings | unknown = await dbQuery('SELECT * FROM bookings WHERE booking_id = ?;', req.params.bookingid);
        res.json(booking);
    } catch(e) {
        next(e);
        handleHttp(res, 'ERROR_GET_BOOKING');
    }
}

const getBookings = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const bookings: Bookings | unknown = await dbQuery('SELECT * FROM bookings;', null);
        res.json(bookings);
    } catch(e) {
        next(e);
        handleHttp(res, 'ERROR_GET_BOOKINGS');
    }
}

const updateBooking = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        await dbQuery('UPDATE bookings SET ? WHERE booking_id = ?;', [req.body, req.params.bookingid]);
        res.json({success: true, message: 'booking update succesfully', booking: req.body});
    } catch(e) {
        next(e);
        handleHttp(res, 'ERROR_UPDATE_BOOKING');
    }
}

const postBooking = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        await dbQuery('INSERT INTO bookings SET ?', req.body);
        res.json({success: true, message: 'booking succesfully done', booking: req.body});
    } catch(e) {
        next(e);
        handleHttp(res, 'ERROR_POST_BOOKING');
    }
}

const deleteBooking = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        await dbQuery('DELETE FROM bookings WHERE booking_id = ?;', req.params.bookingid)
        res.json({success: true, message: 'booking deleted'});
    } catch(e) {
        next(e);
        handleHttp(res, 'ERROR_DELETE_BOOKING');
    }
}

export { getBooking, getBookings, postBooking, updateBooking, deleteBooking };