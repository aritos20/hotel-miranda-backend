import { faker } from '@faker-js/faker';
import connection, { dbQuery } from './src/database/connection';
import { Bookings } from './src/interfaces/fakerBooking.interface';
import { Rooms } from './src/interfaces/fakerRooms.interface';
import { Users } from './src/interfaces/fakerUsers.interface';

const createRandomBookings = async (): Promise<void> => {
    const bookingObj: Bookings = {
        booking_id: faker.datatype.number(),
        guest_name: faker.name.fullName(),
        guest_picture: faker.image.avatar(),
        order_date: faker.datatype.datetime(),
        check_in: faker.datatype.datetime(),
        check_out: faker.datatype.datetime(),
        special_request: faker.company.catchPhrase(),
        room_type: faker.company.catchPhraseDescriptor(),
        room_status: faker.company.catchPhraseDescriptor()
    }
    await connection.connect();
    await dbQuery('INSERT INTO bookings SET ?', bookingObj);
    await connection.end();
}

createRandomBookings();
