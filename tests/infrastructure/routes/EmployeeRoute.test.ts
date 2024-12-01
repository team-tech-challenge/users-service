import request from 'supertest';
import express from 'express';
import { employeeRoute } from '@routes/EmployeeRoute'; // Adjust the path accordingly
import { EmployeeController } from '@controllers/EmployeeController';

// Create an Express app
const app = express();
app.use(express.json()); // For parsing application/json
app.use('/employees', employeeRoute);

// Mock the EmployeeController methods
jest.mock('@controllers/EmployeeController');

const mockedController = EmployeeController as jest.MockedClass<typeof EmployeeController>;

describe('Employee Routes', () => {
	beforeEach(() => {
		// Clear all instances and calls to constructor and all methods
		mockedController.mockClear();
	});

	it('GET /employees/all - should return all employees', async () => {
		const mockResponse = [{ id: 1, name: 'John Doe' }];
		mockedController.prototype.getAll.mockImplementation(async (req, res) => {
			res.status(200).json(mockResponse);
		});

		const response = await request(app).get('/employees/all');
		expect(response.status).toBe(200);
		expect(response.body).toEqual(mockResponse);
	});

	it('POST /employees/create - should create a new employee', async () => {
		const newEmployee = { name: 'Jane Doe', cpf: '12345678901' };
		mockedController.prototype.createEmployee.mockImplementation(async (req, res) => {
			res.status(201).json({ id: 2, ...newEmployee });
		});

		const response = await request(app)
			.post('/employees/create')
			.send(newEmployee)
			.set('Accept', 'application/json');
		expect(response.status).toBe(201);
		expect(response.body).toEqual({ id: 2, ...newEmployee });
	});

	it('GET /employees/search/:cpf - should search for an employee by CPF', async () => {
		const mockEmployee = { id: 1, name: 'John Doe', cpf: '12345678901' };
		mockedController.prototype.findEmployee.mockImplementation(async (req, res) => {
			res.status(200).json(mockEmployee);
		});

		const response = await request(app).get('/employees/search/12345678901');
		expect(response.status).toBe(200);
		expect(response.body).toEqual(mockEmployee);
	});

	it('PUT /employees/update/:id - should update an employee by ID', async () => {
		const updatedEmployee = { name: 'John Smith', cpf: '12345678901' };
		mockedController.prototype.updateEmployee.mockImplementation(async (req, res) => {
			res.status(200).json({ id: req.params.id, ...updatedEmployee });
		});

		const response = await request(app)
			.put('/employees/update/1')
			.send(updatedEmployee)
			.set('Accept', 'application/json');
		expect(response.status).toBe(200);
		expect(response.body).toEqual({ id: '1', ...updatedEmployee });
	});

	it('DELETE /employees/delete/:id - should delete an employee by ID', async () => {
		mockedController.prototype.deleteEmployee.mockImplementation(async (req, res) => {
			res.status(204).send();
		});

		const response = await request(app).delete('/employees/delete/1');
		expect(response.status).toBe(204);
	});
});
