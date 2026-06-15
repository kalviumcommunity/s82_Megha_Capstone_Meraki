const twilio = require('twilio');

// In-memory store for fallback Mock Mode (keyed by phone number)
const mockOtpStore = new Map();

// Helper to check if Twilio is configured
const isTwilioConfigured = () => {
    return !!(process.env.TWILIO_ACCOUNT_SID && process.env.TWILIO_AUTH_TOKEN && process.env.TWILIO_SERVICE_SID);
};

// @desc    Send OTP to a phone number
// @route   POST /api/otp/send
// @access  Public
const sendOTP = async (req, res) => {
    const { phoneNumber } = req.body;

    if (!phoneNumber) {
        return res.status(400).json({ error: 'Phone number is required' });
    }

    try {
        if (isTwilioConfigured()) {
            console.log(`[Twilio OTP] Sending verification code to ${phoneNumber}...`);
            const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);
            
            const verification = await client.verify.v2
                .services(process.env.TWILIO_SERVICE_SID)
                .verifications.create({ to: phoneNumber, channel: 'sms' });

            return res.status(200).json({
                success: true,
                message: 'OTP sent successfully via Twilio',
                status: verification.status
            });
        } else {
            // Mock Mode Fallback
            const mockOtp = Math.floor(100000 + Math.random() * 900000).toString(); // Generate 6 digit code
            const expiresAt = Date.now() + 5 * 60 * 1000; // 5 minutes expiry

            mockOtpStore.set(phoneNumber, { code: mockOtp, expiresAt });

            console.log('\n=============================================');
            console.log(`[MOCK OTP PROVIDER] SMS sent to: ${phoneNumber}`);
            console.log(`Verification Code: ${mockOtp}`);
            console.log(`Expires in: 5 minutes`);
            console.log('=============================================\n');

            return res.status(200).json({
                success: true,
                message: 'OTP sent successfully (Development Mock Mode)',
                phoneNumber,
                // In mock mode, we optionally return it or just log it to terminal.
                // Let's log it to terminal so the student can copy-paste it during the video.
                mockMode: true
            });
        }
    } catch (error) {
        console.error('Error sending OTP:', error);
        return res.status(500).json({ error: 'Failed to send OTP', details: error.message });
    }
};

// @desc    Verify OTP code
// @route   POST /api/otp/verify
// @access  Public
const verifyOTP = async (req, res) => {
    const { phoneNumber, code } = req.body;

    if (!phoneNumber || !code) {
        return res.status(400).json({ error: 'Phone number and OTP code are required' });
    }

    try {
        if (isTwilioConfigured()) {
            console.log(`[Twilio OTP] Checking verification code for ${phoneNumber}...`);
            const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

            const verificationCheck = await client.verify.v2
                .services(process.env.TWILIO_SERVICE_SID)
                .verificationChecks.create({ to: phoneNumber, code: code });

            if (verificationCheck.status === 'approved') {
                return res.status(200).json({
                    success: true,
                    message: 'OTP verification successful via Twilio',
                    status: verificationCheck.status
                });
            } else {
                return res.status(400).json({
                    success: false,
                    error: 'Invalid OTP code',
                    status: verificationCheck.status
                });
            }
        } else {
            // Mock Mode Fallback
            const record = mockOtpStore.get(phoneNumber);

            if (!record) {
                return res.status(400).json({ success: false, error: 'No OTP requested for this phone number' });
            }

            if (Date.now() > record.expiresAt) {
                mockOtpStore.delete(phoneNumber);
                return res.status(400).json({ success: false, error: 'OTP has expired' });
            }

            if (record.code === code) {
                mockOtpStore.delete(phoneNumber); // Use-once verification code
                console.log(`[MOCK OTP PROVIDER] Phone number ${phoneNumber} successfully verified!`);
                return res.status(200).json({
                    success: true,
                    message: 'OTP verification successful (Development Mock Mode)'
                });
            } else {
                return res.status(400).json({ success: false, error: 'Invalid verification code' });
            }
        }
    } catch (error) {
        console.error('Error verifying OTP:', error);
        return res.status(500).json({ error: 'Failed to verify OTP', details: error.message });
    }
};

module.exports = {
    sendOTP,
    verifyOTP
};
