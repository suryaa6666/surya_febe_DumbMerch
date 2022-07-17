const { profile } = require('../../models');

exports.updateProfile = async (req, res) => {
    try {
        const { idUser } = req.params;

        const data = await profile.update(req.body, {
            where: { idUser }
        })

        if (data == 0) return res.status(400).send({
            status: "failed",
            message: "edit profile not found"
        })

        res.status(200).send({
            status: "success",
            message: `update profile idUser : ${idUser}, success!`,
            data: req.body
        })
    } catch (error) {
        res.status(400).send({
            status: "error",
            message: error.toString()
        })
    }
}
