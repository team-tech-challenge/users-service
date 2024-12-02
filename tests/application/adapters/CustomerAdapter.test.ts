// @ts-ignore
import CustomerAdapter from '../../adapters/CustomerAdapter';

describe('CustomerAdapter', () => {
	it('deve adaptar dados brutos para uma entidade Customer', () => {
		const rawData = { cpf: '12345678901', name: 'John Doe', username: 'johndoe', password: 'password123' };
		const customer = CustomerAdapter.toEntity(rawData);
		expect(customer).toHaveProperty('cpf', '12345678901');
		expect(customer).toHaveProperty('name', 'John Doe');
	});
});
