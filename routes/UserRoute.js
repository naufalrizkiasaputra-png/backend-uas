import express from "express";
import { getUsers, createUser } from "../controllers/UserController.js";
import { Login } from "../controllers/Auth.js";

const router = express.Router();

router.get('/users', getUsers);
router.post('/users', createUser); // Ini sebenernya register juga
router.post('/register', createUser); // <-- KITA TAMBAH INI BIAR JELAS
router.post('/login', Login);

export default router;