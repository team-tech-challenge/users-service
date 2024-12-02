import { Sequelize } from 'sequelize-typescript';
import { Employee } from '@database/EmployeeModel';

describe('EmployeeModel', () => {
	let sequelize: Sequelize;

	beforeAll(async () => {
		// Inicializa uma instância do Sequelize com SQLite em memória
		sequelize = new Sequelize({
			dialect: 'sqlite',
			storage: ':memory:',
			logging: false, // Desativa logs no console durante os testes
		});

		// Registra o modelo Employee
		sequelize.addModels([Employee]);
		await sequelize.sync(); // Sincroniza os modelos com o banco em memória
	});

	afterAll(async () => {
		// Fecha a conexão do Sequelize após os testes
		if (sequelize) {
			await sequelize.close();
		}
	});

	it('deve criar uma instância válida de funcionário', () => {
		const mockEmployeeData = {
			id: 1,
			cpf: '12345678901',
			name: 'John Doe',
			username: 'johndoe',
			password: 'password123',
		};

		const employee = Employee.build(mockEmployeeData);

		expect(employee.id).toBe(1);
		expect(employee.cpf).toBe('12345678901');
		expect(employee.name).toBe('John Doe');
		expect(employee.username).toBe('johndoe');
		expect(employee.password).toBe('password123');
	});

	it('deve permitir salvar um funcionário no banco de dados', async () => {
		const mockEmployeeData = {
			cpf: '12345678901',
			name: 'Jane Doe',
			username: 'janedoe',
			password: 'password123',
		};

		const employee = Employee.build(mockEmployeeData);
		const savedEmployee = await employee.save();

		expect(savedEmployee.id).toBeDefined();
		expect(savedEmployee.cpf).toBe('12345678901');
		expect(savedEmployee.name).toBe('Jane Doe');
		expect(savedEmployee.username).toBe('janedoe');
	});

	it('deve permitir salvar um funcionário no banco de dados (mockado)', async () => {
		const mockEmployeeData = {
			cpf: '12345678901',
			name: 'Jane Doe',
			username: 'janedoe',
			password: 'password123',
		};

		// Mock do método save
		jest.spyOn(Employee.prototype, 'save').mockResolvedValue(mockEmployeeData as Employee);

		const employee = Employee.build(mockEmployeeData);
		await expect(employee.save()).resolves.toEqual(mockEmployeeData);

		expect(employee.save).toHaveBeenCalled();
	});
});
