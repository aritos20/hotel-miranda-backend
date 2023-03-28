import mongoose, { Schema } from 'mongoose';
import { Users } from '../../interfaces/user.interface';

const userSchema = new Schema<Users>({
    id: Number,
    pass: String,
    user_picture: String,
    joined_date: String,
    job_description: String,
    phone_number: String,
    email: String
})

export const userModel = mongoose.model('users', userSchema);
