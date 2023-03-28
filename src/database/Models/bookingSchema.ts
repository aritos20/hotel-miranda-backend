import mongoose from 'mongoose';
import { Schema } from 'mongoose';
import { Bookings } from '../../interfaces/booking.interface';

const bookingSchema = new Schema<Bookings>({
    id: Number,
    guest_name: String,
    guest_picture: String,
    order_date: Date,
    check_in: Date,
    check_out: Date,
    special_request: String,
    room_type: String,
    room_status: Boolean,
});

export const bookingModel = mongoose.model('Bookings', bookingSchema);