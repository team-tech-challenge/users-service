import { EmployeeController } from '@controllers/EmployeeController';
import { EmployeeUseCase } from "@usecases/EmployeeUseCase";
import { defaultReturnStatement } from "@utils/http";
import { Employee } from "@entities/Employee";

jest.mock('@usecases/EmployeeUseCase');
jest.mock('@utils/http');

const mockedEmployeeUseCase = new EmployeeUseCase(null) as jest.Mocked<EmployeeUseCase>;

const mockRequest = (body = {}, params = {}) => ({
  body,
  params,
});

const mockResponse = () => {
  const res = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  };
  return res;
};

function generateValidCpf(): string {
  return '12345678909'; // Um CPF válido de exemplo
}

describe('EmployeeController', () => {
  let controller: EmployeeController;

  beforeEach(() => {
    controller = new EmployeeController(mockedEmployeeUseCase);
    jest.clearAllMocks();
  });

  describe('getAll', () => {
    it('deve retornar todos os funcionários com sucesso', async () => {
      const mockEmployees = [
        new Employee(generateValidCpf(), 'John Doe', 'johndoe', 'password123'),
      ];
      mockedEmployeeUseCase.getAll.mockResolvedValue(mockEmployees);

      const req = mockRequest();
      const res = mockResponse();

      await controller.getAll(req, res);

      expect(defaultReturnStatement).toHaveBeenCalledWith(res, 'Employees', mockEmployees);
    });

    it('deve retornar erro ao buscar todos os funcionários', async () => {
      const error = new Error('Database error');
      mockedEmployeeUseCase.getAll.mockRejectedValue(error);

      const req = mockRequest();
      const res = mockResponse();

      await controller.getAll(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ error: error.message });
    });
  });

  describe('createEmployee', () => {
    it('deve criar um novo funcionário com sucesso', async () => {
      const newEmployee = new Employee(generateValidCpf(), 'John Doe', 'johndoe', 'password123');
      mockedEmployeeUseCase.createEmployee.mockResolvedValue(newEmployee);

      const req = mockRequest({ cpf: generateValidCpf(), name: 'John Doe', username: 'johndoe', password: 'password123' });
      const res = mockResponse();

      await controller.createEmployee(req, res);

      expect(defaultReturnStatement).toHaveBeenCalledWith(res, 'Employee Created', newEmployee);
    });

    it('deve retornar erro ao criar um novo funcionário', async () => {
      const error = new Error('Invalid data');
      mockedEmployeeUseCase.createEmployee.mockRejectedValue(error);

      const req = mockRequest({ cpf: generateValidCpf(), name: 'John Doe', username: 'johndoe', password: 'password123' });
      const res = mockResponse();

      await controller.createEmployee(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ error: error.message });
    });
  });

  describe('findEmployee', () => {
    it('deve retornar um funcionário pelo CPF', async () => {
      const employeeData = new Employee(generateValidCpf(), 'John Doe', 'johndoe', 'password123');
      mockedEmployeeUseCase.findEmployee.mockResolvedValue(employeeData);

      const req = mockRequest({}, { cpf: generateValidCpf() });
      const res = mockResponse();

      await controller.findEmployee(req, res);

      expect(defaultReturnStatement).toHaveBeenCalledWith(res, 'Employee Found', employeeData);
    });

    it('deve retornar erro ao buscar funcionário por CPF', async () => {
      const error = new Error('Employee not found');
      mockedEmployeeUseCase.findEmployee.mockRejectedValue(error);

      const req = mockRequest({}, { cpf: generateValidCpf() });
      const res = mockResponse();

      await controller.findEmployee(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ error: error.message });
    });
  });

  describe('updateEmployee', () => {
    it('deve atualizar um funcionário com sucesso', async () => {
      const updatedEmployee = new Employee(generateValidCpf(), 'John Doe', 'johndoe', 'password123', 1);


      const req = mockRequest({ name: 'John Doe', username: 'johndoe', password: 'password123' }, { id: '1' });
      const res = mockResponse();

      await controller.updateEmployee(req, res);

      expect(defaultReturnStatement).toHaveBeenCalledWith(res, 'Employee Updated', updatedEmployee);
    });

    it('deve retornar erro ao atualizar um funcionário', async () => {
      const error = new Error('Update failed');
      mockedEmployeeUseCase.updateEmployee.mockRejectedValue(error);

      const req = mockRequest({}, { id: '1' });
      const res = mockResponse();

      await controller.updateEmployee(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ error: error.message });
    });
  });

  describe('deleteEmployee', () => {
    it('deve deletar o funcionário com sucesso', async () => {
      mockedEmployeeUseCase.deleteEmployee.mockResolvedValue();

      const req = mockRequest({}, { id: '1' });
      const res = mockResponse();

      await controller.deleteEmployee(req, res);

      expect(defaultReturnStatement).toHaveBeenCalledWith(res, 'Employee Deleted', 'Operation executed successfully.');
    });

    it('deve retornar erro ao tentar excluir o funcionário', async () => {
      const error = new Error('Employee not found');
      mockedEmployeeUseCase.deleteEmployee.mockRejectedValue(error);

      const req = mockRequest({}, { id: '999' });
      const res = mockResponse();

      await controller.deleteEmployee(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ error: error.message });
    });
  });
});