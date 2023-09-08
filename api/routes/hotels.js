import express from 'express';
import Hotel from '../models/Hotel.js';
import {countByCity, 
        countByType, 
        createHotel, 
        deleteHotel, 
        getHotel, 
        getHotelRooms, 
        getHotels, 
        updateHotel 
    } from '../controllers/hotel.js';
import { verifyAdmin, verifyToken, verifyUser } from '../utils/verifyToken.js';

const router = express.Router();

//create
router.post("/",verifyToken, verifyAdmin, createHotel)

//update
router.put("/:id",verifyToken, verifyAdmin, updateHotel)

//delete
router.delete("/:id",verifyToken, verifyAdmin, deleteHotel)

//get
router.get("/find/:id", getHotel)

//get all
router.get("/", getHotels)
router.get("/countByCity", countByCity)
router.get("/countByType", countByType)
router.get("/room/:id", getHotelRooms)

export default router;