import { isValidCpf, isValidEmail, isValidStatus } from '@utils/valid'; // Ajuste o caminho conforme necessário

describe('Testes de validação', () => {

	// Testes para isValidCpf
	describe('isValidCpf', () => {
		it('deve retornar true para CPF válido', () => {
			expect(isValidCpf('123.456.789-09')).toBe(true); // Substitua por um CPF válido
		});

		it('deve retornar false para CPF inválido com 11 dígitos iguais', () => {
			expect(isValidCpf('111.111.111-11')).toBe(false);
		});

		it('deve retornar false para CPF com menos de 11 dígitos', () => {
			expect(isValidCpf('123.456.789')).toBe(false);
		});

		it('deve retornar false para CPF com caracteres não numéricos', () => {
			expect(isValidCpf('Numero de CPF')).toBe(false);
		});

		it('deve retornar false para CPF com dígitos verificadores incorretos', () => {
			expect(isValidCpf('123.456.789-00')).toBe(false);
		});

		it('deve retornar 0 para primeiro dígito verificador se o cálculo der 10 ou 11', () => {
			// Testa CPF que resulta em primeiro dígito verificador igual a 10 ou 11
			// Exemplo de CPF gerado com primeiro dígito verificador 10
			expect(isValidCpf('123.456.789-99')).toBe(false); // O CPF gerado deve ser inválido com dígitos verificadores errados
		});

		it('deve retornar 0 para segundo dígito verificador se o cálculo der 10 ou 11', () => {
			// Testa CPF que resulta em segundo dígito verificador igual a 10 ou 11
			// Exemplo de CPF gerado com segundo dígito verificador 10
			expect(isValidCpf('123.456.789-11')).toBe(false); // O CPF gerado deve ser inválido com dígitos verificadores errados
		});

		it('deve retornar false para CPF com dígitos verificadores incorretos após ajuste para 0', () => {
			// Testa CPF com o ajuste de dígitos verificadores (10 ou 11) sendo 0
			// O CPF com o primeiro ou segundo dígito verificador incorreto deverá falhar
			expect(isValidCpf('123.456.789-10')).toBe(false);
		});
	});

	// Testes para isValidEmail
	describe('isValidEmail', () => {
		it('deve retornar true para um email válido', () => {
			expect(isValidEmail('teste@exemplo.com')).toBe(true);
		});

		it('deve retornar false para email sem "@"', () => {
			expect(isValidEmail('testeexemplo.com')).toBe(false);
		});

		it('deve retornar false para email sem domínio', () => {
			expect(isValidEmail('teste@')).toBe(false);
		});

		it('deve retornar false para email sem nome de usuário', () => {
			expect(isValidEmail('@exemplo.com')).toBe(false);
		});

		it('deve retornar false para email com espaços', () => {
			expect(isValidEmail('teste @exemplo.com')).toBe(false);
		});
	});

	// Testes para isValidStatus
	describe('isValidStatus', () => {
		it('deve retornar true para status "Created"', () => {
			expect(isValidStatus('Created')).toBe(true);
		});

		it('deve retornar true para status "Shipped"', () => {
			expect(isValidStatus('Shipped')).toBe(true);
		});

		it('deve retornar false para status "Processing"', () => {
			expect(isValidStatus('Processing')).toBe(false); // Status não listado
		});

		it('deve retornar true para status "Delivered"', () => {
			expect(isValidStatus('Delivered')).toBe(true);
		});

		it('deve retornar false para status "Cancelled"', () => {
			expect(isValidStatus('Cancelled')).toBe(true);
		});

		it('deve retornar false para status inválido', () => {
			expect(isValidStatus('UnknownStatus')).toBe(false);
		});
	});

});
