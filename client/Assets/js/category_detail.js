const categoryHeader = document.getElementById("category_header");
const categoryContainer = document.getElementById("category");
const filterSelect = document.getElementById("job-filter");

// Store category globally
let all_jobs = [];
let jobs = [];
let all_categories = [];
let all_companies = [];

// ==========================================
//          1. FETCH JOB DATA
// ==========================================
const Get_All_Category_Detail = async () => {
    try {
        // Get category ID from URL
        const categoryParam = new URLSearchParams(window.location.search);
        const category_id = categoryParam.get("category_id");

        if (!category_id) {
            throw new Error("Category ID is missing.");
        }

        const [jobRes, categoryRes, companyRes] = await Promise.all([
            fetch("http://localhost:3000/job"),
            fetch(`http://localhost:3000/category/${category_id}`),
            fetch("http://localhost:3000/company")
        ]);

        if (!jobRes.ok || !categoryRes.ok || !companyRes.ok) {
            throw new Error("Failed to fetch data.");
        }

        const [jobData, categoryData, companyData] = await Promise.all([
            jobRes.json(),
            categoryRes.json(),
            companyRes.json()
        ]);

        // Store data
        all_jobs = jobData || [];
        all_categories = categoryData || [];
        all_companies = Array.isArray(companyData)
            ? companyData
            : companyData.companies || [];

        // Filter jobs by category_id
        jobs = all_jobs.filter(
            job => String(job.category_id) === String(category_id)
        );
        
        // Find selected category
        const category = all_categories;
        if (!category) {
            renderCategory(null);
            return;
        }
        // Render category jobs
        renderCategory(jobs);

    } catch (error) {
        console.error("Failed to fetch category:", error);
    }
};

// ==========================================
//          2. RENDER FUNCTION
// ==========================================
function renderCategory(jobJson) {
    categoryContainer.innerHTML = "";
    categoryHeader.innerHTML = "";
    
    if (jobJson === null) {
        categoryContainer.innerHTML = `
            <div class="w-full text-center py-4" style="grid-column: 1 / -1;">
            <p class="text-muted">No positions found matching this criteria.</p>
            </div>
        `;
        return;
    }
    
    jobJson.forEach(j => {
        // Find matching company
        const category = all_categories || {};
        const company = all_companies.find(c => c.id === j.company_id) || {};

        // Header Contaner
        categoryHeader.innerHTML = `
            <span class="badge badge--remote" style="margin-bottom: 1rem;">Browse Category</span>
            <h1 class="text-heading" style="font-size: 2.5rem;">${category.name}</h1>
            <p class="text-muted">${category.description}</p>
        `

        // Main Container
        categoryContainer.innerHTML += `
            <article class="card" onclick="location.href='job_detail.html?id=${j.id}'" style="cursor: pointer;">
                <div class="card_body">

                    <div class="card_header">
                        <img src="${j.imageURI}" alt="${j.title}" class="card-image">

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

    const filteredResults = jobs.filter(job => {

        if (selectedValue === "general") {
            return true;
        }

        return job.type === selectedValue;
    });

    renderCategory(filteredResults);
});


// ==========================================
//          INITIALIZE 
// ==========================================
Get_All_Category_Detail();