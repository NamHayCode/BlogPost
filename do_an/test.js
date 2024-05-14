const mongoose = require('mongoose');
const BlogPost = require('./models/BlogPost');

// Remove deprecated `useNewUrlParser` option
mongoose.connect('mongodb://localhost/test_my_database');

BlogPost.create({
  title: 'Đgfggdffdây là sách dạy học lập tsdfsddfsddsf',
  body: 'Nếu bạn đam mê với Javascript và muốn khám phá cách xây dựng ứng dụng với Node.js thì đây là cuốn sách dành cho bạn.',
})
  .then(blogPost => {
    console.log('Blog post created successfully:', blogPost);
  })
  .catch(error => {
    console.error('Error creating blog post:', error);
  });


//   BlogPost.find({ title: 'Đây là sách dạy học lập trình Node.js từ cơ bản' })
//   .then(blogPosts => {
//     if (blogPosts.length > 0) {
//       console.log('Found blog posts:', blogPosts);
//     } else {
//       console.log('No blog posts found with the title "Node.js"');
//     }
//   })
//   .catch(error => {
//     console.error('Error finding blog posts:', error);
//   });

// const id = "663af76797d26c58151dabb3"; // Assuming the ID is a string

// BlogPost.findByIdAndUpdate(id, { title: 'Updated title' })
//   .then(updatedBlogPost => {
//     if (updatedBlogPost) {
//       console.log('Blog post updated successfully:', updatedBlogPost);
//     } else {
//       console.log('No blog post found with the ID:', id);
//     }
//   })
//   .catch(error => {
//     console.error('Error updating blog post:', error);
//   });


// const id = "663af76797d26c58151dabb3"; // Assuming the ID is a string

// BlogPost.findByIdAndDelete(id)
//   .then(deletedBlogPost => {
//     if (deletedBlogPost) {
//       console.log('Blog post deleted successfully:', deletedBlogPost._id); // Use _id for clarity
//     } else {
//       console.log('No blog post found with the ID:', id);
//     }
//   })
//   .catch(error => {
//     console.error('Error deleting blog post:', error);
//   });