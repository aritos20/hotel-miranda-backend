import mongoose from 'mongoose';
import { Schema } from 'mongoose';
import { Rooms } from '../../interfaces/room.interface';

const roomSchema = new Schema<Rooms>({
    id: Number,
    picture: String,
    room_id: Number,
    room_type: String,
    room_floor: String,
    amenities: String,
    price: Number,
    offer: Number,
    room_status: Boolean
});

export const roomModel = mongoose.model('Rooms', roomSchema);