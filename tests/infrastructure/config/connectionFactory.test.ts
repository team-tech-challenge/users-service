// @ts-ignore
import connectionFactory from '../../config/connectionFactory';
// @ts-ignore
import database from '../../external/database';

jest.mock('../../external/database');

describe('connectionFactory', () => {
	it('deve criar uma conexão com o banco de dados', async () => {
		database.connect.mockResolvedValue(true);
		const connection = await connectionFactory.createConnection();
		expect(connection).toBeTruthy();
	});
});
