import express from "express";
import { getUsers, createUser } from "../controllers/UserController.js";
import { Login } from "../controllers/Auth.js"; // <-- Import Login

const router = express.Router();

router.get('/users', getUsers);
router.post('/users', createUser);
router.post('/login', Login); // <-- Tambah Route Login

export default router;