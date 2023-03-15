import { Router } from "express";
import { getBooking, getBookings, postBooking, updateBooking, deleteBooking } from '../controllers/bookings'

const router = Router();

router.get('/', getBookings);
router.get("/:bookingid", getBooking);
router.post("/", postBooking);
router.put("/:bookingid", updateBooking);
router.delete("/:bookingid", deleteBooking);

export { router };