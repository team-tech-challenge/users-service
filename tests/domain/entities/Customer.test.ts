import { Customer } from '@entities/Customer'; // Caminho para o seu arquivo

describe('Customer', () => {
	describe('setCpf', () => {
		it('deve lançar erro se o CPF for inválido', () => {
			// Teste direto do CPF inválido
			const customer = () => new Customer('99999999999', 'John Doe', '123456789', 'john@email.com');

			expect(customer).toThrow('Invalid CPF');
		});

		it('não deve lançar erro se o CPF for válido', () => {
			// Teste de CPF válido
			const customer = new Customer('785.423.410-82', 'John Doe', '123456789', 'john@email.com');

			// Retirando os caracteres especiais, o CPF deve ser '78542341082'
			expect(customer.getCpf()).toBe('78542341082');
		});
	});

	describe('setEmail', () => {
		it('deve lançar erro se o e-mail for inválido', () => {
			const customer = () => new Customer('78542341082', 'John Doe', '123456789', 'invalid-email');

			expect(customer).toThrow('Invalid email format');
		});

		it('não deve lançar erro se o e-mail for válido', () => {
			const customer = new Customer('78542341082', 'John Doe', '123456789', 'john@email.com');

			expect(customer.getEmail()).toBe('john@email.com');
		});
	});

	describe('getFirstAndLastName', () => {
		it('deve retornar o primeiro e o último nome corretamente', () => {
			const customer = new Customer('78542341082', 'John Doe', '123456789', 'john@email.com');

			const { firstName, lastName } = customer.getFirstAndLastName();
			expect(firstName).toBe('John');
			expect(lastName).toBe('Doe');
		});

		it('deve retornar o primeiro nome e um nome vazio se não houver um sobrenome', () => {
			const customer = new Customer('78542341082', 'John', '123456789', 'john@email.com');

			const { firstName, lastName } = customer.getFirstAndLastName();
			expect(firstName).toBe('John');
			expect(lastName).toBe('');
		});
	});

	describe('setName', () => {
		it('deve permitir definir o nome se não for vazio', () => {
			const customer = new Customer('78542341082', 'John Doe', '123456789', 'john@email.com');

			expect(customer.getName()).toBe('John Doe');
		});
	});

	describe('getId', () => {
		it('deve retornar o id se existir', () => {
			const customer = new Customer('78542341082', 'John Doe', '123456789', 'john@email.com', 1);

			expect(customer.getId()).toBe(1);
		});

		it('deve retornar undefined se o id não existir', () => {
			const customer = new Customer('78542341082', 'John Doe', '123456789', 'john@email.com');

			expect(customer.getId()).toBeUndefined();
		});
	});

	describe('setPhoneNumber', () => {
		it('deve permitir definir o número de telefone', () => {
			const customer = new Customer('78542341082', 'John Doe', '123456789', 'john@email.com');
			customer.setPhoneNumber('987654321');

			expect(customer.getPhoneNumber()).toBe('987654321');
		});
	});
});
