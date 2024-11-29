import { Router } from "express";
import { EmployeeAdapter } from "@adapters/EmployeeAdapter";
import { EmployeeUseCase } from "@usecases/EmployeeUseCase";
import { EmployeeController } from "@controllers/EmployeeController";

export const employeeRoute = Router();

const employeeAdapter = new EmployeeAdapter();
const employeeUseCase = new EmployeeUseCase(employeeAdapter);
const employeeController = new EmployeeController(employeeUseCase);

employeeRoute.get("/all", (req, res) => {
	// #swagger.tags = ['Employee']
	/* #swagger.responses[200] = {
            description: 'Return all employee',
            schema: { $ref: '#/definitions/getEmployee' }
    } */
	employeeController.getAll(req, res);
});

employeeRoute.post("/create", (req, res) => {
	// #swagger.tags = ['Employee']
	// #swagger.description = 'Create a new employee'
	/* #swagger.requestBody = {
            required: true,
            description: 'Create Employee',
            content: {
                "application/json": {
                    schema: { $ref: '#/definitions/Employee' }
                }
            }
        }
    */
	employeeController.createEmployee(req, res);
});

employeeRoute.get("/search/:cpf", (req, res) => {
	// #swagger.tags = ['Employee']
	/* #swagger.responses[200] = {
            description: 'Search employee by CPF',
            schema: { $ref: '#/definitions/getEmployee' }
    } */
	employeeController.findEmployee(req, res);
});

employeeRoute.put("/update/:id", (req, res) => {
	// #swagger.tags = ['Employee']
	// #swagger.description = 'Update employee by ID'
	/* #swagger.requestBody = {
			required: true,
			description: 'Update Employee',
			content: {
				"application/json": {
					schema: { $ref: '#/definitions/Employee' }
				}
			}
		}
	*/
	employeeController.updateEmployee(req, res);
});

employeeRoute.delete("/delete/:id", (req, res) => {
	// #swagger.tags = ['Employee']
	// #swagger.description = 'Delete employee by ID'
	employeeController.deleteEmployee(req, res);
});
