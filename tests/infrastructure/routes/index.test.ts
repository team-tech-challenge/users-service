import request from 'supertest';
import express from 'express';
import { apiRoutes } from '@routes/index'; // Adjust the path accordingly
import { CustomerController } from '@controllers/CustomerController';
import { EmployeeController } from '@controllers/EmployeeController';

// Create an Express app
const app = express();
app.use(express.json()); // For parsing application/json
app.use('/api', apiRoutes); // Using the apiRoutes under /api

// Mock the CustomerController and EmployeeController methods
jest.mock('@controllers/CustomerController');
jest.mock('@controllers/EmployeeController');

const mockedCustomerController = CustomerController as jest.MockedClass<typeof CustomerController>;
const mockedEmployeeController = EmployeeController as jest.MockedClass<typeof EmployeeController>;

describe('API Routes', () => {
	beforeEach(() => {
		// Clear all instances and calls to constructor and all methods
		mockedCustomerController.mockClear();
		mockedEmployeeController.mockClear();
	});

	describe('Customer Routes', () => {
		it('GET /api/customer/all - should return all customers', async () => {
			const mockResponse = [{ id: 1, name: 'John Doe' }];
			mockedCustomerController.prototype.getAll.mockImplementation(async (req, res) => {
				res.status(200).json(mockResponse);
			});

			const response = await request(app).get('/api/customer/all');
			expect(response.status).toBe(200);
			expect(response.body).toEqual(mockResponse);
		});

		it('POST /api/customer/create - should create a new customer', async () => {
			const newCustomer = { name: 'Jane Doe' };
			mockedCustomerController.prototype.createCustomer.mockImplementation(async (req, res) => {
				res.status(201).json({ id: 2, ...newCustomer });
			});

			const response = await request(app)
				.post('/api/customer/create')
				.send(newCustomer)
				.set('Accept', 'application/json');
			expect(response.status).toBe(201);
			expect(response.body).toEqual({ id: 2, ...newCustomer });
		});
	});

	describe('Employee Routes', () => {
		it('GET /api/employee/all - should return all employees', async () => {
			const mockResponse = [{ id: 1, name: 'John Doe' }];
			mockedEmployeeController.prototype.getAll.mockImplementation(async (req, res) => {
				res.status(200).json(mockResponse);
			});

			const response = await request(app).get('/api/employee/all');
			expect(response.status).toBe(200);
			expect(response.body).toEqual(mockResponse);
		});

		it('POST /api/employee/create - should create a new employee', async () => {
			const newEmployee = { name: 'Jane Doe', cpf: '12345678901' };
			mockedEmployeeController.prototype.createEmployee.mockImplementation(async (req, res) => {
				res.status(201).json({ id: 2, ...newEmployee });
			});

			const response = await request(app)
				.post('/api/employee/create')
				.send(newEmployee)
				.set('Accept', 'application/json');
			expect(response.status).toBe(201);
			expect(response.body).toEqual({ id: 2, ...newEmployee });
		});
	});
});
