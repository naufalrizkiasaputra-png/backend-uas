import { Sequelize } from "sequelize";
import db from "../config/database.js";
import Users from "./UserModel.js";
import Jobs from "./JobModel.js";

const { DataTypes } = Sequelize;

const Applications = db.define('applications', {
    uuid: {
        type: DataTypes.STRING,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        validate: { notEmpty: true }
    },
    status: {
        type: DataTypes.STRING,
        defaultValue: "pending", // pending, accepted, rejected
    },
    userId: { // Pelamar
        type: DataTypes.INTEGER,
        allowNull: false
    },
    jobId: { // Lowongan yang dilamar
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    freezeTableName: true
});

// Relasi
Users.hasMany(Applications); // User punya banyak lamaran
Applications.belongsTo(Users, { foreignKey: 'userId' });

Jobs.hasMany(Applications); // Job punya banyak pelamar
Applications.belongsTo(Jobs, { foreignKey: 'jobId' });

export default Applications;