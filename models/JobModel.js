import { Sequelize } from "sequelize";
import db from "../config/database.js";
import Users from "./UserModel.js"; // Kita butuh relasi ke User (Company)

const { DataTypes } = Sequelize;

const Jobs = db.define('jobs', {
    uuid: {
        type: DataTypes.STRING,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        validate: { notEmpty: true }
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.TEXT, // Pakai TEXT biar muat panjang
        allowNull: false
    },
    type: {
        type: DataTypes.STRING, // Full-time, Magang, Part-time
        allowNull: false
    },
    userId: { // ID si Company yang posting
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: { notEmpty: true }
    }
}, {
    freezeTableName: true
});

// Relasi: User (Company) punya banyak Job
Users.hasMany(Jobs);
Jobs.belongsTo(Users, { foreignKey: 'userId' });

export default Jobs;