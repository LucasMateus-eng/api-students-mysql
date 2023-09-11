import { Sequelize } from "sequelize";
import db from "../config/database.js";

const Student = db.define("Student", {
	id: {
		type: Sequelize.INTEGER.UNSIGNED,
		primaryKey: true, // NOT NULL E UNIQUE
		autoIncrement: true,
	},
	name: {
		type: Sequelize.STRING(200),
		allowNull: false,
	},
	age: {
		type: Sequelize.INTEGER.UNSIGNED,
		allowNull: false,
	},
	course: {
		type: Sequelize.STRING(160),
		allowNull: false,
	},
	department: {
		type: Sequelize.STRING(160),
		allowNull: false,
	},
});

export default Student;
