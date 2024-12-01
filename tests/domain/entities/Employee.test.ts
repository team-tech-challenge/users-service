import { Employee } from '@entities/Employee'; // Caminho para o seu arquivo

describe('Employee', () => {
	describe('getId', () => {
		it('deve retornar o id se existir', () => {
			const employee = new Employee('78542341082', 'John Doe', 'user', 'password123', 1);

			expect(employee.getId()).toBe(1);
		});

		it('deve retornar undefined se o id não existir', () => {
			const employee = new Employee('78542341082', 'John Doe', 'user', 'password123');

			expect(employee.getId()).toBeUndefined();
		});
	});

	describe('getCpf', () => {
		it('deve retornar o CPF corretamente', () => {
			const employee = new Employee('78542341082', 'John Doe', 'user', 'password123');

			expect(employee.getCpf()).toBe('78542341082');
		});
	});

	describe('getName', () => {
		it('deve retornar o nome corretamente', () => {
			const employee = new Employee('78542341082', 'John Doe', 'user', 'password123');

			expect(employee.getName()).toBe('John Doe');
		});
	});

	describe('getUsername', () => {
		it('deve retornar o username corretamente', () => {
			const employee = new Employee('78542341082', 'John Doe', 'user', 'password123');

			expect(employee.getUsername()).toBe('user');
		});
	});

	describe('getPassword', () => {
		it('deve retornar a senha corretamente', () => {
			const employee = new Employee('78542341082', 'John Doe', 'user', 'password123');

			expect(employee.getPassword()).toBe('password123');
		});
	});
});
