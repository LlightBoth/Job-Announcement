const express = require("express");
const router = express.Router();

const jobController = require('../controllers/jobControllers');

// Import protectted middleware
const checkUserAuthentication = require('../middleware/jwt'); 

router.get("/", jobController.getJobs);
router.get("/:id", jobController.getJobId);
router.post("/create", jobController.createJob);

module.exports = router;