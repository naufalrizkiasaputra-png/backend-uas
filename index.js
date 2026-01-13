import express from "express";
import db from "./models/UserModel.js";
import UserRoute from "./routes/UserRoute.js"
// import User from "./models/UserModel.js"; // Buka komentar ini nanti jika ingin generate tabel otomatis

const app = express();
const port = 5000; // Port backend biasanya 5000 (agar beda dengan frontend)

// Tes koneksi database
try {
    await db.authenticate();
    console.log('Database Connected...');
    // await User.sync(); // Nyalakan ini nanti kalau mau buat tabel otomatis
} catch (error) {
    console.error('Connection Error:', error);
}

app.use(express.json());

app.listen(port, () => console.log(`Server running at http://localhost:${port}`));