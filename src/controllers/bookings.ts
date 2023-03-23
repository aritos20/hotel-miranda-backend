import { NextFunction, Request, Response } from "express";
import { dbQuery } from '../database/connection';
import { Bookings } from "../interfaces/fakerBooking.interface";
import { handleHttp } from "../utils/error.handle";

const getBooking = (req: Request, res: Response, next: NextFunction) => {
    try {
        dbQuery('SELECT * FROM bookings WHERE booking_id = ?;', req.params.bookingid)
            .then((booking: Bookings | unknown) => res.json(booking))
            .catch((e: Error): void => next(e));
    } catch(e) {
       handleHttp(res, 'ERROR_GET_BOOKING');
    }
}

const getBookings = (req: Request, res: Response, next: NextFunction) => {
    try {
        dbQuery('SELECT * FROM bookings;', null)
            .then((bookings: Bookings | unknown) => res.json(bookings))
            .catch((e: Error) => next(e));
    } catch(e) {
       handleHttp(res, 'ERROR_GET_BOOKINGS');
    }
}

const updateBooking = (req: Request, res: Response, next: NextFunction) => {
    try {
        dbQuery('UPDATE bookings SET ? WHERE booking_id = ?;', [req.body, req.params.bookingid])
            .then((booking: Bookings | unknown) => res.json({message: 'booking update succesfully', booking: req.body}))
            .catch((e: Error) => next(e))
    } catch(e) {
       handleHttp(res, 'ERROR_UPDATE_BOOKING');
    }
}

const postBooking = (req: Request, res: Response, next: NextFunction) => {
    try {
        dbQuery('INSERT INTO bookings SET ?', req.body)
            .then((booking: Bookings | unknown) => res.json({message: 'booking succesfully done', booking: req.body}))
            .catch((e: Error) => next(e));
    } catch(e) {
       handleHttp(res, 'ERROR_POST_BOOKING');
    }
}

const deleteBooking = (req: Request, res: Response, next: NextFunction) => {
    try {
        dbQuery('DELETE FROM bookings WHERE booking_id = ?;', req.params.bookingid)
            .then(() => res.json({message: 'booking deleted'}))
            .catch((e: Error) => next(e))
    } catch(e) {
       handleHttp(res, 'ERROR_DELETE_BOOKING');
    }
}

export { getBooking, getBookings, postBooking, updateBooking, deleteBooking };