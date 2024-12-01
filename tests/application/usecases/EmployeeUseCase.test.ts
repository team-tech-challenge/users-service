import { EmployeeUseCase } from "@usecases/EmployeeUseCase";
import { IEmployeeGateway } from "@gateways/IEmployeeGateway";
import { Employee } from "@entities/Employee";
import { InvalidCPFError } from "@utils/errors/customerErrors";
import { EmployeeNotFoundError } from "@utils/errors/employeeErrors";
import { isValidCpf } from "@utils/valid";

jest.mock("@utils/valid");

jest.mock("@entities/Employee", () => {
	return {
		Employee: jest.fn().mockImplementation((id, name, cpf, position) => {
			return {
				getId: jest.fn(() => id),
				getName: jest.fn(() => name),
				getCpf: jest.fn(() => cpf),
				getPosition: jest.fn(() => position),
				setCpf: jest.fn(),
			};
		}),
	};
});

describe("EmployeeUseCase", () => {
	let employeeGateway: jest.Mocked<IEmployeeGateway>;
	let employeeUseCase: EmployeeUseCase;
	let mockEmployee: Employee;

	beforeEach(() => {
		employeeGateway = {
			allEmployees: jest.fn(),
			newEmployee: jest.fn(),
			getEmployeeById: jest.fn(),
			findEmployee: jest.fn(),
			updateEmployee: jest.fn(),
			deleteEmployee: jest.fn(),
		};
		employeeUseCase = new EmployeeUseCase(employeeGateway);
		(isValidCpf as jest.Mock).mockReturnValue(true); // Garante que CPF sempre seja considerado válido.
		mockEmployee = new Employee("78542341082", "Jane Doe", "12345678901", "Developer"); // Usando o mock.
	});

	describe("getAll", () => {
		it("should return all employees", async () => {
			employeeGateway.allEmployees.mockResolvedValue([mockEmployee]);
			const employees = await employeeUseCase.getAll();
			expect(employees).toEqual([mockEmployee]);
			expect(employeeGateway.allEmployees).toHaveBeenCalled();
		});
	});

	describe("createEmployee", () => {
		it("should create an employee with valid CPF", async () => {
			employeeGateway.newEmployee.mockResolvedValue(mockEmployee);
			const employee = await employeeUseCase.createEmployee(mockEmployee);
			expect(employee).toEqual(mockEmployee);
			expect(employeeGateway.newEmployee).toHaveBeenCalledWith(mockEmployee);
		});

		it("should throw an error if CPF is invalid", async () => {
			(isValidCpf as jest.Mock).mockReturnValue(false);
			await expect(employeeUseCase.createEmployee(mockEmployee)).rejects.toThrow(InvalidCPFError);
			expect(employeeGateway.newEmployee).not.toHaveBeenCalled();
		});
	});

	describe("getEmployeeById", () => {
		it("should return an employee by ID", async () => {
			employeeGateway.getEmployeeById.mockResolvedValue(mockEmployee);
			const employee = await employeeUseCase.getEmployeeById(1);
			expect(employee).toEqual(mockEmployee);
			expect(employeeGateway.getEmployeeById).toHaveBeenCalledWith(1);
		});

		it("should return null if employee is not found", async () => {
			employeeGateway.getEmployeeById.mockResolvedValue(null);
			const employee = await employeeUseCase.getEmployeeById(1);
			expect(employee).toBeNull();
			expect(employeeGateway.getEmployeeById).toHaveBeenCalledWith(1);
		});
	});

	describe("findEmployee", () => {
		it("should return an employee by CPF", async () => {
			employeeGateway.findEmployee.mockResolvedValue(mockEmployee);
			const employee = await employeeUseCase.findEmployee("12345678901");
			expect(employee).toEqual(mockEmployee);
			expect(employeeGateway.findEmployee).toHaveBeenCalledWith("12345678901");
		});

		it("should throw an error if CPF is invalid", async () => {
			(isValidCpf as jest.Mock).mockReturnValue(false);
			await expect(employeeUseCase.findEmployee("12345678901")).rejects.toThrow(InvalidCPFError);
			expect(employeeGateway.findEmployee).not.toHaveBeenCalled();
		});
	});

	describe("updateEmployee", () => {
		it("should update an employee with valid data", async () => {
			employeeGateway.getEmployeeById.mockResolvedValue(mockEmployee);
			await employeeUseCase.updateEmployee(1, mockEmployee);
			expect(employeeGateway.updateEmployee).toHaveBeenCalledWith(1, mockEmployee);
		});

		it("should throw an error if employee is not found", async () => {
			employeeGateway.getEmployeeById.mockResolvedValue(null);
			await expect(employeeUseCase.updateEmployee(1, mockEmployee)).rejects.toThrow(EmployeeNotFoundError);
			expect(employeeGateway.updateEmployee).not.toHaveBeenCalled();
		});
	});

	describe("deleteEmployee", () => {
		it("should delete an employee", async () => {
			await employeeUseCase.deleteEmployee(1);
			expect(employeeGateway.deleteEmployee).toHaveBeenCalledWith(1);
		});
	});
});
