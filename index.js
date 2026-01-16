import express from "express";
import cors from "cors";
import db from "./config/database.js";
import UserRoute from "./routes/UserRoute.js";
import JobRoute from "./routes/JobRoute.js";
import AppRoute from "./routes/AppRoute.js"; 

// Import Model agar tabel ter-generate
import "./models/UserModel.js";
import "./models/JobModel.js";
import "./models/ApplicationModel.js";

const app = express();
const port = 5000;

(async () => {
    try {
        await db.authenticate();
        console.log('Database Connected...');
        
        // --- INI PERINTAH UNTUK GENERATE TABEL ---
        // Kalau tabel di phpMyAdmin sudah dihapus, 
        // baris ini akan membuatkan tabel baru yang BENAR (ada password & role).
        await db.sync(); 
        // -----------------------------------------

    } catch (error) {
        console.error('Connection Error:', error);
    }
})();

app.use(cors());
app.use(express.json());

app.use(UserRoute);
app.use(JobRoute);
app.use(AppRoute); 

app.listen(port, () => console.log(`Server running at http://localhost:${port}`));