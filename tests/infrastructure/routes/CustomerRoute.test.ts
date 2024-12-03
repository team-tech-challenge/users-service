import request from 'supertest';
import express from 'express';
import { customerRoute } from '@routes/CustomerRoute';
import { CustomerController } from '@controllers/CustomerController';

// Create an Express app
const app = express();
app.use(express.json()); // For parsing application/json
app.use('/customers', customerRoute);

// Mock the CustomerController methods
jest.mock('@controllers/CustomerController');

const mockedController = CustomerController as jest.MockedClass<typeof CustomerController>;

describe('Customer Routes', () => {
    beforeEach(() => {
        // Clear all instances and calls to constructor and all methods:
        mockedController.mockClear();
    });

    it('GET /customers/all - should return all customers', async () => {
        const mockResponse = [{ id: 1, name: 'John Doe' }];
        mockedController.prototype.getAll.mockImplementation(async (req, res) => {
            res.status(200).json(mockResponse);
        });

        const response = await request(app).get('/customers/all');
        expect(response.status).toBe(200);
        expect(response.body).toEqual(mockResponse);
    });

    it('POST /customers/create - should create a new customer', async () => {
        const newCustomer = { name: 'Jane Doe' };
        mockedController.prototype.createCustomer.mockImplementation(async (req, res) => {
            res.status(201).json({ id: 2, ...newCustomer });
        });

        const response = await request(app)
            .post('/customers/create')
            .send(newCustomer)
            .set('Accept', 'application/json');
        expect(response.status).toBe(201);
        expect(response.body).toEqual({ id: 2, ...newCustomer });
    });

    it('GET /customers/search/:cpf - should search for a customer by CPF', async () => {
        const mockCustomer = { id: 1, name: 'John Doe', cpf: '12345678901' };
        mockedController.prototype.searchCustomer.mockImplementation(async (req, res) => {
            res.status(200).json(mockCustomer);
        });

        const response = await request(app).get('/customers/search/12345678901');
        expect(response.status).toBe(200);
        expect(response.body).toEqual(mockCustomer);
    });

    it('PUT /customers/update/:id - should update a customer by ID', async () => {
        const updatedCustomer = { name: 'John Smith' };
        mockedController.prototype.updateCustomer.mockImplementation(async (req, res) => {
            res.status(200).json({ id: req.params.id, ...updatedCustomer });
        });

        const response = await request(app)
            .put('/customers/update/1')
            .send(updatedCustomer)
            .set('Accept', 'application/json');
        expect(response.status).toBe(200);
        expect(response.body).toEqual({ id: '1', ...updatedCustomer });
    });

    it('DELETE /customers/delete/:id - should delete a customer by ID', async () => {
        mockedController.prototype.deleteCustomer.mockImplementation(async (req, res) => {
            res.status(204).send();
        });

        const response = await request(app).delete('/customers/delete/1');
        expect(response.status).toBe(204);
    });

    it('GET /customers/:id/campaigns - should get customer campaigns', async () => {
        const mockCampaigns = [{ id: 1, name: 'Campaign A' }];
        mockedController.prototype.getCustomerCampaigns.mockImplementation(async (req, res) => {
            res.status(200).json(mockCampaigns);
        });

        const response = await request(app).get('/customers/1/campaigns');
        expect(response.status).toBe(200);
        expect(response.body).toEqual(mockCampaigns);
    });

    it('GET /customers/:id - should get customer by ID', async () => {
        const mockCustomer = { id: 1, name: 'John Doe' };
        mockedController.prototype.getCustomerById.mockImplementation(async (req, res) => {
            res.status(200).json(mockCustomer);
        });

        const response = await request(app).get('/customers/1');
        expect(response.status).toBe(200);
        expect(response.body).toEqual(mockCustomer);
    });
});