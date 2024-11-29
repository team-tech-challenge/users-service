import { Router } from "express";
import { CustomerAdapter } from "@adapters/CustomerAdapter";
import { CustomerUseCase } from "@usecases/CustomerUseCase";
import { CustomerController } from "@controllers/CustomerController";

export const customerRoute = Router();

const customerAdapter = new CustomerAdapter();
const customerUseCase = new CustomerUseCase(customerAdapter);
const customerController = new CustomerController(customerUseCase);

customerRoute.get("/all", (req, res) => {
	// #swagger.tags = ['Customer']
	/* #swagger.responses[200] = {
            description: 'Return all customer',
            schema: { $ref: '#/definitions/Customer' }
    } */
	customerController.getAll(req, res);
});

customerRoute.post("/create", (req, res) => {
	// #swagger.tags = ['Customer']
	// #swagger.description = 'Create a new customer'
	/* #swagger.requestBody = {
            required: true,
            content: {
                "application/json": {
                    schema: { $ref: '#/definitions/Customer' }
                }
            }
        }
    */
	customerController.createCustomer(req, res);
});

customerRoute.get("/search/:cpf", (req, res) => {
	// #swagger.tags = ['Customer']
	/* #swagger.responses[200] = {
            description: 'Search customer by CPF',
            schema: { $ref: '#/definitions/Customer' }
    } */
	customerController.searchCustomer(req, res);
});

customerRoute.put("/update/:id", (req, res) => {
	// #swagger.tags = ['Customer']
	// #swagger.description = 'Update customer by ID'
	/* #swagger.requestBody = {
			required: true,
			content: {
				"application/json": {
					schema: { $ref: '#/definitions/Customer' }
				}
			}
		}
	*/
	customerController.updateCustomer(req, res);
});

customerRoute.delete("/delete/:id", (req, res) => {
	// #swagger.tags = ['Customer']
	// #swagger.description = 'Delete customer by ID'
	customerController.deleteCustomer(req, res);
});

customerRoute.get("/:id/campaigns", (req, res) => {
	// #swagger.tags = ['Customer']
	customerController.getCustomerCampaigns(req, res);
});
