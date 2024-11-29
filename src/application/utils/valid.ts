const isValidCpf = (
	cpf: string	
) => {
	cpf = cpf.replace(/[^\d]/g, '');

    // Verifica se o CPF tem 11 dígitos
    if (cpf.length !== 11) return false;

    // Verifica se todos os dígitos são iguais (CPF inválido)
    if (/^(\d)\1{10}$/.test(cpf)) return false;

    // Valida o primeiro dígito verificador
    let sum = 0;
    for (let i = 0; i < 9; i++) {
        sum += parseInt(cpf.charAt(i)) * (10 - i);
    }
    let firstDigit = (sum * 10) % 11;
    if (firstDigit === 10 || firstDigit === 11) firstDigit = 0;
    if (firstDigit !== parseInt(cpf.charAt(9))) return false;

    // Valida o segundo dígito verificador
    sum = 0;
    for (let i = 0; i < 10; i++) {
        sum += parseInt(cpf.charAt(i)) * (11 - i);
    }
    let secondDigit = (sum * 10) % 11;
    if (secondDigit === 10 || secondDigit === 11) secondDigit = 0;
    if (secondDigit !== parseInt(cpf.charAt(10))) return false;

    return true;
};

const isValidEmail = (
	email: string	
) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

const isValidStatus = (status: string) => {
    // Define valid statuses
    const validStatuses = ["Created", "Processed", "Shipped", "Delivered", "Cancelled", "Waiting Payment"];
    return validStatuses.includes(status);
}

export { isValidCpf, isValidEmail, isValidStatus}