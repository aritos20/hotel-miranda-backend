import { Request, Response } from "express"
import { handleHttp } from "../utils/error.handle"

const getBooking = (req: Request, res: Response) => {
    try {
        
    } catch(e) {
       handleHttp(res, 'ERROR_GET_BOOKING');
    }
}

const getBookings = (req: Request, res: Response) => {
    try {
        res.send('hola')
    } catch(e) {
       handleHttp(res, 'ERROR_GET_BOOKINGS');
    }
}

const updateBooking = (req: Request, res: Response) => {
    try {

    } catch(e) {
       handleHttp(res, 'ERROR_UPDATE_BOOKING');
    }
}

const postBooking = ({ body }: Request, res: Response) => {
    try {
        res.send(body);
    } catch(e) {
       handleHttp(res, 'ERROR_POST_BOOKING');
    }
}

const deleteBooking = (req: Request, res: Response) => {
    try {

    } catch(e) {
       handleHttp(res, 'ERROR_DELETE_BOOKING');
    }
}

export { getBooking, getBookings, postBooking, updateBooking, deleteBooking };