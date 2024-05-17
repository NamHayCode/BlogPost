module.exports = (app) => {
    return (req, res, next) => {
        loggedIn = req.session.userId;
        next();
    };
};
