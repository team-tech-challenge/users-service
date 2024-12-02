// @ts-ignore
import EmployeeAdapter from '../../adapters/EmployeeAdapter';

describe('EmployeeAdapter', () => {
	it('deve adaptar dados brutos para uma entidade Employee', () => {
		const rawData = { cpf: '12345678901', name: 'John Doe', username: 'johndoe', password: 'password123' };
		const employee = EmployeeAdapter.toEntity(rawData);
		expect(employee).toHaveProperty('cpf', '12345678901');
		expect(employee).toHaveProperty('name', 'John Doe');
	});
});
