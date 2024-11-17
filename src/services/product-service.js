const pool = require("../config/db");

exports.getAllProducts = async () => {
    const query = "SELECT id, name, image, oldprice, newprice FROM products";
    
    try {
        const result = await pool.query(query);
        return result.rows; 
    }
    catch (error) {
        console.error("Error retrieving products:", error);
    }
}

exports.insertProduct = async (name, image, oldprice, newprice) => {
  const query = `
    INSERT INTO products (name, image, oldprice, newprice) 
    VALUES ($1, $2, $3, $4) RETURNING id
  `;
  const values = [name, image, oldprice, newprice];

  try {
    const result = await pool.query(query, values);
    return result.rows[0].id; 
  } catch (error) {
    console.error("Error inserting product:", error);
  }
};

exports.getProductById = async (id) => {
  const query = "SELECT id, name, image, oldprice, newprice FROM products WHERE id = $1";

  try {
    const result = await pool.query(query, [id]);
    return result.rows[0]; 
  } catch (error) {
    console.error("Error retrieving product:", error);
  }
};


