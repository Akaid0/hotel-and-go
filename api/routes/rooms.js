import express from 'express';
import { verifyAdmin, verifyToken } from '../utils/verifyToken.js';
import { createRoom, deleteRoom, getRoom, getRooms, updateRoom, updateRoomAvailability } from '../controllers/room.js';

const router = express.Router();

//create
router.post("/:hotelid",verifyToken, verifyAdmin, createRoom)

//update
router.put("/:id",verifyToken, verifyAdmin, updateRoom)
router.put("/availability/:id", updateRoomAvailability)
//delete
router.delete("/:id/:hotelid",verifyToken, verifyAdmin, deleteRoom)
//get
router.get("/:id", getRoom)
//get all
router.get("/", getRooms)

export default router