const User = require('../models/User.js');

module.exports = async (req, res) => {
    try {
        const user = await User.create(req.body);
        res.redirect('/');
    } catch (error) {
        console.error(error);
        res.render('register', { errorMessage: 'Registration failed. Please try again.' });
    }
};
