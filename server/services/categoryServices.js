const fs = require("fs");
const path = require("path");

const category_PATH = path.join(__dirname, "../database/categories.json");


function getAllCategories() {
    const data = JSON.parse(fs.readFileSync(category_PATH, "utf8"));

    return data.categories;
}

async function getCategoryById(id) {
    const categories = await getAllCategories();
    const categoryId = await categories.find(c => c.id === Number(id));

    return categoryId;
}

async function createCategory(category_data) {
    const categories = await getAllCategories();

    const new_category = {
        id: categories.length > 0 
            ? categories[categories.length - 1].id + 1 
            : 1,

        ...category_data,
        createdAt: new Date().toISOString().split("T")[0]
    }

    categories.push(new_category);

    fs.writeFileSync(
        category_PATH,
        JSON.stringify(categories, null, 2)
    );

    return true;
}


module.exports = {
    getAllCategories,
    getCategoryById,
    createCategory
};