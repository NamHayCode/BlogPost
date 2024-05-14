const BlogPost = require('../models/BlogPost.js')
module.exports = (request, response) => {
    BlogPost.find({})
        .then(posts => {
            console.log(posts);
            response.render('index', {
                blogposts: posts
            });
        })
        .catch(error => {
            // Xử lý lỗi
            console.error(error);
            response.status(500).send('Internal Server Error');
        });
}