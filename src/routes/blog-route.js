const blogController = require('../controllers/blog-controller');
const multer = require('multer');
const express = require('express');
const router = express.Router();

const upload = multer({ dest: "uploads/" });


router.get('/getall', blogController.getAllBlogs);
router.post('/upload',upload.single("image"), blogController.uploadBlog);
router.get('/:id', blogController.getBlogById);

module.exports = router;