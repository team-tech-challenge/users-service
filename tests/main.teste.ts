// server.test.ts
import expressApp from '@config/express'; // Adjust the import based on your file structure
import startServer from '@config/express';
import http from 'http';
import newman from '@config/newman';
import connection from '@config/connectionFactory';
import { server } from 'typescript';

jest.mock('@config/newman'); // Mock the newman function
jest.mock('@config/connectionFactory', () => ({
    database: {
        sync: jest.fn().mockResolvedValue(Promise.resolve()), // Mock the sync method to resolve
    },
}));

describe('Server Initialization', () => {
    let httpServer: http.Server;

    beforeAll(() => {
        process.env.PORT = '3000'; // Set the environment variables for testing
        process.env.HOST = 'localhost';
        httpServer = http.createServer(expressApp);
        httpServer.close(); // Close the server after tests
    });
    process.env.PORT = '3000'; // Set the environment variables for testing
    process.env.HOST = 'localhost';

    afterAll(() => {
        httpServer.close(); // Close the server after tests
    });

    it('should start the server and call newman', async () => {
        const consoleLogSpy = jest.spyOn(console, 'log').mockImplementation(() => {}); // Spy on console.log

        await startServer(); // Start the server

        expect(connection.database.sync).toHaveBeenCalled(); // Ensure sync is called
        expect(consoleLogSpy).toHaveBeenCalledWith('Server running on 3000'); // Check if the server log is correct
        expect(newman).toHaveBeenCalled(); // Ensure newman is called

        consoleLogSpy.mockRestore(); // Restore the console log
    });
});
