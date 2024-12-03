import { CustomerController } from '@controllers/CustomerController';
import { CustomerUseCase } from '@usecases/CustomerUseCase';
import { Customer } from '@entities/Customer';
import { handleError } from '@utils/http';

jest.mock('@usecases/CustomerUseCase');
jest.mock('@utils/http', () => ({
	handleError: jest.fn(),
  }));
  

const mockedCustomerUseCase = new CustomerUseCase(null) as jest.Mocked<CustomerUseCase>;

const mockRequest = (body = {}, params = {}) => ({
  body,
  params,
});

const mockResponse = () => {
  const res = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn().mockReturnThis(),
  };
  return res;
};

function generateValidCpf(): string {
  return '12345678909'; // Um CPF válido de exemplo
}

describe('CustomerController', () => {
  let controller: CustomerController;

  beforeEach(() => {
    controller = new CustomerController(mockedCustomerUseCase);
    jest.clearAllMocks();
  });

  it('should get all customers', async () => {
    const customers = [new Customer(generateValidCpf(), 'John Doe', '123456789', 'john@example.com')];
    mockedCustomerUseCase.getAll.mockResolvedValue(customers);

    const req = mockRequest();
    const res = mockResponse();

    await controller.getAll(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(customers);
  });

  it('should handle error in getAll', async () => {
    const error = new Error('Test Error');
    mockedCustomerUseCase.getAll.mockRejectedValue(error);

    const req = mockRequest();
    const res = mockResponse();

    await controller.getAll(req, res);

    expect(handleError).toHaveBeenCalledWith(res, error);
  });

  it('should create a new customer', async () => {
    const customerData = { cpf: generateValidCpf(), name: 'John Doe', phoneNumber: '123456789', email: 'john@example.com' };
    const customer = new Customer(generateValidCpf(), 'John Doe', '123456789', 'john@example.com');
    mockedCustomerUseCase.createCustomer.mockResolvedValue(customer);

    const req = mockRequest(customerData);
    const res = mockResponse();

    await controller.createCustomer(req, res);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(customer);
  });

  it('should handle error in createCustomer', async () => {
    const error = new Error('Test Error');
    mockedCustomerUseCase.createCustomer.mockRejectedValue(error);

    const req = mockRequest();
    const res = mockResponse();

    await controller.createCustomer(req, res);

    expect(handleError).toHaveBeenCalledWith(res, error);
  });

  it('should get a customer by ID', async () => {
    const customer = new Customer(generateValidCpf(), 'John Doe', '123456789', 'john@example.com');
    mockedCustomerUseCase.getCustomerById.mockResolvedValue(customer);

    const req = mockRequest({}, { id: '1' });
    const res = mockResponse();

    await controller.getCustomerById(req, res);

    expect(res.json).toHaveBeenCalledWith(customer);
  });

  it('should handle customer not found in getCustomerById', async () => {
    mockedCustomerUseCase.getCustomerById.mockResolvedValue(null);

    const req = mockRequest({}, { id: '1' });
    const res = mockResponse();

    await controller.getCustomerById(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ error: 'Customer not found' });
  });

  it('should handle error in getCustomerById', async () => {
    const error = new Error('Test Error');
    mockedCustomerUseCase.getCustomerById.mockRejectedValue(error);

    const req = mockRequest({}, { id: '1' });
    const res = mockResponse();

    await controller.getCustomerById(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ error: error.message });
  });

  it('should search a customer by CPF', async () => {
    const customer = new Customer(generateValidCpf(), 'John Doe', '123456789', 'john@example.com');
    mockedCustomerUseCase.searchCustomer.mockResolvedValue(customer);

    const req = mockRequest({}, { cpf: generateValidCpf() });
    const res = mockResponse();

    await controller.searchCustomer(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(customer);
  });

  it('should handle error in searchCustomer', async () => {
    const error = new Error('Test Error');
    mockedCustomerUseCase.searchCustomer.mockRejectedValue(error);

    const req = mockRequest({}, { cpf: generateValidCpf() });
    const res = mockResponse();

    await controller.searchCustomer(req, res);

    expect(handleError).toHaveBeenCalledWith(res, error);
  });

  it('should update a customer', async () => {
    const customerData = { cpf: generateValidCpf(), name: 'John Doe', phoneNumber: '123456789', email: 'john@example.com' };
    const req = mockRequest(customerData, { id: '1' });
    const res = mockResponse();

    await controller.updateCustomer(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ message: 'Customer updated successfully' });
  });

  it('should handle error in updateCustomer', async () => {
    const error = new Error('Test Error');
    mockedCustomerUseCase.updateCustomer.mockRejectedValue(error);

    const req = mockRequest({}, { id: '1' });
    const res = mockResponse();

    await controller.updateCustomer(req, res);

    expect(handleError).toHaveBeenCalledWith(res, error);
  });

  it('should delete a customer', async () => {
    const req = mockRequest({}, { id: '1' });
    const res = mockResponse();

    await controller.deleteCustomer(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ message: 'Customer deleted successfully' });
  });

  it('should handle error in deleteCustomer', async () => {
    const error = new Error('Test Error');
    mockedCustomerUseCase.deleteCustomer.mockRejectedValue(error);

    const req = mockRequest({}, { id: '1' });
    const res = mockResponse();

    await controller.deleteCustomer(req, res);

    expect(handleError).toHaveBeenCalledWith(res, error);
  });

  it('should get campaigns for a customer by ID', async () => {
    const campaigns = [{ id: 1, name: 'Campaign 1' }];
    mockedCustomerUseCase.getCustomerCampaigns.mockResolvedValue(campaigns);

    const req = mockRequest({}, { id: '1' });
    const res = mockResponse();

    await controller.getCustomerCampaigns(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(campaigns);
  });

  it('should handle error in getCustomerCampaigns', async () => {
    const error = new Error('Test Error');
    mockedCustomerUseCase.getCustomerCampaigns.mockRejectedValue(error);

    const req = mockRequest({}, { id: '1' });
    const res = mockResponse();

    await controller.getCustomerCampaigns(req, res);

    expect(handleError).toHaveBeenCalledWith(res, error);
  });
});