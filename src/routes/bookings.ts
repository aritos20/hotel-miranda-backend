import { Router } from "express";
import { getBooking, getBookings, postBooking, updateBooking, deleteBooking } from '../controllers/bookings'

const routerBookings = Router();

routerBookings.get('/', getBookings);
routerBookings.get("/:bookingid", getBooking);
routerBookings.post("/", postBooking);
routerBookings.put("/:bookingid", updateBooking);
routerBookings.delete("/:bookingid", deleteBooking);

export { routerBookings };