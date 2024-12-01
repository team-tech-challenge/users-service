import { isValidEmail } from "../../../src/application/utils/valid";

describe('Email Validator', () => {
	it('should check if email is correctly', () => {
		expect(isValidEmail("davi.corazza@gmail.com")).toBe(true);
	});
});
