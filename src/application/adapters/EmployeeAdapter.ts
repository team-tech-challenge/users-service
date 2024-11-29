import { IEmployeeGateway } from "@gateways/IEmployeeGateway";
import { Employee as EmployeeModel } from "@database/EmployeeModel";
import { Employee } from "@entities/Employee";
import { EmployeeMapper } from "@mappers/EmployeeMapper";

export class EmployeeAdapter implements IEmployeeGateway {
	async allEmployees(): Promise<Employee[]> {
		const employeeModels = await EmployeeModel.findAll();
        return employeeModels.map(model => EmployeeMapper.toEntity(model));		
	}

	async getEmployeeById(id: number): Promise<Employee> {
        const employeeModels = await EmployeeModel.findOne({ where: { id } });
        return EmployeeMapper.toEntity(employeeModels);
    }

	async findEmployee(cpf: string): Promise<Employee> {
        const employeeModels = await EmployeeModel.findOne({
            where: { cpf }
        });
        if (!employeeModels) throw new Error('Employee not found');
        return EmployeeMapper.toEntity(employeeModels);
    }

	async newEmployee(employee: any): Promise<Employee> {
		const employeeModels = await EmployeeModel.create(employee);
        return EmployeeMapper.toEntity(employeeModels);		
	}
	
	async updateEmployee(id: number, employee: Employee): Promise<void> {

		
        const existingEmployee = await EmployeeModel.findOne({ where: { id } });

        if (!existingEmployee) {
            throw new Error("Employee not found");
        }

        try {
            await EmployeeModel.update(employee, {
                where: { id }
            });
        } catch (error) {
            console.error(error);
			throw new Error("Employee not updated");
        }
    }

	async deleteEmployee(id: number): Promise<void> {
        try {
            EmployeeModel.destroy({ where: { id } });            
        } catch (error) {
            console.error(error);
			throw new Error("Employee not delete");
        }
	}
}
