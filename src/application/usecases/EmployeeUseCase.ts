import { IEmployeeGateway } from "@gateways/IEmployeeGateway";
import { Employee } from "@entities/Employee";
import { isValidCpf } from "@utils/valid";
import { InvalidCPFError } from "@utils/errors/customerErrors";
import { EmployeeNotFoundError } from "@utils/errors/employeeErrors";

export class EmployeeUseCase {
	constructor(private readonly employeeGateway: IEmployeeGateway) { }

	async getAll(): Promise<Employee[]> {
		return await this.employeeGateway.allEmployees();
	}

	async createEmployee(employee: Employee): Promise<Employee> {	
		if (employee.getCpf() && ! isValidCpf(employee.getCpf())) {
			throw new InvalidCPFError("Invalid CPF format");	
		}
		return await this.employeeGateway.newEmployee(employee);
	}

	async getEmployeeById(id: number): Promise<Employee | null> {
		const employee = await this.employeeGateway.getEmployeeById(id);
		return employee ? employee : null;
	}

	async findEmployee(cpf: string): Promise<Employee | null> {
		if(!isValidCpf(cpf)) throw new InvalidCPFError("Invalid CPF format");
		return await this.employeeGateway.findEmployee(cpf);
	}

	async updateEmployee(id: number, data: Employee): Promise<void> {
        const employee = await this.getEmployeeById(id);
        if (!employee) throw new EmployeeNotFoundError("Employee not found");
		
        await this.employeeGateway.updateEmployee(id, data);
    }

	async deleteEmployee(id: number): Promise<void> {
		await this.employeeGateway.deleteEmployee(id);
	}
}
