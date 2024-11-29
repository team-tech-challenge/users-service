import { Employee } from "@entities/Employee";

export interface IEmployeeGateway {
	allEmployees(): Promise<Employee[]>;

	getEmployeeById(id: number): Promise<Employee>;
	
	newEmployee(employee: Employee): Promise<Employee>;

	findEmployee(cpf: string): Promise<Employee>;

	updateEmployee(id: number, employee: Employee): Promise<void>;
	
	deleteEmployee(id: number): Promise<void>;
}
