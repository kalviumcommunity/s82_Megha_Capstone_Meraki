const { sendOTP, verifyOTP } = require('./otpController');

// Mock Express req, res, next
const mockResponse = () => {
    const res = {};
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);
    return res;
};

describe('OTP Controller Tests', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('should return 400 if phoneNumber is missing during send', async () => {
        const req = { body: {} };
        const res = mockResponse();

        await sendOTP(req, res);

        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({ error: 'Phone number is required' });
    });

    test('should send OTP and return success in mock mode', async () => {
        const req = { body: { phoneNumber: '+1234567890' } };
        const res = mockResponse();

        await sendOTP(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(
            expect.objectContaining({
                success: true,
                message: expect.stringContaining('OTP sent successfully'),
                phoneNumber: '+1234567890'
            })
        );
    });

    test('should return 400 if verify is called with missing phone number or code', async () => {
        const req = { body: { phoneNumber: '+1234567890' } }; // missing code
        const res = mockResponse();

        await verifyOTP(req, res);

        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({ error: 'Phone number and OTP code are required' });
    });

    test('should return 400 for verify when no OTP was requested', async () => {
        const req = { body: { phoneNumber: '+9999999999', code: '123456' } };
        const res = mockResponse();

        await verifyOTP(req, res);

        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({ success: false, error: 'No OTP requested for this phone number' });
    });
});
