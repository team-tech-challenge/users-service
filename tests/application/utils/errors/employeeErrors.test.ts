import { EmployeeError, InvalidCPFError, EmployeeNotFoundError } from '@utils/errors/employeeErrors'; // Ajuste o caminho conforme necessário

describe('Testes das classes de erro', () => {

	// Testes para EmployeeError
	describe('EmployeeError', () => {
		it('deve criar um erro com a mensagem e o nome corretos', () => {
			const errorMessage = 'Ocorreu um erro no empregado';
			const error = new EmployeeError(errorMessage);

			expect(error.message).toBe(errorMessage);
			expect(error.name).toBe('EmployeeError');
		});
	});

	// Testes para InvalidCPFError
	describe('InvalidCPFError', () => {
		it('deve herdar de EmployeeError e ter o nome correto', () => {
			const errorMessage = 'CPF inválido';
			const error = new InvalidCPFError(errorMessage);

			expect(error.message).toBe(errorMessage);
			expect(error.name).toBe('InvalidCPFError');
			expect(error instanceof EmployeeError).toBe(true);  // Verifica se herda de EmployeeError
		});
	});

	// Testes para EmployeeNotFoundError
	describe('EmployeeNotFoundError', () => {
		it('deve herdar de EmployeeError e ter o nome correto', () => {
			const errorMessage = 'Empregado não encontrado';
			const error = new EmployeeNotFoundError(errorMessage);

			expect(error.message).toBe(errorMessage);
			expect(error.name).toBe('EmployeeNotFoundError');
			expect(error instanceof EmployeeError).toBe(true);  // Verifica se herda de EmployeeError
		});
	});

});
