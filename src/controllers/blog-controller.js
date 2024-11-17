const blogService = require("../services/blog-service");
const fs = require("fs");

exports.getAllBlogs = async (req, res) => {
    try {
        // Call service to retrieve all blogs
        const blogs = await blogService.getAllBlogs();
    
        res.json(blogs);
    } catch (error) {
        console.error("Error retrieving blogs:", error);
        res.status(500).send("Error retrieving blogs");
    }
    };

    exports.uploadBlog = async (req, res) => {
        const { title, description, author ,date } = req.body;
        const imagePath = req.file.path;
      
        try {
          const imageData = fs.readFileSync(imagePath);
          const blogId = await blogService.insertBlog(title, imageData,description, author ,date);
          fs.unlinkSync(imagePath);
      
          res.status(200).send(`Blog uploaded with ID: ${blogId}`);
        } catch (error) {
          console.error("Error uploading blog:", error);
          res.status(500).send("Error uploading blog");
        }
      };

      exports.getBlogById = async (req, res) => {
        const blogId = req.params.id;
      
        try {
          const blog = await blogService.getBlogById(blogId);
      
          if (blog) {
            res.set("Content-Type", "image/jpeg"); 
            res.set("Content-Disposition", `attachment; filename="${blog.name}.jpg"`);
            
            res.json({
              id: blog.id,
              title: blog.title,
              description: blog.description,
              author: blog.author,
              date: blog.date,
              image: blog.data.toString("base64"), // Send image as base64 string
            });
          } else {
            res.status(404).send("Product not found");
          }
        } catch (error) {
          console.error("Error retrieving product:", error);
          res.status(500).send("Error retrieving product");
        }
      };


