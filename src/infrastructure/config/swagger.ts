import swaggerAutogen from "swagger-autogen";

const doc = {
	info: {
		version: "v1.0.0",
		title: "Swagger Tech Challenge",
		description: "Tech Challenge API",
	},
	servers: [
		{
			url: "http://localhost:3000",
		},
	],
	definitions: {
		Customer: {
			cpf: "555.555.555-55",
			name: "Name of customer",
			phoneNumber: "(99) 99999-9999",
			email: "email@example.com",
		},
		Employee: {
			cpf: "555.555.555-55",
			name: "Name of employee",
			username: "employee@employee",
			password: "E$%0of323!@#",
		},
		getEmployee: {
			cpf: "555.555.555-55",
			name: "Name of employee",
			username: "employee@employee",
		}
	},
};

const outputFile = "./swagger-output.json";
const endpointsFiles = ["./src/infrastructure/config/routes.ts"];

swaggerAutogen({ openapi: "3.0.0" })(outputFile, endpointsFiles, doc);
