const categoryService = require('../services/categoryServices');


const getCategories = async(req, res) => {
    const categories = await categoryService.getAllCategories();

    res.json(categories);
}

const getCategoriesId = async(req, res) => {
    const id = req.params.id;
    const category = await categoryService.getCategoryById(id);

    if (!category) {
        return res.json({"message": "Category not found."})
    }

    res.json(category);
}

const createCategory = async(req, res) => {
    const data = req.body;
    const new_category = await categoryService.createCategories(data);

    res.status(201).json({
        message: "Categories created successfully",
        new_category
    });
}

module.exports = {
    getCategories,
    getCategoriesId,
    createCategory
};