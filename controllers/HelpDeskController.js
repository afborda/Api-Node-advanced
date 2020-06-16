const HelpDeskModel = require("../models/HelpDeskModel");
const UserModel = require("../models/UserModel");
const bcrypt = require("bcryptjs");
const consts = require("../consts");
const jwt = require("jsonwebtoken");
module.exports = {
    show: function (req, res) {
        return res.json({
            "prioridade": [{id: "P01", "text": "Baixa"}, {id: "P02", "text": "Alta"}, {id: "P03", text: "Média"}],
            "area": [{id: "A01", text: "Financeiro"}, {id: "A02", text: "TI"}, {id: "A03", text: "RH"}],
            "tipo_atendimento": ["dev", "mais folhas", "help desk", "saude"]
        });
    },
    store: function (req, res) {
        const token = req.get("Authorization");
        jwt.verify(token, consts.keyJWT, (err, decoded) => {
            const id = decoded._id;
            const hdData = req.body;
            hdData['user'] = id;
            const healpdesk = new HelpDeskModel(hdData);
            healpdesk.save();
            res.status(200).json(healpdesk);
        });
    },
    index: async function (req, res) {
        const token = req.get("Authorization");

        jwt.verify(token, consts.keyJWT, (err, decoded) => {
            const id = decoded._id;
            UserModel.findById(id)
                .lean()
                .exec(function (err, user) {
                    console.log(user);
                    const filter = {};
                    if (!user.isadmin) filter = {user: id};

                    HelpDeskModel.find(filter)
                        .lean()
                        .exec(function (err, hd) {
                            res.status(200).json(hd);
                        })
                });

        });

    }
}
