import Student from "../models/studentModel.js";

class StudentRepository {
	// Exemplo de argumento:
	// { name: "Neris", age: 26, course: "Engenharia", department: "Centro TECH" }
	async create(studentData) {
		return await Student.create(studentData);
	}

	async getAll() {
		return await Student.findAll();
	}

	async getById(id) {
		return await Student.findByPk(id);
	}

	async getOne(options) {
		return await Student.findOne(options);
	}

	async update(id, studentData) {
		return await Student.update(studentData, {
			returning: true,
			where: { id: id },
		});
	}

	async delete(id) {
		return await Student.destroy({
			where: {
				id: id,
			},
		});
	}
}

export default new StudentRepository();
