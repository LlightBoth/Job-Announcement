const jobService = require('../services/jobServices');


const getJobs = async(req, res) => {
    const jobs = await jobService.getAllJobs();

    res.json(jobs);
}

const getJobId = async(req, res) => {
    const id = req.params.id;
    const job = await jobService.getJobById(id);

    if (!job) {
        return res.json({"message": "Job not found."})
    }

    res.json(job);
}

const createJob = async(req, res) => {
    const data = req.body;
    const new_job = await jobService.createJob(data);

    res.status(201).json({
        message: "Job created successfully",
        new_job
    });
}

module.exports = {
    getJobs,
    getJobId,
    createJob
};