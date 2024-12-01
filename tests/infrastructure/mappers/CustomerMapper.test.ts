// tests/infrastructure/mappers/CustomerMapper.test.ts
import { Customer } from "@entities/Customer"; // Adjust the path according to your structure
import { CustomerMapper } from "@mappers/CustomerMapper"; // Adjust the path accordingly

describe('CustomerMapper', () => {
    describe('toEntity', () => {
        it('should map CustomerModel to Customer entity correctly', () => {
            const customerModel = {
                cpf: '12345678909', // Use a valid CPF here
                name: 'John Doe',
                phoneNumber: '123-456-7890',
                email: 'john.doe@example.com',
                id: 1,
            };

            const customerEntity = CustomerMapper.toEntity(customerModel);

            expect(customerEntity).toBeInstanceOf(Customer);
            expect(customerEntity.getCpf()).toEqual(customerModel.cpf);
            expect(customerEntity.getName()).toEqual(customerModel.name);
            expect(customerEntity.getPhoneNumber()).toEqual(customerModel.phoneNumber);
            expect(customerEntity.getEmail()).toEqual(customerModel.email);
            expect(customerEntity.getId()).toEqual(customerModel.id);
        });

        it('should throw an error for invalid CPF', () => {
            const customerModel = {
                cpf: 'invalid-cpf', // Invalid CPF
                name: 'John Doe',
                phoneNumber: '123-456-7890',
                email: 'john.doe@example.com',
                id: 1,
            };

            expect(() => CustomerMapper.toEntity(customerModel)).toThrow('Invalid CPF');
        });

        
    });

    describe('toModel', () => {
        it('should map Customer entity to CustomerModel correctly', () => {
            const customerEntity = new Customer('12345678909', 'John Doe', '123-456-7890', 'john.doe@example.com', 1);

            const customerModel = CustomerMapper.toModel(customerEntity);

            expect(customerModel).toEqual({
                cpf: customerEntity.getCpf(),
                name: customerEntity.getName(),
                phoneNumber: customerEntity.getPhoneNumber(),
                email: customerEntity.getEmail(),
                id: customerEntity.getId(),
            });
        });

        it('should return a valid model from a customer entity with null id', () => {
            const customerEntity = new Customer('12345678909', 'John Doe', '123-456-7890', 'john.doe@example.com', null);

            const customerModel = CustomerMapper.toModel(customerEntity);

            expect(customerModel).toEqual({
                cpf: customerEntity.getCpf(),
                name: customerEntity.getName(),
                phoneNumber: customerEntity.getPhoneNumber(),
                email: customerEntity.getEmail(),
                id: null, // Check that id is handled correctly
            });
        });
    });
});
