import Users from "../models/UserModel.js";

export const Login = async (req, res) => {
    try {
        // 1. Cari user berdasarkan email
        const user = await Users.findOne({
            where: {
                email: req.body.email
            }
        });

        // 2. Kalau user gak ketemu
        if(!user) return res.status(404).json({msg: "User tidak ditemukan"});

        // 3. Cek Password (Sederhana/Tanpa Hash sesuai request)
        if(user.password !== req.body.password) return res.status(400).json({msg: "Password Salah"});

        // 4. Kalau sukses, kirim data user
        const uuid = user.uuid;
        const name = user.name;
        const email = user.email;
        const role = user.role;
        const id = user.id; // Penting buat relasi nanti

        res.status(200).json({uuid, name, email, role, id});

    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}