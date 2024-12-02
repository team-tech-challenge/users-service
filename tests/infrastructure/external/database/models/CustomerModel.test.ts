import { Sequelize } from 'sequelize-typescript';
import { Customer } from '@database/CustomerModel';

describe('CustomerModel', () => {
	let sequelize: Sequelize;

	beforeAll(async () => {
		// Inicializa uma instância do Sequelize com SQLite em memória
		sequelize = new Sequelize({
			dialect: 'sqlite',
			storage: ':memory:',
			logging: false, // Desativa logs no console durante os testes
		});

		sequelize.addModels([Customer]);
		await sequelize.sync(); // Sincroniza os modelos com o banco em memória
	});

	afterAll(async () => {
		// Fecha a conexão do Sequelize após os testes
		await sequelize.close();
	});

	it('deve criar uma instância válida de cliente', () => {
		const mockCustomerData = {
			id: 1,
			cpf: '12345678901',
			name: 'Jane Doe',
			phoneNumber: '987654321',
			email: 'janedoe@example.com',
		};

		const customer = Customer.build(mockCustomerData);

		expect(customer.id).toBe(1);
		expect(customer.cpf).toBe('12345678901');
		expect(customer.name).toBe('Jane Doe');
		expect(customer.phoneNumber).toBe('987654321');
		expect(customer.email).toBe('janedoe@example.com');
	});

	it('deve permitir salvar um cliente no banco de dados (mockado)', async () => {
		const mockCustomerData = {
			cpf: '12345678901',
			name: 'Jane Doe',
			phoneNumber: '987654321',
			email: 'janedoe@example.com',
		};

		// Mock do método save
		jest.spyOn(Customer.prototype, 'save').mockResolvedValue(mockCustomerData as Customer);

		const customer = Customer.build(mockCustomerData);
		await expect(customer.save()).resolves.toEqual(mockCustomerData);

		expect(customer.save).toHaveBeenCalled();
	});
});
