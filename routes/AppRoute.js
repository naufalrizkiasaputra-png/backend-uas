import express from "express";
import {
    applyJob,
    getJobApplicants,
    updateAppStatus
} from "../controllers/AppController.js";

const router = express.Router();

router.post('/apply', applyJob); // User ngirim lamaran
router.get('/applications', getJobApplicants); // Company liat daftar pelamar
router.patch('/applications/:id', updateAppStatus); // Company update status (Terima/Tolak)

export default router;