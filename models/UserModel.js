import { Sequelize } from "sequelize";
import db from "../config/database.js";

const { DataTypes } = Sequelize;

const Users = db.define('users', {
    uuid: {
        type: DataTypes.STRING,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        validate: { notEmpty: true }
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: { notEmpty: true, len: [3, 100] }
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: { notEmpty: true, isEmail: true }
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: { notEmpty: true }
    },
    role: {
        type: DataTypes.STRING, 
        defaultValue: "seeker", // Bisa: 'seeker', 'company', 'admin'
        allowNull: false
    },
    // Khusus Company: Nama Perusahaan & Lokasi
    company_name: {
        type: DataTypes.STRING,
        allowNull: true
    },
    location: {
        type: DataTypes.STRING,
        allowNull: true
    }
}, {
    freezeTableName: true
});

export default Users;