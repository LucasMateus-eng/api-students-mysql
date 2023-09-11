import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

const dbName = process.env.DB_NAME;
const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASSWORD;
const dbHost = process.env.DB_HOST;

const sequelize = new Sequelize(dbName, dbUser, dbPassword, {
	dialect: "mysql",
	host: dbHost,
});

export default sequelize;

// Sem o sequelize, nós teriamos que nos responsabilizar pela conexão
// com o MySQL e as operações de leitura e escrita.
// Ex.: operação de leitura de todos os estudantes existentes.
//
// async function getAll() {
//  const query = "SELECT * FROM students"
//  const students = await db.queryDB(query)
//  return students
//}
//
// O sequelize é um ORM - (Object Relational Mapping.
// Uma interface para comunicação com o banco de dados e nosso código
// Ele abstrai os detalhes de conexão e das operações feitas no banco de dados.
