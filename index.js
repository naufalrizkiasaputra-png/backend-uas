import express from "express";
import cors from "cors";
import db from "./config/database.js";
import UserRoute from "./routes/UserRoute.js";

// --- BAGIAN INI YANG BIKIN TABEL MUNCUL ---
// Kamu wajib import file modelnya di sini walau tidak dipakai variable-nya
import "./models/UserModel.js";
import "./models/JobModel.js";
import "./models/ApplicationModel.js";
// ------------------------------------------

const app = express();
const port = 5000;

(async () => {
    try {
        await db.authenticate();
        console.log('Database Connected...');
        
        // Nyalakan ini sekali, save, tunggu terminal jalan, cek phpMyAdmin
        await db.sync(); 
        
    } catch (error) {
        console.error('Connection Error:', error);
    }
})();

app.use(cors());
app.use(express.json());
app.use(UserRoute);

app.listen(port, () => console.log(`Server running at http://localhost:${port}`));