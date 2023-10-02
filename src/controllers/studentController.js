import studentRepository from "../repositories/studentRepository.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

class StudentController {
	async login(req, res) {
		try {
			const { email, password } = req.body;

			const student = await studentRepository.getOne({
				where: { email: email },
			});

			if (student && (await bcrypt.compare(password, student.password))) {
				const token = jwt.sign(
					{ student_id: student.id, email },
					process.env.TOKEN_KEY,
					{
						expiresIn: "5h",
					}
				);

				// res.cookie("jwt", token);

				return res.status(200).json({ token: token });
			}

			res.status(400).json({ error: "Credenciais inválidas." });
		} catch (error) {
			res.status(500).json({ error: error.message });
		}
	}

	async create(req, res) {
		try {
			const { name, age, course, department, email, password } = req.body;

			const oldStudent = await studentRepository.getOne({
				where: { email: email },
			});

			if (oldStudent) {
				return res
					.status(409)
					.json({ error: "Estudante já cadastrado. Faça o login." });
			}

			const salt = 10;
			const encryptedStudentPassword = await bcrypt.hash(password, salt);

			const student = await studentRepository.create({
				name: name,
				age: age,
				course: course,
				department: department,
				email: email.toLowerCase(),
				password: encryptedStudentPassword,
			});

			const token = jwt.sign(
				{ student_id: student.id, email },
				process.env.TOKEN_KEY,
				{ expiresIn: "5h" }
			);

			res.cookie("jwt", token);

			res.status(201).json(student);
		} catch (error) {
			res.status(500).json({ error: error.message });
		}
	}

	async getAll(req, res) {
		try {
			const students = await studentRepository.getAll();
			res.json(students);
		} catch (error) {
			res.status(500).json({ error: error.message });
		}
	}

	async getById(req, res) {
		try {
			const student = await studentRepository.getById(req.params.id);

			if (!student) {
				return res.status(404).json({ error: "Estudante não encontrado" });
			}

			res.json(student);
		} catch (error) {
			res.status(500).json({ error: error.message });
		}
	}

	async update(req, res) {
		try {
			const [affectedRows, student] = await studentRepository.update(
				req.params.id,
				req.body
			);

			if (!affectedRows || affectedRows == 0) {
				return res.status(500).json({
					error: `Não foi possível atualizar o estudante com id: ${req.params.id}`,
				});
			}

			if (!student) {
				return res.status(404).json({ error: "Estudante não encontrado" });
			}

			res.json(student);
		} catch (error) {
			res.status(500).json({ error: error.message });
		}
	}

	async delete(req, res) {
		try {
			const destroyedRows = await studentRepository.delete(req.params.id);

			if (destroyedRows === 0) {
				return res.status(500).json({
					error: `Não foi possível excluir o estudante com id: ${req.params.id}`,
				});
			}

			res.json({ message: "Estudante excluído com sucesso" });
		} catch (error) {
			res.status(500).json({ error: error.message });
		}
	}
}

export default new StudentController();
