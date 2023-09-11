import studentRepository from "../repositories/studentRepository.js";

class StudentController {
	async create(req, res) {
		try {
			const student = await studentRepository.create(req.body);
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
