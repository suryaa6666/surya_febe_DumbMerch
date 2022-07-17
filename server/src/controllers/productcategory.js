const { productcategory } = require('../../models');

exports.addProductCategory = async (req, res) => {
    try {
        const newProductCategory = await productcategory.create(req.body);

        res.status(201).send({
            status: "success",
            message: "new product-category has been successfully added!",
            data: newProductCategory
        })
    } catch (error) {
        res.status(400).send({
            status: "error",
            message: error.toString()
        })
    }
}

exports.updateProductCategory = async (req, res) => {
    try {
        const { id } = req.params;

        const data = await productcategory.update(req.body, {
            where: { id }
        })

        if (data == 0) return res.status(400).send({
            status: "failed",
            message: "product-category not found"
        })

        res.status(200).send({
            status: "success",
            message: `update product-category id : ${id}, success!`,
            data: req.body
        })
    } catch (error) {
        res.status(400).send({
            status: "error",
            message: error.toString()
        })
    }
}

exports.deleteProductCategory = async (req, res) => {
    try {

        const { id } = req.params;

        const data = await productcategory.destroy({
            where: { id }
        })

        if (!data) return res.status(400).send({
            status: "failed",
            message: "product-category not found"
        })

        res.status(200).send({
            status: "success",
            message: `delete product-category id : ${id}, success!`
        })
    } catch (error) {
        res.status(400).send({
            status: "error",
            message: error.toString()
        })
    }
}