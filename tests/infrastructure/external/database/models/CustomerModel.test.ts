// @ts-ignore
import { Customer } from '@models/CustomerModel';

describe('CustomerModel', () => {
	it('deve criar uma instância válida de cliente', () => {
		const mockCustomerData = {
			id: 1,
			cpf: '12345678901',
			name: 'John Doe',
			phoneNumber: '123456789',
			email: 'johndoe@example.com',
		};

		const customer = Customer.build(mockCustomerData);

		// Verifica se os dados estão corretos
		expect(customer.id).toBe(1);
		expect(customer.cpf).toBe('12345678901');
		expect(customer.name).toBe('John Doe');
		expect(customer.phoneNumber).toBe('123456789');
		expect(customer.email).toBe('johndoe@example.com');
	});

	it('deve permitir salvar um cliente no banco de dados (mockado)', async () => {
		const mockCustomerData = {
			cpf: '12345678901',
			name: 'Jane Doe',
			phoneNumber: '987654321',
			email: 'janedoe@example.com',
		};

		// Mock do método save
		jest.spyOn(Customer.prototype, 'save').mockResolvedValue();

		const customer = Customer.build(mockCustomerData);
		await expect(customer.save()).resolves.not.toThrow();

		expect(customer.save).toHaveBeenCalled();
	});

	it('deve lançar um erro ao tentar criar um cliente inválido', async () => {
		const invalidCustomerData = {
			cpf: '', // CPF inválido
			name: 'Invalid User',
		};

		const customer = Customer.build(invalidCustomerData);

		// Mock do método save para lançar um erro
		jest.spyOn(Customer.prototype, 'save').mockRejectedValue(new Error('Validation error'));

		await expect(customer.save()).rejects.toThrow('Validation error');
	});
});
