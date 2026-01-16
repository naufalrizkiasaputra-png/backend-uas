import express from "express";
import cors from "cors"; // Pastikan sudah install: npm install cors
import db from "./config/database.js";
import UserRoute from "./routes/UserRoute.js";
// import Users from "./models/UserModel.js"; // Uncomment ini kalau mau generate tabel otomatis pertama kali

const app = express();
const port = 5000;

// Tes koneksi database & Sync
(async () => {
    try {
        await db.authenticate();
        console.log('Database Connected...');
        // await Users.sync(); // Uncomment ini sekali aja buat bikin tabel, terus comment lagi
    } catch (error) {
        console.error('Connection Error:', error);
    }
})();

app.use(cors());
app.use(express.json()); // Biar bisa terima data JSON

// Gunakan Route
app.use(UserRoute);

app.listen(port, () => console.log(`Server running at http://localhost:${port}`));