import { isValidCpf, isValidEmail } from "@utils/valid";

export class Customer {
	private id?: number;
	private cpf: string;
	private name: string;
	private phoneNumber: string;
	private email: string;

	constructor(cpf: string, name: string, phoneNumber: string, email: string, id?: number) {
		this.setCpf(cpf);
		this.name = name;
		this.phoneNumber = phoneNumber;
		this.setEmail(email);
		this.id = id;
	}

	public getId(): number | undefined {
		return this.id;
	}

	public getCpf(): string {
		return this.cpf.replace(/\D/g, "");
	}

	public setCpf(cpf: string): void {
		if (!isValidCpf(cpf)) {
			throw new Error("Invalid CPF");
		}
		this.cpf = cpf;
	}

	public getName(): string {
		return this.name;
	}

	public setName(name: string): void {
		this.name = name;
	}

	public getPhoneNumber(): string {
		return this.phoneNumber;
	}

	public setPhoneNumber(phoneNumber: string): void {
		this.phoneNumber = phoneNumber;
	}

	public getEmail(): string {
		return this.email;
	}

	public setEmail(email: string): void {
		if (!isValidEmail(email)) {
			throw new Error("Invalid email format");
		}
		this.email = email;
	}

	// Método para retornar o primeiro e o último nome
	public getFirstAndLastName(): { firstName: string; lastName: string } {
		const nameParts = this.name.trim().split(/\s+/); // Divide o nome por espaços em branco
		const firstName = nameParts[0]; // Primeiro nome
		const lastName = nameParts.length > 1 ? nameParts[nameParts.length - 1] : ""; // Último nome ou vazio

		return {
			firstName,
			lastName,
		}
	}
}
