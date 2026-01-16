import Jobs from "../models/JobModel.js";
import Users from "../models/UserModel.js";

// 1. Ambil Semua Lowongan (Buat Halaman Depan)
export const getJobs = async(req, res) =>{
    try {
        const response = await Jobs.findAll({
            include:[{
                model: Users, // Join ke tabel User biar tau siapa yang posting
                attributes:['name','email','role'] 
            }]
        });
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}

// 2. Buat Lowongan Baru
export const createJob = async(req, res) =>{
    const {title, description, type, userId} = req.body; // userId dikirim manual dulu buat tes
    try {
        await Jobs.create({
            title: title,
            description: description,
            type: type, // Fulltime/Part time
            userId: userId
        });
        res.status(201).json({msg: "Lowongan Berhasil Dibuat"});
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}