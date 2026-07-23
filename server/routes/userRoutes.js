const express = require("express");
const router = express.Router();

const userController = require('../controllers/userControllers');

// Import protectted middleware
const checkUserAuthentication = require('../middleware/jwt'); 

router.get("/", userController.getUsers);
router.get("/:id", userController.getUserId);
router.post("/create", userController.createUser);
router.post("/edit", checkUserAuthentication, userController.updateUser);
router.post("/edit/password", userController.updatePassword);
router.post("/email", checkUserAuthentication, userController.getUserViaEmail);

module.exports = router;