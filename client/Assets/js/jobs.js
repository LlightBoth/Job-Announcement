const jobsContainer = document.getElementById("jobs");
const filterSelect = document.getElementById("job-filter");

// Store jobs globally
let all_jobs = [];
let all_categories = [];
let all_companies = [];

// ==========================================
//          1. FETCH JOB DATA
// ==========================================
const Get_All_Jobs = async () => {
    try {
        // Fetch from localstorage
        const get_added_job = JSON.parse(localStorage.getItem("jobs") || "[]");
        
        const [jobRes, categoryRes, companyRes] = await Promise.all([
            fetch("http://localhost:3000/job"),
            fetch("http://localhost:3000/category"),
            fetch("http://localhost:3000/company")
        ]);

        if (!jobRes.ok || !categoryRes.ok || !companyRes.ok) {
            throw new Error("Failed to fetch one or more resources.");
        }

        const [jobData, categoryData, companyData] = await Promise.all([
            jobRes.json(),
            categoryRes.json(),
            companyRes.json()
        ]);

        // APIs return arrays directly:
        all_jobs = [
            ...(Array.isArray(jobData) ? jobData : jobData.jobs || []),
            ...get_added_job
        ];
        all_categories = Array.isArray(categoryData)
            ? categoryData
            : categoryData.categories || [];
        all_companies = Array.isArray(companyData)
            ? companyData
            : companyData.companies || [];

        renderJobs(all_jobs);

    } catch (err) {
        console.error("Failed to fetch data:", err);
    }
};

// ==========================================
//          2. RENDER FUNCTION
// ==========================================
function renderJobs(jobJson) {
    jobsContainer.innerHTML = "";
    
    if (jobJson === null) {
        jobsContainer.innerHTML = `
            <div class="w-full text-center py-4" style="grid-column: 1 / -1;">
            <p class="text-muted">No positions found matching this criteria.</p>
            </div>
        `;
        return;
    }
    
    jobJson.forEach(j => {
        // Find matching company
        const category = all_categories.find(c => c.id === j.category_id) || {};
        const company = all_companies.find(c => c.id === j.company_id) || {};

        jobsContainer.innerHTML += `
            <article class="card" onclick="location.href='job_detail.html?id=${j.id}'" style="cursor: pointer;">
                <div class="card_body">

                    <div class="card_header">
                        <img src="${j.imageURI || "../../../Assets/images/default.png"}" alt="${j.title}" class="card-image">

                        <span class="badge badge--${j.type}">
                            ${j.badgeText}
                        </span>

                        <span class="category">
                            ${category ? category.name : "Unknown Category"}
                        </span>
                    </div>

                    <h3 class="text-heading" style="font-size: 1.25rem; margin-top: 0.5rem;">
                        ${j.title}
                    </h3>

                    <p class="text-muted" style=" font-weight: 600; font-size: 0.85rem; margin-bottom: 0.75rem; color: var(--brand-primary);">
                        ${company ? company.name : "Unknown Company"}
                    </p>

                    <p class="text-muted text-clamp-3">
                        ${j.desc}
                    </p>

                </div>

                <div class="card_footer">
                    <span class="text-price">
                        ${j.salary}
                    </span>

                    <a href="job_detail.html?id=${j.id}" class="btn-primary" style="text-decoration: none; display: inline-block;">
                        View
                    </a>
                </div>
            </article>
        `;
    });
}

// ==========================================
//          3. FILTER ACTION LISTENER
// ==========================================
filterSelect.addEventListener("change", (e) => {

    const selectedValue = e.target.value;

    const filteredResults = all_jobs.filter(job => {

        if (selectedValue === "general") {
            return true;
        }

        return job.type === selectedValue;
    });

    renderJobs(filteredResults);
});


// ==========================================
//          INITIALIZE 
// ==========================================
Get_All_Jobs();