const express = require("express");
const router = express.Router();

const companyController = require('../controllers/companyControllers');

// Import protectted middleware
const checkUserAuthentication = require('../middleware/jwt'); 

router.get("/", companyController.getCompanies);
router.get("/:id", companyController.getCompanyId);
router.post("/", companyController.createCompany);

module.exports = router;