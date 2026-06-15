const { protect } = require('./auth');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

jest.mock('jsonwebtoken');
jest.mock('../models/User');

describe('Auth Middleware Tests', () => {
    let req, res, next;

    beforeEach(() => {
        req = {
            headers: {}
        };
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn().mockReturnThis()
        };
        next = jest.fn();
        jest.clearAllMocks();
    });

    test('should return 401 if no authorization header is present', async () => {
        await protect(req, res, next);
        expect(res.status).toHaveBeenCalledWith(401);
        expect(res.json).toHaveBeenCalledWith({ message: 'Not authorized, no token' });
        expect(next).not.toHaveBeenCalled();
    });

    test('should return 401 if authorization header is not Bearer', async () => {
        req.headers.authorization = 'Basic token123';
        await protect(req, res, next);
        expect(res.status).toHaveBeenCalledWith(401);
        expect(res.json).toHaveBeenCalledWith({ message: 'Not authorized, no token' });
    });

    test('should return 401 if token is invalid or verification fails', async () => {
        req.headers.authorization = 'Bearer invalidtoken';
        jwt.verify.mockImplementation(() => {
            throw new Error('invalid token');
        });

        await protect(req, res, next);

        expect(res.status).toHaveBeenCalledWith(401);
        expect(res.json).toHaveBeenCalledWith({ message: 'Not authorized, token failed' });
    });

    test('should set req.user and call next if token is valid', async () => {
        req.headers.authorization = 'Bearer validtoken';
        const decodedToken = { id: 'user123' };
        jwt.verify.mockReturnValue(decodedToken);
        
        const mockUser = { _id: 'user123', name: 'John Doe' };
        User.findById.mockReturnValue({
            select: jest.fn().mockResolvedValue(mockUser)
        });

        await protect(req, res, next);

        expect(jwt.verify).toHaveBeenCalledWith('validtoken', process.env.JWT_SECRET);
        expect(User.findById).toHaveBeenCalledWith('user123');
        expect(req.user).toEqual(mockUser);
        expect(next).toHaveBeenCalled();
    });
});
