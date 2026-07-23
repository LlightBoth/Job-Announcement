const jobDetailContainer = document.getElementById("job_detail_container");


// Store data locally
let all_category = [];
let all_company = [];


// ==========================================
//          1. FETCH JOB_Detail DATA
// ==========================================
const Get_Job_Detail = async () => {
    try {
        // Get JOB ID from query_parameter
        const params = new URLSearchParams(window.location.search);
        const jobId = params.get("id");

        // Fetch from localstorage
        const get_added_job = JSON.parse(localStorage.getItem("jobs") || "[]");

        const [jobRes, categoryRes, companyRes] = await Promise.all([
            fetch(`http://localhost:3000/job/${jobId}`),
            fetch("http://localhost:3000/category"),
            fetch("http://localhost:3000/company"),
        ]);

        if (!jobRes.ok || !categoryRes.ok || !companyRes.ok) {
            throw new Error("Failed to fetch data.");
        }

        const [jobData, categoryData, companyData] = await Promise.all([
            jobRes.json(),
            categoryRes.json(),
            companyRes.json(),
        ]);

        const localJob = get_added_job.find(
            job => String(job.id) === String(jobId)
        );

        const job = localJob || jobData;
        all_category = categoryData || [];
        all_company = companyData || [];

        // console.log(all_category);

        RenderJobDetail(job);

    } catch (error) {
        console.error(error);
    }
};

// ==========================================
//          2. Render JOB_Detail
// ==========================================
async function RenderJobDetail(job) {
    jobDetailContainer.innerHTML = '';

    if (!job) {
        jobDetailContainer.innerHTML += (`
                <div class="w-full text-center py-4" style="grid-column: 1 / -1;">
                    <p class="text-muted">No matching job found.</p>
                </div>
            `);
        return;
    }

    // Relationship
    const category_detail = all_category.find(c => c.id == job.category_id) || {};
    const company_detail = all_company.find(c => c.id == job.company_id) || {};

    const job_benefit = job?.benefit || [];
    const job_requirement = job?.requirement?.split(",") || [];

    // Render Job_Detail via ID
    jobDetailContainer.innerHTML += (`
        <div class="col-4" >
                <img src="${job.imageURI || "../../../Assets/images/default.png"}" alt="company-image" class="text-center w-full">
        </div>
        <div class="col-1"></div>
        <div class="col-6">
            <div class="pb-1">
                <h2>${job?.title || 'Unknown Job'}</h2>
                <h5 class="text-muted"> ${company_detail?.name || 'Unknown Company'} </h5>
                <div class="mt-1 d-flex gap-2">
                    <span class="badge badge--${job.type}"> ${job?.badgeText || 'N/A'} </span>
                    <span class="badge "> ${job?.salary || 'Negotiable'} </span>
                    <span class="badge "> <i class="bi bi-clock px-2"></i> ${job?.work_date || 'Negotiable'} </span>
                </div>
                <p class="text-muted mt-1"><i class="bi bi-geo-alt-fill px-2"></i> ${company_detail?.location || 'Unknown Location'} </p>
                <p class="text-muted"> <i class="bi bi-calendar px-2"></i> Posted: ${job?.createdAt || 'Unknown Date'} </p>
            </div>
            <div class="py-4 jd-space">
                <h3 class="pb-1">Job Benefits</h3>
                <ul>
                    ${job_benefit
                        .map(b => `<li class="text-muted">${b}</li>`)
                        .join('')
                    }
                </ul>
                    
            </div>
            <div class="py-4 jd-space">
                <h3 class="pb-1">Requirement</h3>
                <ul>
                    ${job_requirement
                        .map(req => `<li class="text-muted">${req.trim()}</li>`)
                        .join('')
                    }
                </ul>
            </div>
            <div class="py-4 jd-space">
                <h3 class="pb-1">Description</h3>
                <p class="text-muted">${job?.desc || 'Unknown description'}</p>
            </div>
            <div class="py-4 jd-space">
                <a href="apply_cv.html?id=${job.id}" class="btn btn-primary p-4 ">Apply Now</a>
            </div>
        </div>
    `);
    
}


// ==========================================
//          INITIALIZE 
// ==========================================
Get_Job_Detail();