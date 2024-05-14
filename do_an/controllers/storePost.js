const BlogPost = require('../models/BlogPost.js')
const path = require('path')
module.exports = (req, res) => {
    let image = req.files.image;

    // Di chuyển file ảnh vào thư mục 'public/upload'
    image.mv(path.resolve(__dirname, 'public/upload', image.name), function (error) {
        if (error) {
            console.error(error);
            return res.status(500).send('Internal Server Error');
        }

        // Sau khi upload ảnh thành công, tạo bài đăng trong cơ sở dữ liệu
        BlogPost.create({ 
            ...req.body, 
            image: '/upload/' + image.name 
        })
        .then(blogpost => {
            // Sau khi tạo bài đăng thành công, chuyển hướng người dùng về trang chính
            // và cập nhật lại danh sách bài đăng
            res.redirect('/');
        })
        .catch(error => {
            // Xử lý lỗi
            console.error(error);
            res.status(500).send('Internal Server Error');
        });
    });
}