import { Employee } from "@entities/Employee"; // Adjust the path according to your structure
import { EmployeeMapper } from "@mappers/EmployeeMapper"; // Adjust the path accordingly

describe('EmployeeMapper', () => {
    describe('toEntity', () => {
        it('should map EmployeeModel to Employee entity correctly', () => {
            const employeeModel = {
                cpf: '12345678901',
                name: 'Jane Doe',
                username: 'jane.doe',
                password: 'securepassword',
                id: 1,
            };

            const employeeEntity = EmployeeMapper.toEntity(employeeModel);

            expect(employeeEntity).toBeInstanceOf(Employee);
            expect(employeeEntity.getCpf()).toEqual(employeeModel.cpf);
            expect(employeeEntity.getName()).toEqual(employeeModel.name);
            expect(employeeEntity.getUsername()).toEqual(employeeModel.username);
            expect(employeeEntity.getPassword()).toEqual(employeeModel.password);
            expect(employeeEntity.getId()).toEqual(employeeModel.id);
        });
    });

    describe('toModel', () => {
        it('should map Employee entity to EmployeeModel correctly', () => {
            const employeeEntity = new Employee('12345678901', 'Jane Doe', 'jane.doe', 'securepassword', 1);

            const employeeModel = EmployeeMapper.toModel(employeeEntity);

            expect(employeeModel).toEqual({
                cpf: employeeEntity.getCpf(),
                name: employeeEntity.getName(),
                username: employeeEntity.getUsername(),
                password: employeeEntity.getPassword(),
                id: employeeEntity.getId(),
            });
        });
    });
});
