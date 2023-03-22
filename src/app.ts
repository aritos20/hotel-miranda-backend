import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { routerBookings, routerLogin, routerRooms, routerUsers } from './routes/index';
const passport = require('passport');

const PORT = process.env.PORT || 3001;
const app = express();
require('./auth/auth');
app.use(express.json());
app.use(cors());

app.use('/login', routerLogin);
app.use('/bookings', passport.authenticate("jwt", { session: false }), routerBookings);
app.use('/rooms', passport.authenticate("jwt", { session: false }), routerRooms);
app.use('/users', passport.authenticate("jwt", { session: false }), routerUsers);

app.listen(PORT, () => console.log(`Listo por el puerto ${PORT}`));