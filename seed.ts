import bcrypt from "bcrypt";
import { connect, disconnect } from "./src/database/connection";
import { faker } from '@faker-js/faker';
import { Bookings } from "./src/interfaces/booking.interface";
import { bookingModel } from "./src/database/Models/bookingSchema";
import { Rooms } from "./src/interfaces/room.interface";
import { roomModel } from "./src/database/Models/roomSchema";
import { Users } from "./src/interfaces/user.interface";
import { userModel } from "./src/database/Models/userSchema";

const exec = async (): Promise<void> => {
    await connect();
    await createRandomBookings(30);
    await createRandomRooms(15);
    await createRandomUsers(10);
    await disconnect();
}

const createRandomBookings = async (bookingsNumber: number): Promise<void> => {
    let bookingsArr: Array<Bookings> = [];

    if (bookingModel) {
        await bookingModel.deleteMany();
    }

    for(let i: number = 0; i < bookingsNumber; i++) {
        const bookingObj: Bookings = await {
            id: i + 1,
            guest_name: faker.name.fullName(),
            guest_picture: faker.image.avatar(),
            order_date: faker.datatype.datetime(),
            check_in: faker.datatype.datetime(),
            check_out: faker.datatype.datetime(),
            special_request: faker.company.catchPhrase(),
            room_type: faker.company.catchPhraseDescriptor(),
            room_status: faker.datatype.boolean(),
            price: faker.datatype.number({min: 100, max: 400})
        };
        bookingsArr.push(bookingObj);
    }
    await bookingModel.create(bookingsArr);
}

const createRandomRooms = async (roomsNumber: number): Promise<void> => {
    let roomsArr: Array<Rooms> = [];

    if (roomModel) {
        await roomModel.deleteMany();
    }

    for(let i: number = 0; i < roomsNumber; i++) {
        const roomObj: Rooms = await {
            id: i + 1,
            picture: 'https://unsplash.com/es/fotos/67-sOi7mVIk',
            room_type: faker.company.catchPhraseDescriptor(),
            room_floor: 'Floor A-1',
            amenities: 'AC, Shower, Double Bed, Towel, Bathup, Coffee Set, LED TV, Wifi',
            price: faker.datatype.number({min: 100, max: 400}),
            offer: faker.datatype.number({min: 50, max: 200}),
            room_status: faker.datatype.boolean()
        }
        roomsArr.push(roomObj);
    }
    await roomModel.create(roomsArr);
}

const createRandomUsers = async (usersNumber: number): Promise<void> => {
    let usersArr: Array<Users> = [];

    if (userModel) {
        await userModel.deleteMany();
    }

    const usersObj: Users = await {
        id: 1,
        pass: bcrypt.hashSync("admin", 6),
        username: "admin",
        user_picture: faker.image.avatar(),
        joined_date: faker.datatype.datetime(),
        job_description: faker.name.jobDescriptor(),
        phone_number: faker.phone.number('+## ### ### ###'),
        email: "admin@admin.com"
    }
    usersArr.push(usersObj);
    
    for(let i: number = 1; i < usersNumber; i++) {
        const usersObj: Users = await {
            id: i + 1,
            pass: bcrypt.hashSync(faker.internet.password(), 6),
            username: faker.name.firstName(),
            user_picture: faker.image.avatar(),
            joined_date: faker.datatype.datetime(),
            job_description: faker.name.jobDescriptor(),
            phone_number: faker.phone.number('+## ### ### ###'),
            email: faker.internet.email()
        }
        usersArr.push(usersObj);
    }
    await userModel.create(usersArr);
}

exec();