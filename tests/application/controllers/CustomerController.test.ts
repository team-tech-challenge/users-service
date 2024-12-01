import { CustomerController } from '@controllers/CustomerController';
import { CustomerUseCase } from '@usecases/CustomerUseCase';
import { Customer } from '@entities/Customer';
import { handleError } from '@utils/http';

jest.mock('@usecases/CustomerUseCase');
jest.mock('@utils/http');

describe('CustomerController', () => {
	let customerController: CustomerController;
	let customerUseCaseMock: jest.Mocked<CustomerUseCase>;

	beforeEach(() => {
		customerUseCaseMock = new CustomerUseCase(null) as jest.Mocked<CustomerUseCase>;
		customerController = new CustomerController(customerUseCaseMock);
	});

	describe('getAll', () => {
		it('deve retornar todos os clientes com sucesso', async () => {
			const mockCustomers = [
				new Customer('78542341082', 'John Doe', '123456789', 'john.doe@email.com'),
			];
			customerUseCaseMock.getAll.mockResolvedValue(mockCustomers);

			const req = {};
			const res = {
				status: jest.fn().mockReturnThis(),
				json: jest.fn(),
			};

			await customerController.getAll(req, res);

			expect(res.status).toHaveBeenCalledWith(200);
			expect(res.json).toHaveBeenCalledWith(mockCustomers);
		});

		it('deve retornar erro ao buscar todos os clientes', async () => {
			const error = new Error('Database error');
			customerUseCaseMock.getAll.mockRejectedValue(error);

			const req = {};
			const res = {
				status: jest.fn().mockReturnThis(),
				json: jest.fn(),
			};

			await customerController.getAll(req, res);

			expect(handleError).toHaveBeenCalledWith(res, error);
		});
	});

	describe('createCustomer', () => {
		it('deve criar um novo cliente com sucesso', async () => {
			const newCustomer = new Customer('78542341082', 'John Doe', '123456789', 'john.doe@email.com');
			customerUseCaseMock.createCustomer.mockResolvedValue(newCustomer);

			const req = {
				body: { cpf: '78542341082', name: 'John Doe', phoneNumber: '123456789', email: 'john.doe@email.com' },
			};
			const res = {
				status: jest.fn().mockReturnThis(),
				json: jest.fn(),
			};

			await customerController.createCustomer(req, res);

			expect(res.status).toHaveBeenCalledWith(201);
			expect(res.json).toHaveBeenCalledWith(newCustomer);
		});

		it('deve retornar erro ao criar um novo cliente', async () => {
			const error = new Error('Invalid data');
			customerUseCaseMock.createCustomer.mockRejectedValue(error);

			const req = {
				body: { cpf: '78542341082', name: 'John Doe', phoneNumber: '123456789', email: 'john.doe@email.com' },
			};
			const res = {
				status: jest.fn().mockReturnThis(),
				json: jest.fn(),
			};

			await customerController.createCustomer(req, res);

			expect(handleError).toHaveBeenCalledWith(res, error);
		});
	});

	describe('searchCustomer', () => {
		it('deve retornar um cliente pelo CPF', async () => {
			const customerData = new Customer('78542341082', 'John Doe', '123456789', 'john.doe@email.com');
			customerUseCaseMock.searchCustomer.mockResolvedValue(customerData);

			const req = { params: { cpf: '78542341082' } };
			const res = {
				status: jest.fn().mockReturnThis(),
				json: jest.fn(),
			};

			await customerController.searchCustomer(req, res);

			expect(res.status).toHaveBeenCalledWith(200);
			expect(res.json).toHaveBeenCalledWith(customerData);
		});

		it('deve retornar erro ao buscar cliente por CPF', async () => {
			const error = new Error('Customer not found');
			customerUseCaseMock.searchCustomer.mockRejectedValue(error);

			const req = { params: { cpf: '78542341082' } };
			const res = {
				status: jest.fn().mockReturnThis(),
				json: jest.fn(),
			};

			await customerController.searchCustomer(req, res);

			expect(handleError).toHaveBeenCalledWith(res, error);
		});
	});

	describe('updateCustomer', () => {
		it('deve atualizar o cliente com sucesso', async () => {
			const customerData = new Customer('78542341082', 'John D.', '987654321', 'john.d@email.com');
			customerUseCaseMock.updateCustomer.mockResolvedValue();

			const req = {
				params: { id: '1' },
				body: { cpf: '78542341082', name: 'John D.', phoneNumber: '987654321', email: 'john.d@email.com' },
			};
			const res = {
				status: jest.fn().mockReturnThis(),
				json: jest.fn(),
			};

			await customerController.updateCustomer(req, res);

			expect(res.status).toHaveBeenCalledWith(200);
			expect(res.json).toHaveBeenCalledWith({ message: 'Customer updated successfully' });
		});

		it('deve retornar erro ao tentar atualizar cliente', async () => {
			const error = new Error('Customer not found');
			customerUseCaseMock.updateCustomer.mockRejectedValue(error);

			const req = {
				params: { id: '999' },
				body: { cpf: '78542341082', name: 'John D.', phoneNumber: '987654321', email: 'john.d@email.com' },
			};
			const res = {
				status: jest.fn().mockReturnThis(),
				json: jest.fn(),
			};

			await customerController.updateCustomer(req, res);

			expect(handleError).toHaveBeenCalledWith(res, error);
		});
	});

	describe('deleteCustomer', () => {
		it('deve deletar o cliente com sucesso', async () => {
			customerUseCaseMock.deleteCustomer.mockResolvedValue();

			const req = { params: { id: '1' } };
			const res = {
				status: jest.fn().mockReturnThis(),
				json: jest.fn(),
			};

			await customerController.deleteCustomer(req, res);

			expect(res.status).toHaveBeenCalledWith(200);
			expect(res.json).toHaveBeenCalledWith({ message: 'Customer deleted successfully' });
		});

		it('deve retornar erro ao tentar excluir o cliente', async () => {
			const error = new Error('Customer not found');
			customerUseCaseMock.deleteCustomer.mockRejectedValue(error);

			const req = { params: { id: '999' } };
			const res = {
				status: jest.fn().mockReturnThis(),
				json: jest.fn(),
			};

			await customerController.deleteCustomer(req, res);

			expect(handleError).toHaveBeenCalledWith(res, error);
		});
	});

	describe('getCustomerCampaigns', () => {
		it('deve retornar as campanhas do cliente com sucesso', async () => {
			const mockCampaigns = [{ id: 1, name: 'Campaign 1' }];
			customerUseCaseMock.getCustomerCampaigns.mockResolvedValue(mockCampaigns);

			const req = { params: { id: '1' } };
			const res = {
				status: jest.fn().mockReturnThis(),
				json: jest.fn(),
			};

			await customerController.getCustomerCampaigns(req, res);

			expect(res.status).toHaveBeenCalledWith(200);
			expect(res.json).toHaveBeenCalledWith(mockCampaigns);
		});

		it('deve retornar erro ao buscar campanhas do cliente', async () => {
			const error = new Error('Campaigns not found');
			customerUseCaseMock.getCustomerCampaigns.mockRejectedValue(error);

			const req = { params: { id: '999' } };
			const res = {
				status: jest.fn().mockReturnThis(),
				json: jest.fn(),
			};

			await customerController.getCustomerCampaigns(req, res);

			expect(handleError).toHaveBeenCalledWith(res, error);
		});
	});
});
