import { Sequelize } from "sequelize";

const db = new Sequelize('uaspemweb', 'root', 'root', { // Password MAMP biasanya 'root'
    host: 'localhost',
    dialect: 'mysql',
    port: 8889 // <--- Tambahkan baris ini jika pakai MAMP
});

export default db;