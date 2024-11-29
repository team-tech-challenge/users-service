import connection from "@config/connectionFactory";
import { Customer } from "@database/CustomerModel";
import { Employee } from "@database/EmployeeModel";

export default () => {
	connection.database.addModels([
		Customer,
		Employee
	]);
};
