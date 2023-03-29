// command to open an instance of mongo in the terminal "sudo mongod --dbpath ~/data/db"
import mongoose from 'mongoose';
import 'dotenv/config';
const url = process.env.ATLAS_URL;

export const connect = async (): Promise<void> => {
    try {
        await mongoose.connect(`${url}`);
        console.log("succesfull connection");
    } catch (e: any) {
        throw new Error(e);
    }
}

export const disconnect = async (): Promise<void> => {
    await mongoose.disconnect();
    console.log("succesfull disconnection");
}