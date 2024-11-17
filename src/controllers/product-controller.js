const productService = require("../services/product-service");
const fs = require("fs");

exports.getAllProducts = async (req, res) => {
    try {
        // Call service to retrieve all products
        const products = await productService.getAllProducts();
    
        res.json(products);
    } catch (error) {
        console.error("Error retrieving products:", error);
        res.status(500).send("Error retrieving products");
    }
    };

exports.uploadProduct = async (req, res) => {
  const { name, oldprice, newprice } = req.body;
  const imagePath = req.file.path;

  try {
    const imageData = fs.readFileSync(imagePath);
    const productId = await productService.insertProduct(name, imageData, oldprice, newprice);
    fs.unlinkSync(imagePath);

    res.status(200).send(`Product uploaded with ID: ${productId}`);
  } catch (error) {
    console.error("Error uploading product:", error);
    res.status(500).send("Error uploading product");
  }
};

exports.getProductById = async (req, res) => {
  const productId = req.params.id;

  try {
    // Call service to retrieve the product by ID
    const product = await productService.getProductById(productId);

    if (product) {
      // Set appropriate headers for image data
      res.set("Content-Type", "image/jpeg"); // Adjust based on image type
      res.set("Content-Disposition", `attachment; filename="${product.name}.jpg"`);
      
      // Send product details along with the image data
      res.json({
        id: product.id,
        name: product.name,
        oldprice: product.oldprice,
        newprice: product.newprice,
        image: product.data.toString("base64"), // Send image as base64 string
      });
    } else {
      res.status(404).send("Product not found");
    }
  } catch (error) {
    console.error("Error retrieving product:", error);
    res.status(500).send("Error retrieving product");
  }
};
