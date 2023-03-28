// command to open an instance of mongo in the terminal "sudo mongod --dbpath ~/data/db"
import mongoose from 'mongoose';
import 'dotenv/config';

const userName = process.env.ATLAS_USER;
const password = process.env.ATLAS_PASSWORD;

export const connect = async (): Promise<void> => {
    try {
        await mongoose.connect(`mongodb+srv://${userName}:${password}@hotelmiranda.tsaxmxv.mongodb.net/?retryWrites=true&w=majority`);
        console.log("succesfull connection");
    } catch (e: any) {
        throw new Error(e);
    }
}

export const disconnect = async (): Promise<void> => {
    await mongoose.disconnect();
    console.log("succesfull disconnection");
}