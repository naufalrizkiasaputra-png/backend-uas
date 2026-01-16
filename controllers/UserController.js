import Users from "../models/UserModel.js";
import argon2 from "argon2";

// 1. Ambil semua data user (Buat admin nanti)
export const getUsers = async(req, res) => {
    try {
        const response = await Users.findAll({
            attributes: ['uuid', 'name', 'email', 'role'] // Password jangan ditampilin
        });
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}

// 2. Buat User Baru (Register)
export const createUser = async(req, res) => {
    const {name, email, password, confPassword, role} = req.body;

    // Validasi password
    if(password !== confPassword) return res.status(400).json({msg: "Password dan Confirm Password tidak cocok"});

    // Hash password
    const hashPassword = await argon2.hash(password);

    try {
        await Users.create({
            name: name,
            email: email,
            password: hashPassword,
            role: role || "seeker" // Default jadi pencari kerja
        });
        res.status(201).json({msg: "Register Berhasil"});
    } catch (error) {
        res.status(400).json({msg: error.message});
    }
}