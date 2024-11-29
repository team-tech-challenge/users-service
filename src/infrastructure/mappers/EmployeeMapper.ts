import { Employee } from "@entities/Employee";

export class EmployeeMapper {
	// Mapeia de EmployeeModel (banco) para Employee (domínio)
	static toEntity(EmployeeModel: any): Employee {
		return new Employee(
			EmployeeModel.cpf,
			EmployeeModel.name,
			EmployeeModel.username,
			EmployeeModel.password,
			EmployeeModel.id
		);
	}
	// Mapeia de Employee (domínio) para EmployeeModel (banco)
	static toModel(Employee: Employee): any {
		return {
			cpf: Employee.getCpf(),
			name: Employee.getName(),
			username: Employee.getUsername(),
			password: Employee.getPassword(),
			id: Employee.getId(),
		};
	}
}
