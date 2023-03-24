import bcrypt from "bcrypt";
import { faker } from '@faker-js/faker';
import connection, { dbQuery } from './src/database/connection';
import { Bookings } from './src/interfaces/fakerBooking.interface';
import { Rooms } from './src/interfaces/fakerRooms.interface';
import { Users } from './src/interfaces/fakerUsers.interface';

const run = async (): Promise<void> => {
    await connection.connect();
    await createRandomBookings(50);
    await createRandomRooms(20);
    await createRandomUsers(30);
    await connection.end();
}

const createRandomBookings = async (numberOfBookings: number): Promise<void> => {
    for(let i = 0; i < numberOfBookings; i++) {
        const bookingObj: Bookings = await {
            guest_name: faker.name.fullName(),
            guest_picture: faker.image.avatar(),
            order_date: faker.datatype.datetime(),
            check_in: faker.datatype.datetime(),
            check_out: faker.datatype.datetime(),
            special_request: faker.company.catchPhrase(),
            room_type: faker.company.catchPhraseDescriptor(),
            room_status: faker.datatype.number({min: 1, max: 2})
        }
        await dbQuery('INSERT INTO bookings SET ?', bookingObj);
    }
}

const createRandomRooms = async (numberOfRooms: number): Promise<void> => {
    for(let i = 0; i < numberOfRooms; i++) {
        const roomObj: Rooms = await {
            picture: 'https://unsplash.com/es/fotos/67-sOi7mVIk',
            room_id: faker.datatype.number(20),
            room_type: faker.company.catchPhraseDescriptor(),
            room_floor: 'Floor A-1',
            amenities: 'AC, Shower, Double Bed, Towel, Bathup, Coffee Set, LED TV, Wifi',
            price: faker.datatype.number({min: 100, max: 400}),
            offer: faker.datatype.number({min: 50, max: 200}),
            room_status: faker.datatype.number({min: 1, max: 2})
        }
        await dbQuery('INSERT INTO rooms SET ?', roomObj);
    }
}

const createRandomUsers = async (numberOfUsers: number): Promise<void> => {
    for(let i = 0; i < numberOfUsers; i++) {
        const usersObj: Users = await {
            pass: bcrypt.hashSync(faker.internet.password(), 6),
            user_picture: faker.image.avatar(),
            joined_date: faker.datatype.datetime(),
            job_description: faker.name.jobDescriptor(),
            phone_number: faker.phone.number('+## ### ### ###'),
            email: faker.internet.email()
        }
        await dbQuery('INSERT INTO users SET ?', usersObj);
    }
}

run();
