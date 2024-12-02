// @ts-ignore
import EmployeeModel from '../../models/EmployeeModel';

describe('EmployeeModel', () => {
	it('deve criar uma instância de funcionário', () => {
		const employee = new EmployeeModel({ name: 'John Doe', age: 30 });
		expect(employee.name).toBe('John Doe');
		expect(employee.age).toBe(30);
	});
});
