import { EmployeeController } from '@controllers/EmployeeController';
import { EmployeeUseCase } from '@usecases/EmployeeUseCase';
import { Employee } from '@entities/Employee';
import { defaultReturnStatement } from '@utils/http';

jest.mock('@usecases/EmployeeUseCase');
jest.mock('@utils/http');

describe('EmployeeController', () => {
	let employeeController: EmployeeController;
	let employeeUseCaseMock: jest.Mocked<EmployeeUseCase>;

	beforeEach(() => {
		// Criando a instância mockada de EmployeeUseCase
		employeeUseCaseMock = new EmployeeUseCase(null) as jest.Mocked<EmployeeUseCase>;
		// Instanciando o controlador com a dependência mockada
		employeeController = new EmployeeController(employeeUseCaseMock);
	});

	describe('getAll', () => {
		it('deve retornar todos os funcionários com sucesso', async () => {
			const mockEmployees = [
				new Employee('78542341082', 'John Doe', 'johndoe', 'password123'),
			];
			// Mock da função getAll retornando os funcionários
			employeeUseCaseMock.getAll.mockResolvedValue(mockEmployees);

			const req = {};  // Request mockado
			const res = {  // Response mockado
				status: jest.fn().mockReturnThis(),
				json: jest.fn(),
			};

			// Chamando o método do controller
			await employeeController.getAll(req, res);

			// Verificando se a resposta foi enviada corretamente
			expect(defaultReturnStatement).toHaveBeenCalledWith(res, "Employees", mockEmployees);
		});

		it('deve retornar erro ao buscar todos os funcionários', async () => {
			const error = new Error('Database error');
			employeeUseCaseMock.getAll.mockRejectedValue(error);

			const req = {};
			const res = {
				status: jest.fn().mockReturnThis(),
				json: jest.fn(),
			};

			await employeeController.getAll(req, res);

			expect(res.status).toHaveBeenCalledWith(400);
			expect(res.json).toHaveBeenCalledWith({ error: error.message });
		});
	});

	describe('createEmployee', () => {
		it('deve criar um novo funcionário com sucesso', async () => {
			const newEmployee = new Employee('78542341082', 'John Doe', 'johndoe', 'password123');
			employeeUseCaseMock.createEmployee.mockResolvedValue(newEmployee);

			const req = {
				body: { cpf: '78542341082', name: 'John Doe', username: 'johndoe', password: 'password123' },
			};
			const res = {
				status: jest.fn().mockReturnThis(),
				json: jest.fn(),
			};

			await employeeController.createEmployee(req, res);

			expect(defaultReturnStatement).toHaveBeenCalledWith(res, "Employee Created", newEmployee);
		});

		it('deve retornar erro ao criar um novo funcionário', async () => {
			const error = new Error('Invalid data');
			employeeUseCaseMock.createEmployee.mockRejectedValue(error);

			const req = {
				body: { cpf: '78542341082', name: 'John Doe', username: 'johndoe', password: 'password123' },
			};
			const res = {
				status: jest.fn().mockReturnThis(),
				json: jest.fn(),
			};

			await employeeController.createEmployee(req, res);

			expect(res.status).toHaveBeenCalledWith(400);
			expect(res.json).toHaveBeenCalledWith({ error: error.message });
		});
	});

	describe('findEmployee', () => {
		it('deve retornar um funcionário pelo CPF', async () => {
			const employeeData = new Employee('78542341082', 'John Doe', 'johndoe', 'password123');
			employeeUseCaseMock.findEmployee.mockResolvedValue(employeeData);

			const req = { params: { cpf: '78542341082' } };
			const res = {
				status: jest.fn().mockReturnThis(),
				json: jest.fn(),
			};

			await employeeController.findEmployee(req, res);

			expect(defaultReturnStatement).toHaveBeenCalledWith(res, "Employee Found", employeeData);
		});

		it('deve retornar erro ao buscar funcionário por CPF', async () => {
			const error = new Error('Employee not found');
			employeeUseCaseMock.findEmployee.mockRejectedValue(error);

			const req = { params: { cpf: '78542341082' } };
			const res = {
				status: jest.fn().mockReturnThis(),
				json: jest.fn(),
			};

			await employeeController.findEmployee(req, res);

			expect(res.status).toHaveBeenCalledWith(400);
			expect(res.json).toHaveBeenCalledWith({ error: error.message });
		});
	});

	describe('deleteEmployee', () => {
		it('deve deletar o funcionário com sucesso', async () => {
			employeeUseCaseMock.deleteEmployee.mockResolvedValue();

			const req = { params: { id: '1' } };
			const res = {
				status: jest.fn().mockReturnThis(),
				json: jest.fn(),
			};

			await employeeController.deleteEmployee(req, res);

			expect(defaultReturnStatement).toHaveBeenCalledWith(res, "Employee Deleted", "Operation executed successfully.");
		});

		it('deve retornar erro ao tentar excluir o funcionário', async () => {
			const error = new Error('Employee not found');
			employeeUseCaseMock.deleteEmployee.mockRejectedValue(error);

			const req = { params: { id: '999' } };
			const res = {
				status: jest.fn().mockReturnThis(),
				json: jest.fn(),
			};

			await employeeController.deleteEmployee(req, res);

			expect(res.status).toHaveBeenCalledWith(400);
			expect(res.json).toHaveBeenCalledWith({ error: error.message });
		});
	});
});
