import { Router } from "express";
import { getRoom, getRooms, postRoom, updateRoom, deleteRoom } from '../controllers/rooms'

const router = Router();

router.get('/', getRooms);
router.get("/:bookingid", getRoom);
router.post("/", postRoom);
router.put("/:bookingid", updateRoom);
router.delete("/:bookingid", deleteRoom);

export { router };