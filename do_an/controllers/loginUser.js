const bcrypt = require('bcrypt');
const User = require('../models/User');

module.exports = async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await User.findOne({ username });
        if (user) {
            const same = await bcrypt.compare(password, user.password);
            if (same) {
                // Store user session, will talk about it later
                req.session.userId = user._id
                res.redirect('/');
            } else {
                res.render('login', { errorMessage: 'Invalid username or password.' });
            }
        } else {
            res.render('login', { errorMessage: 'Invalid username or password.' });
        }
    } catch (error) {
        console.error(error);
        res.render('login', { errorMessage: 'An error occurred. Please try again.' });
    }
};
