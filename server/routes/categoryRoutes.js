const express = require("express");
const router = express.Router();

const categoryController = require('../controllers/categoryControllers');

// Import protectted middleware
const checkUserAuthentication = require('../middleware/jwt'); 

router.get("/", categoryController.getCategories);
router.get("/:id", categoryController.getCategoriesId);
router.post("/create", categoryController.createCategory);

module.exports = router;