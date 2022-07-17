const { user, profile, product } = require('../../models');

exports.getUsers = async (req, res) => {
    try {
        const data = await user.findAll({
            include: [
                {
                    model: profile,
                    as: "profile",
                    attributes: {
                        exclude: ["createdAt", "updatedAt", "idUser"]
                    }
                },
                {
                    model: product,
                    as: "product",
                    attributes: {
                        exclude: ["createdAt", "updatedAt", "idUser"]
                    }
                }
            ],
            attributes: {
                exclude: ["password"]
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

exports.getUser = async (req, res) => {
    try {
        const { id } = req.params;

        const data = await user.findOne({
            where: { id }
        })

        if (!data) return res.status(400).send({
            status: "failed",
            message: "user not found"
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

exports.addUser = async (req, res) => {
    try {
        const dataUser = await user.create(req.body);

        await profile.create({
            phone: null,
            gender: null,
            address: null,
            idUser: dataUser.id
        });

        res.status(201).send({
            status: "success",
            message: "new user has been successfully added!"
        })
    } catch (error) {
        res.status(400).send({
            status: "error",
            message: error.toString()
        })
    }
}

exports.updateUser = async (req, res) => {
    try {
        const { id } = req.params;

        const data = await user.update(req.body, {
            where: { id }
        })

        if (data == 0) return res.status(400).send({
            status: "failed",
            message: "user not found"
        })

        res.status(200).send({
            status: "success",
            message: `update user id : ${id}, success!`,
            data: req.body
        })
    } catch (error) {
        res.status(400).send({
            status: "error",
            message: error.toString()
        })
    }
}

exports.deleteUser = async (req, res) => {
    try {

        const { id } = req.params;

        const data = await user.destroy({
            where: { id }
        })

        if (!data) return res.status(400).send({
            status: "failed",
            message: "user not found"
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