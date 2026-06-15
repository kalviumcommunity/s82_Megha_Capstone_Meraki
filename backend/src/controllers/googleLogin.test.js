const { googleLogin } = require('./userController');
const User = require('../models/User');

jest.mock('../models/User');
jest.mock('jsonwebtoken');

const mockResponse = () => {
    const res = {};
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);
    return res;
};

describe('Google Authentication Controller Tests', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('should return 400 if idToken or email is missing', async () => {
        const req = { body: { email: 'test@example.com' } }; // missing token
        const res = mockResponse();

        await googleLogin(req, res);

        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({ message: 'Google token and email are required' });
    });

    test('should authenticate and log in existing user', async () => {
        const req = {
            body: {
                idToken: 'mock_google_token',
                email: 'existing@example.com',
                name: 'Existing User'
            }
        };
        const res = mockResponse();

        const mockUser = {
            _id: 'user123',
            name: 'Existing User',
            email: 'existing@example.com',
            role: 'volunteer'
        };

        User.findOne.mockResolvedValue(mockUser);

        await googleLogin(req, res);

        expect(User.findOne).toHaveBeenCalledWith({ email: 'existing@example.com' });
        expect(res.json).toHaveBeenCalledWith(
            expect.objectContaining({
                _id: 'user123',
                email: 'existing@example.com',
                message: 'Successfully authenticated via Google'
            })
        );
    });
});
