// @ts-ignore
import CustomerModel from '@models/CustomerModel';

describe('CustomerModel', () => {
	it('deve criar uma instância de cliente', () => {
		const customer = new CustomerModel({ name: 'John Doe', age: 30 });
		expect(customer.name).toBe('John Doe');
		expect(customer.age).toBe(30);
	});
});
