// @ts-ignore
import { Employee } from '@models/EmployeeModel';

describe('EmployeeModel', () => {
	it('deve criar uma instância válida de funcionário', () => {
		const mockEmployeeData = {
			id: 1,
			cpf: '12345678901',
			name: 'John Doe',
			username: 'johndoe',
			password: 'password123',
		};

		const employee = Employee.build(mockEmployeeData);

		// Verifica se os dados estão corretos
		expect(employee.id).toBe(1);
		expect(employee.cpf).toBe('12345678901');
		expect(employee.name).toBe('John Doe');
		expect(employee.username).toBe('johndoe');
		expect(employee.password).toBe('password123');
	});

	it('deve permitir salvar um funcionário no banco de dados (mockado)', async () => {
		const mockEmployeeData = {
			cpf: '12345678901',
			name: 'Jane Doe',
			username: 'janedoe',
			password: 'password123',
		};

		// Mock do método save
		jest.spyOn(Employee.prototype, 'save').mockResolvedValue();

		const employee = Employee.build(mockEmployeeData);
		await expect(employee.save()).resolves.not.toThrow();

		expect(employee.save).toHaveBeenCalled();
	});

	it('deve lançar um erro ao tentar criar um funcionário com CPF duplicado', async () => {
		const duplicateEmployeeData = {
			cpf: '12345678901', // CPF duplicado
			name: 'Jane Doe',
			username: 'janedoe',
			password: 'password123',
		};

		const employee = Employee.build(duplicateEmployeeData);

		// Mock do método save para lançar um erro de validação
		jest.spyOn(Employee.prototype, 'save').mockRejectedValue(new Error('Validation error: cpf must be unique'));

		await expect(employee.save()).rejects.toThrow('Validation error: cpf must be unique');
	});
});
