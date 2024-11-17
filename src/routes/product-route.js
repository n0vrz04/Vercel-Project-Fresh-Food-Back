const express = require("express");
const multer = require("multer");
const productController = require("../controllers/product-controller");

const router = express.Router();

// Set up multer for file uploads
const upload = multer({ dest: "uploads/" });

// Routes
router.get("/getall", productController.getAllProducts);
router.post("/upload", upload.single("image"), productController.uploadProduct);
router.get("/:id", productController.getProductById);

module.exports = router;
