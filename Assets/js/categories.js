const categoryContainer = document.getElementById("category_container");

// Stored Categoried locally
all_categories = [];

// ==========================================
//          1. FETCH CATEGORY DATA
// ==========================================
const Get_Categories = async() => {
    try {
        const response = await fetch('../../../Database/categories.json');
        const data = await response.json();
        if (!data.categories) return;

        all_categories = data.categories;
        renderCategories(all_categories);
    } catch (error) {
        console.error("Failed to fetch categories:", error);
    }
}

// ==========================================
//          2. RENDER FUNCTION
// ==========================================
function renderCategories(categories) {
    categoryContainer.innerHTML = '';

    // Fallback
    if (categories.length == 0) {
        jobsContainer.innerHTML = `
            <div class="w-full text-center py-4" style="grid-column: 1 / -1;">
                <p class="text-muted">No Category found.</p>
            </div>
        `;
        return;
    }
    categories.forEach(cate => {
        categoryContainer.innerHTML += (
            `
                <div class="col-6">

                    <article class="card shadow-md" onclick="location.href='category_detail.html?category_id=${cate.id}'" style="cursor: pointer;">
                        <div class="card_header flex-between">
                            <h3 class="text-heading">
                                ${cate.name}
                            </h3>
                            <span class="badge badge--fulltime icon-md">
                                ${cate.jobs_id.length}
                            </span>
                        </div>
                        <div class="card_body">
                            <div class="text-center">
                                <i class="bi ${cate.icon} icon-lg"></i>
                            </div>
                            <p class="text-muted">
                                ${cate.description}
                            </p>
                        </div>
                    </article>
                </div>
            `
        )
    });
}

// ==========================================
//          INITIALIZE 
// ==========================================
Get_Categories();