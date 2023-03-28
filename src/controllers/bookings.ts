import { NextFunction, Request, Response } from "express";
import { bookingModel } from "../database/Models/bookingSchema";
import { handleHttp } from "../utils/error.handle";
import { connect, disconnect } from "../database/connection";

const getBooking = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        await connect();
        const booking = await bookingModel.findOne({ id:`${req.params.bookingid}`});
        await disconnect();
        res.json(booking);
    } catch(e) {
        next(e);
        handleHttp(res, 'ERROR_GET_BOOKING');
    }
}

const getBookings = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        await connect();
        const bookings = await bookingModel.find();
        await disconnect();
        res.json(bookings);
    } catch(e) {
        next(e);
        handleHttp(res, 'ERROR_GET_BOOKINGS');
    }
}

const updateBooking = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        await connect();
        await bookingModel.findOneAndUpdate({id:`${req.params.bookingid}`}, req.body);
        await disconnect();
        res.json({success: true});
    } catch(e) {
        next(e);
        handleHttp(res, 'ERROR_UPDATE_BOOKING');
    }
}

const postBooking = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        await connect();
        const idForNewBooking = await bookingModel.find();
        idForNewBooking.sort((a: any, b: any) => b.id - a.id);
        req.body.id = idForNewBooking[0].id + 1;
        await bookingModel.create(req.body);
        await disconnect();
        res.json({success: true})
    } catch(e) {
        next(e);
        handleHttp(res, 'ERROR_POST_BOOKING');
    }
}

const deleteBooking = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        await connect();
        await bookingModel.findOneAndDelete({id:`${req.params.bookingid}`});
        await disconnect();
        res.json({success: true});
    } catch(e) {
        next(e);
        handleHttp(res, 'ERROR_DELETE_BOOKING');
    }
}

export { getBooking, getBookings, postBooking, updateBooking, deleteBooking };