const fs = require("fs");
const path = require("path");

const JOB_PATH = path.join(__dirname, "../database/jobs.json");


function getAllJobs() {
    const data = JSON.parse(fs.readFileSync(JOB_PATH, "utf8"));

    return data.jobs;
}

async function getJobById(id) {
    const jobs = await getAllJobs();
    const jobId = await jobs.find(j => j.id === Number(id));

    return jobId;
}

async function createJob(job_data) {
    const jobs = await getAllJobs();

    const new_job = {
        id: jobs.length > 0 
            ? jobs[jobs.length - 1].id + 1 
            : 1,

        ...job_data,
        createdAt: new Date().toISOString().split("T")[0]
    }

    jobs.push(new_job);

    fs.writeFileSync(
        JOB_PATH,
        JSON.stringify(jobs, null, 2)
    );

    return true;
}

// async function updateJobId(id, data) {
//     const jobs = await getAllJobs();
//     const jobId = await jobs.find(j => j.id === id);

//     if (!jobId) return;

//     const data = 

//     return jobId;
// }

module.exports = {
    getAllJobs,
    getJobById
};