const BlogPost = require('../models/BlogPost.js')
module.exports = (req, res) => {
    BlogPost.findById(req.params.id)
        .then(detailPost => {
            res.render('post', {
                detailPost
            });
        })
        .catch(error => {
            console.error(error);
            res.status(500).send('Internal Server Error');
        });
}