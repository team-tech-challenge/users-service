import { Customer } from "@entities/Customer";

export interface ICustomerGateway {
	allCustomers(): Promise<Customer[]>;

	getCustomerById(id: number): Promise<Customer>;
	
	newCustomer(customer: Customer): Promise<Customer>;

	searchCustomer(cpf: string): Promise<Customer>;

	updateCustomer(id: number, customer: Customer): Promise<void>;

	deleteCustomer(id: number): Promise<void>;

	campaignOfCustomers(id: number): Promise<any[]>;
}
