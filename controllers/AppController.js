import Applications from "../models/ApplicationModel.js";
import Users from "../models/UserModel.js";
import Jobs from "../models/JobModel.js";

// 1. User Melamar Pekerjaan
export const applyJob = async(req, res) => {
    const { userId, jobId } = req.body; 
    
    try {
        // Cek dulu, udah pernah ngelamar belum?
        const existingApp = await Applications.findOne({
            where: {
                userId: userId,
                jobId: jobId
            }
        });

        if(existingApp) return res.status(400).json({msg: "Anda sudah melamar di pekerjaan ini!"});

        await Applications.create({
            userId: userId,
            jobId: jobId,
            status: "pending" // Status awal pasti pending
        });
        res.status(201).json({msg: "Lamaran berhasil dikirim!"});
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}

// 2. Company Melihat Pelamar di Lowongan Mereka
export const getJobApplicants = async(req, res) => {
    try {
        const response = await Applications.findAll({
            include: [
                {
                    model: Users, // Biar kelihatan nama pelamarnya siapa
                    attributes: ['name', 'email', 'role']
                },
                {
                    model: Jobs, // Biar tau ini lamaran buat posisi apa
                    attributes: ['title']
                }
            ]
        });
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}

// 3. Update Status (Terima/Tolak)
export const updateAppStatus = async(req, res) => {
    const { status } = req.body; // status bisa: 'accepted' atau 'rejected'
    
    try {
        const app = await Applications.findOne({
            where: {
                uuid: req.params.id // Kita cari berdasarkan UUID lamaran
            }
        });

        if(!app) return res.status(404).json({msg: "Lamaran tidak ditemukan"});

        app.status = status;
        await app.save();

        res.status(200).json({msg: "Status lamaran diperbarui"});
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}