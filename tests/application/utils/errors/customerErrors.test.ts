import { CustomerError, InvalidCPFError, CustomerNotFoundError } from '@utils/errors/customerErrors'; // Ajuste o caminho conforme necessário

describe('Testes das classes de erro', () => {

	// Testes para CustomerError
	describe('CustomerError', () => {
		it('deve criar um erro com a mensagem e o nome corretos', () => {
			const errorMessage = 'Ocorreu um erro no cliente';
			const error = new CustomerError(errorMessage);

			expect(error.message).toBe(errorMessage);
			expect(error.name).toBe('CustomerError');
		});
	});

	// Testes para InvalidCPFError
	describe('InvalidCPFError', () => {
		it('deve herdar de CustomerError e ter o nome correto', () => {
			const errorMessage = 'CPF inválido';
			const error = new InvalidCPFError(errorMessage);

			expect(error.message).toBe(errorMessage);
			expect(error.name).toBe('InvalidCPFError');
			expect(error instanceof CustomerError).toBe(true);  // Verifica se herda de CustomerError
		});
	});

	// Testes para CustomerNotFoundError
	describe('CustomerNotFoundError', () => {
		it('deve herdar de CustomerError e ter o nome correto', () => {
			const errorMessage = 'Cliente não encontrado';
			const error = new CustomerNotFoundError(errorMessage);

			expect(error.message).toBe(errorMessage);
			expect(error.name).toBe('CustomerNotFoundError');
			expect(error instanceof CustomerError).toBe(true);  // Verifica se herda de CustomerError
		});
	});

});
