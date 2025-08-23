import jwt from 'jsonwebtoken';

export const generateToken = (userId, res) => {
    const token=jwt.sign({userId}, process.env.JWT_SECRET, {
        expiresIn: '7d', // Token expires in 7 days
    });

    res.cookie('jwt', token, {
        httpOnly: true, // Prevents client-side JavaScript from accessing the cookie
        secure: process.env.NODE_ENV === 'production', // Use secure cookies in production
        maxAge: 7 * 24 * 60 * 60 * 1000, // Cookie expires in 7 days
        sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax', 
    });
    return token;
};
