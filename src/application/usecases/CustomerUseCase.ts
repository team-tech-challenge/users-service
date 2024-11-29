import { ICustomerGateway } from "@gateways/ICustomerGateway";
import { Customer } from "@entities/Customer";
import { InvalidCPFError, CustomerNotFoundError } from "@utils/errors/customerErrors"; // Atualizado para importar do novo caminho
import { isValidCpf } from "@utils/valid";


export class CustomerUseCase {
	constructor(private readonly customerGateway: ICustomerGateway) { }

	async getAll(): Promise<Customer[]> {
		return this.customerGateway.allCustomers();
	}

	async createCustomer(data: Customer): Promise<Customer> {
		if (data.getCpf() && !isValidCpf(data.getCpf())) {
			throw new InvalidCPFError("Invalid CPF format");
		}
		return this.customerGateway.newCustomer(data);
	}

	async getCustomerById(id: number): Promise<Customer | null> {
		const customer = await this.customerGateway.getCustomerById(id);
		return customer ? customer : null;
	}

	async searchCustomer(cpf: string): Promise<Customer | null> {
		if (!isValidCpf(cpf)) throw new InvalidCPFError("Invalid CPF format");
		return this.customerGateway.searchCustomer(cpf);
	}

	async updateCustomer(id: number, data: Customer): Promise<void> {
		const customer = await this.getCustomerById(id);
		if (!customer) throw new CustomerNotFoundError("Customer not found");


		if (data.getCpf() && !isValidCpf(data.getCpf())) {
			throw new InvalidCPFError("Invalid CPF format");
		}

		await this.customerGateway.updateCustomer(id, data);
	}

	async deleteCustomer(id: number): Promise<void> {
		const customer = await this.getCustomerById(id);
		if (!customer) throw new CustomerNotFoundError("Customer not found");

		await this.customerGateway.deleteCustomer(id);
	}

	async getCustomerCampaigns(id: number): Promise<any[]> {
		return this.customerGateway.campaignOfCustomers(id);
	}

}
