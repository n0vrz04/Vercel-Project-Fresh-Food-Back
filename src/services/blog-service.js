const pool = require("../config/db");

exports.getAllBlogs = async () => {
    const query = "SELECT id, title, description, image , author , date FROM blogs";
    try {
        const result = await pool.query(query);
        return result.rows;
    } catch (error) {
        console.error("Error retrieving blogs:", error);
    }
}

exports.insertBlog = async (title, image,description, author, date) => {
    const query = `
      INSERT INTO blogs (title, image,description, author, date) 
      VALUES ($1, $2, $3, $4,$5) RETURNING id
    `;
    const values = [title, image, description, author,date];
  
    try {
      const result = await pool.query(query, values);
      return result.rows[0].id;
    } catch (error) {
      console.error("Error inserting product:", error);
    }
  };

    exports.getBlogById = async (id) => {
        const query = "SELECT id, title, image, description, author, date FROM blogs WHERE id = $1";
    
        try {
        const result = await pool.query(query, [id]);
        return result.rows[0];
        }
        catch (error) {
        console.error("Error retrieving blog:", error);
        }
    }