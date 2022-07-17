const { product, user, category, productcategory } = require('../../models');

exports.getProducts = async (req, res) => {
    try {
        const data = await product.findAll({
            include: [
                {
                    model: user,
                    as: "user",
                    attributes: {
                        exclude: ["createdAt", "updatedAt", "password"]
                    }
                },
                {
                    model: category,
                    as: "categories",
                    through: {
                        model: productcategory,
                        as: "bridge",
                        attributes: {
                            include: ["id"]
                        }
                    },
                    attributes: {
                        exclude: ["createdAt", "updatedAt", "id"]
                    }
                },
            ],
            attributes: {
                exclude: ["idUser"]
            }
        });

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

exports.getProduct = async (req, res) => {
    try {
        const { id } = req.params;

        const data = await product.findOne({
            where: { id },
            include: {
                model: user,
                as: "user",
                attributes: {
                    exclude: ["password"]
                }
            },
            attributes: {
                exclude: ["idUser"]
            }
        })

        if (!data) return res.status(400).send({
            status: "failed",
            message: "product not found"
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

exports.addProduct = async (req, res) => {
    const newProduct = await product.create({
        ...req.body,
        img: process.env.PATH_FILE + req.file.filename,
        idUser: req.user.id
    });

    try {
        res.status(201).send({
            status: "success",
            message: "new product has been successfully added!",
            data: newProduct
        })
    } catch (error) {
        res.status(400).send({
            status: "error",
            message: error.toString()
        })
    }
}

exports.updateProduct = async (req, res) => {
    try {
        const { id } = req.params;

        const data = await product.update({
            ...req.body,
            img: process.env.PATH_FILE + req.file.filename,
            idUser: req.user.id
        }, {
            where: {
                id
            }
        })

        if (data == 0) return res.status(400).send({
            status: "failed",
            message: "product not found"
        })

        res.status(200).send({
            status: "success",
            message: `update product id : ${id}, success!`,
            data: req.body
        })
    } catch (error) {
        res.status(400).send({
            status: "error",
            message: error.toString()
        })
    }
}

exports.deleteProduct = async (req, res) => {
    try {

        const { id } = req.params;

        const data = await product.destroy({
            where: {
                id
            }
        })

        if (!data) return res.status(400).send({
            status: "failed",
            message: "product not found"
        })

        res.status(200).send({
            status: "success",
            message: `delete product id : ${id}, success!`
        })
    } catch (error) {
        res.status(400).send({
            status: "error",
            message: error.toString()
        })
    }
}