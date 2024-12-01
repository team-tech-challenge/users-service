import { CustomerUseCase } from "@usecases/CustomerUseCase";
import { ICustomerGateway } from "@gateways/ICustomerGateway";
import { Customer } from "@entities/Customer";
import { InvalidCPFError, CustomerNotFoundError } from "@utils/errors/customerErrors";
import { isValidCpf } from "@utils/valid";

jest.mock("@utils/valid");

jest.mock("@entities/Customer", () => {
	return {
		Customer: jest.fn().mockImplementation((id, name, cpf, email) => {
			return {
				getId: jest.fn(() => id),
				getName: jest.fn(() => name),
				getCpf: jest.fn(() => cpf),
				getEmail: jest.fn(() => email),
				setCpf: jest.fn(),
			};
		}),
	};
});

describe("CustomerUseCase", () => {
	let customerGateway: jest.Mocked<ICustomerGateway>;
	let customerUseCase: CustomerUseCase;
	let mockCustomer: Customer;

	beforeEach(() => {
		customerGateway = {
			allCustomers: jest.fn(),
			newCustomer: jest.fn(),
			getCustomerById: jest.fn(),
			searchCustomer: jest.fn(),
			updateCustomer: jest.fn(),
			deleteCustomer: jest.fn(),
			campaignOfCustomers: jest.fn(),
		};
		customerUseCase = new CustomerUseCase(customerGateway);
		(isValidCpf as jest.Mock).mockReturnValue(true); // Garante que CPF sempre seja considerado válido.
		mockCustomer = new Customer("78542341082", "John Doe", "12345678901", "john@example.com"); // Usando o mock.
	});

	describe("getAll", () => {
		it("should return all customers", async () => {
			customerGateway.allCustomers.mockResolvedValue([mockCustomer]);
			const customers = await customerUseCase.getAll();
			expect(customers).toEqual([mockCustomer]);
			expect(customerGateway.allCustomers).toHaveBeenCalled();
		});
	});

	describe("createCustomer", () => {
		it("should create a customer with valid CPF", async () => {
			(isValidCpf as jest.Mock).mockReturnValue(true);
			customerGateway.newCustomer.mockResolvedValue(mockCustomer);
			const customer = await customerUseCase.createCustomer(mockCustomer);
			expect(customer).toEqual(mockCustomer);
			expect(customerGateway.newCustomer).toHaveBeenCalledWith(mockCustomer);
		});

		it("should throw an error if CPF is invalid", async () => {
			(isValidCpf as jest.Mock).mockReturnValue(false);
			await expect(customerUseCase.createCustomer(mockCustomer)).rejects.toThrow(InvalidCPFError);
			expect(customerGateway.newCustomer).not.toHaveBeenCalled();
		});
	});

	describe("getCustomerById", () => {
		it("should return a customer by ID", async () => {
			customerGateway.getCustomerById.mockResolvedValue(mockCustomer);
			const customer = await customerUseCase.getCustomerById(1);
			expect(customer).toEqual(mockCustomer);
			expect(customerGateway.getCustomerById).toHaveBeenCalledWith(1);
		});

		it("should return null if customer is not found", async () => {
			customerGateway.getCustomerById.mockResolvedValue(null);
			const customer = await customerUseCase.getCustomerById(1);
			expect(customer).toBeNull();
		});
	});

	describe("searchCustomer", () => {
		it("should return a customer by CPF", async () => {
			(isValidCpf as jest.Mock).mockReturnValue(true);
			customerGateway.searchCustomer.mockResolvedValue(mockCustomer);
			const customer = await customerUseCase.searchCustomer("12345678901");
			expect(customer).toEqual(mockCustomer);
			expect(customerGateway.searchCustomer).toHaveBeenCalledWith("12345678901");
		});

		it("should throw an error if CPF is invalid", async () => {
			(isValidCpf as jest.Mock).mockReturnValue(false);
			await expect(customerUseCase.searchCustomer("invalid_cpf")).rejects.toThrow(InvalidCPFError);
		});
	});

	describe("updateCustomer", () => {
		it("should update a customer with valid data", async () => {
			customerGateway.getCustomerById.mockResolvedValue(mockCustomer);
			(isValidCpf as jest.Mock).mockReturnValue(true);
			await customerUseCase.updateCustomer(1, mockCustomer);
			expect(customerGateway.updateCustomer).toHaveBeenCalledWith(1, mockCustomer);
		});

		it("should throw an error if customer is not found", async () => {
			customerGateway.getCustomerById.mockResolvedValue(null);
			await expect(customerUseCase.updateCustomer(1, mockCustomer)).rejects.toThrow(CustomerNotFoundError);
		});

		it("should throw an error if CPF is invalid", async () => {
			customerGateway.getCustomerById.mockResolvedValue(mockCustomer);
			(isValidCpf as jest.Mock).mockReturnValue(false);
			await expect(customerUseCase.updateCustomer(1, mockCustomer)).rejects.toThrow(InvalidCPFError);
		});
	});

	describe("deleteCustomer", () => {
		it("should delete a customer", async () => {
			customerGateway.getCustomerById.mockResolvedValue(mockCustomer);
			await customerUseCase.deleteCustomer(1);
			expect(customerGateway.deleteCustomer).toHaveBeenCalledWith(1);
		});

		it("should throw an error if customer is not found", async () => {
			customerGateway.getCustomerById.mockResolvedValue(null);
			await expect(customerUseCase.deleteCustomer(1)).rejects.toThrow(CustomerNotFoundError);
		});
	});

	describe("getCustomerCampaigns", () => {
		it("should return campaigns for a customer", async () => {
			customerGateway.campaignOfCustomers.mockResolvedValue(["Campaign1", "Campaign2"]);
			const campaigns = await customerUseCase.getCustomerCampaigns(1);
			expect(campaigns).toEqual(["Campaign1", "Campaign2"]);
			expect(customerGateway.campaignOfCustomers).toHaveBeenCalledWith(1);
		});
	});
});
