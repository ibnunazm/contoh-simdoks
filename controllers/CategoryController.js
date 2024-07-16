import Category from "../models/CategoryModel.js";

export const getCategories = async (req, res) => {
    try {
        const categories = await Category.findAll();
        res.status(200).json(categories);
    } catch (error) {
        console.log(error.message);
    }
}

export const getCategoryById = async (req, res) => {
    try {
        const category = await Category.findByPk(req.params.id);
        res.status(200).json(category);
    } catch (error) {
        console.log(error.message);
    }
}

export const createCategory = async (req, res) => {
    try {
        await Category.create(req.body);
        res.status(201).json({message: "Category created successfully"});
    } catch (error) {
        console.log(error.message);
    }
}

export const updateCategory = async (req, res) => {
    try {
        await Category.update(req.body, {
            where: {
                id: req.params.id,
            }
        });
        res.status(200).json({message: "Category updated successfully"});
    } catch (error) {
        console.log(error.message);
    }
}

export const deleteCategory = async (req, res) => {
    try {
        await Category.destroy({
            where: {
                id: req.params.id,
            }
        });
        res.status(200).json({message: "Category deleted successfully"});
    } catch (error) {
        console.log(error.message);
    }
}