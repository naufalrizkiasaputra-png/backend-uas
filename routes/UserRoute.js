import express from "express";
import {
    getUsers,
    createUser
} from "../controllers/UserController.js";

const router = express.Router();

router.get('/users', getUsers);  // Buat liat data user (Method GET)
router.post('/users', createUser); // Buat register user baru (Method POST)

export default router;