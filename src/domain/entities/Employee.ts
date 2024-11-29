export class Employee {
	private id?: number;
	private cpf: string;
	private name: string;
	private username: string;
	private password: string;

	constructor(cpf: string, name: string, username: string, password: string, id?: number) {
		this.id = id;
		this.cpf = cpf;
		this.name = name;
		this.username = username;
		this.password = password;
	}

	public getId(): number | undefined {
		return this.id;
	}

	public getCpf(): string {
		return this.cpf;
	}

	public getName(): string {
		return this.name;
	}

	public getUsername(): string {
		return this.username;
	}

	public getPassword(): string {
		return this.password;
	}

}
