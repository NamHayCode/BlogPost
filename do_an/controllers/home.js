const BlogPost = require('../models/BlogPost.js');

module.exports = (req, res) => {
    console.log(req.session); // Ghi lại thông tin session

    BlogPost.find({})
        .then(posts => {
            console.log(posts);
            res.render('index', {
                blogposts: posts
            });
        })
        .catch(error => {
            // Xử lý lỗi
            console.error(error);
            res.status(500).send('Internal Server Error');
        });
};
