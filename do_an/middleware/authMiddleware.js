const User = require('../models/User');

module.exports = async (req, res, next) => {
    console.log('Session:', req.session);
    try {
        const user = await User.findById(req.session.userId);
        console.log('User:', user);
        if (!user) {
            console.log('User not found');
            return res.redirect('/');
        }
        next();
    } catch (error) {
        console.error('Error during user authentication:', error);
        res.status(500).send('Internal Server Error');
    }
};
