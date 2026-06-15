const User = require('./User');
const bcrypt = require('bcryptjs');

jest.mock('bcryptjs');

describe('User Model Methods and Middleware', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('matchPassword should return true if passwords match', async () => {
        const user = new User({
            name: 'Test User',
            email: 'test@example.com',
            password: 'hashed_password'
        });

        bcrypt.compare.mockResolvedValue(true);

        const result = await user.matchPassword('entered_password');

        expect(bcrypt.compare).toHaveBeenCalledWith('entered_password', 'hashed_password');
        expect(result).toBe(true);
    });

    test('matchPassword should return false if passwords do not match', async () => {
        const user = new User({
            name: 'Test User',
            email: 'test@example.com',
            password: 'hashed_password'
        });

        bcrypt.compare.mockResolvedValue(false);

        const result = await user.matchPassword('wrong_password');

        expect(bcrypt.compare).toHaveBeenCalledWith('wrong_password', 'hashed_password');
        expect(result).toBe(false);
    });
});
