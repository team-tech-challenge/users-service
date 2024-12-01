import { CustomerUseCase } from "@usecases/CustomerUseCase";
import { Customer } from "@entities/Customer";
import { handleError } from "@utils/http";

export class CustomerController {
	constructor(private readonly customerUseCase: CustomerUseCase) { }

	async getAll(req, res): Promise<void> {
		try {
			const customers = await this.customerUseCase.getAll();
			res.status(200).json(customers);
		} catch (error) {
			handleError(res, error);
		}
	}

	async createCustomer(req, res): Promise<void> {
		try {
			const { cpf, name, phoneNumber, email } = req.body
			const customerData = new Customer(cpf, name, phoneNumber, email);
			const customer = await this.customerUseCase.createCustomer(customerData);
			res.status(201).json(customer);
		} catch (error) {
			handleError(res, error);
		}
	}

	async getCustomerById(req, res): Promise<void> {
		try {
			const { id } = req.params;
			const customer = await this.customerUseCase.getCustomerById(id);
			if (customer) {
				res.json(customer);
			} else {
				res.status(404).json({ error: "Customer not found" });
			}
		} catch (error) {
			res.status(400).json({ error: error.message });
		}
	}

	async searchCustomer(req, res): Promise<void> {
		try {
			const { cpf } = req.params;

			const customer = await this.customerUseCase.searchCustomer(cpf);
			res.status(200).json(customer);

		} catch (error) {
			handleError(res, error);
		}
	}

	async updateCustomer(req, res): Promise<void> {
		try {
			const { id } = req.params;
			const { cpf, name, phoneNumber, email } = req.body
			const customerData = new Customer(cpf, name, phoneNumber, email);
			await this.customerUseCase.updateCustomer(Number(id), customerData);
			res.status(200).json({ message: "Customer updated successfully" });
		} catch (error) {
			handleError(res, error);
		}
	}

	async deleteCustomer(req, res): Promise<void> {
		try {
			const { id } = req.params;
			await this.customerUseCase.deleteCustomer(Number(id));
			res.status(200).json({ message: "Customer deleted successfully" });
		} catch (error) {
			handleError(res, error);
		}
	}

	async getCustomerCampaigns(req, res): Promise<void> {
		try {
			const { id } = req.params;
			const campaigns = await this.customerUseCase.getCustomerCampaigns(id);
			res.status(200).json(campaigns);
		} catch (error) {
			handleError(res, error);
		}
	}
}
