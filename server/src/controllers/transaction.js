const { transaction, product, user } = require("../../models")

exports.getTransactions = async (req, res) => {
    try {
        const data = await transaction.findAll({
            include: [
                {
                    model: product,
                    as: "product",
                    attributes: {
                        exclude: ["createdAt", "updatedAt", "idUser"]
                    }
                },
                {
                    model: user,
                    as: "buyer",
                    attributes: {
                        exclude: ["createdAt", "updatedAt", "password"]
                    }
                },
                {
                    model: user,
                    as: "seller",
                    attributes: {
                        exclude: ["createdAt", "updatedAt", "password"]
                    }
                },
            ],
            attributes: {
                exclude: ["idProduct", "idBuyer", "idSeller"]
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

exports.getTransaction = async (req, res) => {
    try {
        const { id } = req.params;

        const data = await transaction.findOne({
            where: { id },
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
                    as: "buyer",
                    attributes: {
                        exclude: ["createdAt", "updatedAt", "password"]
                    }
                },
                {
                    model: user,
                    as: "seller",
                    attributes: {
                        exclude: ["createdAt", "updatedAt", "password"]
                    }
                },
            ],
            attributes: {
                exclude: ["idProduct", "idBuyer", "idSeller"]
            }
        })

        if (!data) return res.status(400).send({
            status: "failed",
            message: "transaction not found"
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

exports.addTransaction = async (req, res) => {
    try {

        if (req.body.idSeller == req.body.idBuyer) return res.status(400).send({
            status: "error",
            message: "idBuyer cannot be the same as idSeller"
        })

        await transaction.create(req.body);

        res.status(201).send({
            status: "success",
            message: "new transaction has been successfully added!"
        })
    } catch (error) {
        res.status(400).send({
            status: "error",
            message: error.toString()
        })
    }
}