const { category } = require("../../models")

exports.getCategories = async (req, res) => {
    try {
        const data = await category.findAll();

        res.status(200).send({
            status: "success",
            data
        })

    } catch (error) {
        res.status(400).send({
            status: "error",
            message: error.toString()
        })
    }
}

exports.getCategory = async (req, res) => {
    try {
        const { id } = req.params;

        const data = await category.findOne({
            where: { id }
        })

        if (!data) return res.status(400).send({
            status: "failed",
            message: "category not found"
        })

        res.status(200).send({
            status: "success",
            data
        })

    } catch (error) {
        res.status(400).send({
            status: "error",
            message: error.toString()
        })
    }
}

exports.addCategory = async (req, res) => {
    try {
        await category.create(req.body);

        res.status(201).send({
            status: "success",
            message: "add category has been successfully added!"
        })
    } catch (error) {
        res.status(400).send({
            status: "error",
            message: error.toString()
        })
    }
}


exports.updateCategory = async (req, res) => {
    try {
        const { id } = req.params;

        const data = await category.update(req.body, {
            where: { id }
        })

        if (data == 0) return res.status(400).send({
            status: "failed",
            message: "category not found"
        })

        res.status(200).send({
            status: "success",
            message: `update category id : ${id}, success!`,
            data: req.body
        })
    } catch (error) {
        res.status(400).send({
            status: "error",
            message: error.toString()
        })
    }
}

exports.deleteCategory = async (req, res) => {
    try {

        const { id } = req.params;

        const data = await category.destroy({
            where: { id }
        })

        if (!data) return res.status(400).send({
            status: "failed",
            message: "category not found"
        })

        res.status(200).send({
            status: "success",
            message: `delete user id : ${id}, success!`
        })
    } catch (error) {
        res.status(400).send({
            status: "error",
            message: error.toString()
        })
    }
}