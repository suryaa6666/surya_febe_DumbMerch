const { wishlist, product, user } = require('../../models');

exports.getWishlists = async (req, res) => {
    try {
        const data = await wishlist.findAll({
            include: [
                {
                    model: product,
                    as: "product",
                    attributes: {
                        exclude: ["createdAt", "updatedAt"]
                    }
                },
                {
                    model: user,
                    as: "user",
                    attributes: {
                        exclude: ["createdAt", "updatedAt", "password"]
                    }
                }
            ],
            attributes: {
                exclude: ["idUser", "idProduct"]
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

exports.getWishlist = async (req, res) => {
    try {
        const data = await wishlist.findAll({
            where: { idUser: req.user.id },
            include: [
                {
                    model: product,
                    as: "product",
                    attributes: {
                        exclude: ["createdAt", "updatedAt"]
                    }
                },
                {
                    model: user,
                    as: "user",
                    attributes: {
                        exclude: ["createdAt", "updatedAt", "password"]
                    }
                }
            ],
            attributes: {
                exclude: ["idUser", "idProduct"]
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


exports.getWishlistById = async (req, res) => {
    try {

        const { id } = req.params

        const data = await wishlist.findOne({
            where: { idProduct: id },
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

exports.addWishlist = async (req, res) => {
    try {
        const data = await wishlist.create({
            idProduct: req.body.idProduct,
            idUser: req.user.id
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

exports.deleteWishlist = async (req, res) => {
    try {

        const { id } = req.params

        await wishlist.destroy({
            where: { idProduct: id }
        })

        res.status(200).send({
            status: "success",
            message: "delete wishlist success!"
        })

    } catch (error) {
        res.status(400).send({
            status: "error",
            message: error.toString()
        })
    }
}