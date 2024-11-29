import { EmployeeUseCase } from "@usecases/EmployeeUseCase";
import { defaultReturnStatement } from "@utils/http";
import { Employee } from "@entities/Employee";

export class EmployeeController {
	constructor(private employeeUseCase: EmployeeUseCase) { }

	async getAll(req, res) {
		try {
			const employees = await this.employeeUseCase.getAll();
			defaultReturnStatement(res, "Employees", employees);
		} catch (err) {
			console.error(err);
			res.status(400).json({ error: err.message });
		}
	}

	async createEmployee(req, res) {
		try {
			const {cpf, name, username, password} = req.body
			const employeeData = new Employee(cpf,name,username,password);	
			const employee = await this.employeeUseCase.createEmployee(employeeData);
			defaultReturnStatement(res, "Employee Created", employee);
		} catch (err) {
			console.error(err);
			res.status(400).json({ error: err.message });
		}
	}

	async findEmployee(req, res) {
		try {
			const employee = await this.employeeUseCase.findEmployee(req.params.cpf);
			defaultReturnStatement(res, "Employee Found", employee);
		} catch (err) {
			console.error(err);
			res.status(400).json({ error: err.message });
		}
	}

	async updateEmployee(req, res) {
		try {
			const employee = await this.employeeUseCase.updateEmployee(req.params.id, req.body);
			defaultReturnStatement(res, "Employee Updated", employee);
		} catch (err) {
			console.error(err);
			res.status(400).json({ error: err.message });
		}
	}

	async deleteEmployee(req, res) {
		try {
			await this.employeeUseCase.deleteEmployee(req.params.id);
			defaultReturnStatement(res, "Employee Deleted", "Operation executed successfully.");
		} catch (err) {
			console.error(err);
			res.status(400).json({ error: err.message });
		}
	}
}
