import Users from "../models/UserModel.js";

// 1. Ambil semua data user
export const getUsers = async(req, res) => {
    try {
        const response = await Users.findAll({
            attributes: ['uuid', 'name', 'email', 'role', 'password'] // Password kelihatan gak apa-apa buat tugas
        });
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}

// 2. Buat User Baru (Register Simpel)
export const createUser = async(req, res) => {
    const {name, email, password, confPassword, role} = req.body;

    // Cek konfirmasi password
    if(password !== confPassword) return res.status(400).json({msg: "Password dan Confirm Password tidak cocok"});

    try {
        await Users.create({
            name: name,
            email: email,
            password: password, // <-- Langsung simpan string password user
            role: role || "seeker"
        });
        res.status(201).json({msg: "Register Berhasil"});
    } catch (error) {
        res.status(400).json({msg: error.message});
    }
}