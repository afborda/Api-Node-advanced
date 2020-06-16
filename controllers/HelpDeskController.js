const HelpDeskModel = require("../models/HelpDeskModel");
const UserModel = require("../models/UserModel");
const bcrypt = require("bcryptjs");
const consts = require("../consts");
const jwt = require("jsonwebtoken");
module.exports = {
    show: function (req, res) {
        return res.json({
            "prioridade": [ "Baixa", "Alta", "Média"],
            "area": ["Financeiro" , "TI",  "RH"],
            "tipo_atendimento": ["dev", "mais folhas", "help desk", "saude"]
        });
    },
    store: function (req, res) {
        const token = req.get("Authorization");
        jwt.verify(token, consts.keyJWT, (err, decoded) => {
            const id = decoded._id;
            const hdData = req.body;
            hdData['user'] = id;
            hdData['status'] = 'aberto';
            const healpdesk = new HelpDeskModel(hdData);
            healpdesk.save();
            res.status(200).json(healpdesk);
        });
    },
    index: async function (req, res) {
        const token = req.get("Authorization");
        jwt.verify(token, consts.keyJWT, (err, decoded) => {
            const id = decoded._id;
            console.log(decoded);
            let filter = {};
            if(!decoded.isadmin) filter = {user: id};

            HelpDeskModel.find(filter)
                .populate('user')
                .populate('technical')
                .lean()
                .exec(function (err, hd) {
                    res.status(200).json(hd);
                });
        });
    },
    changeStatus: function (req, res) {
        const token = req.get("Authorization");
         jwt.verify(token, consts.keyJWT, (err, decoded) => {
            if (!decoded.isadmin) res.status(401).json({errors: ["Você nao tem permissao para realizar esta ação"]});
            else {
                const status = req.body.status;
                console.log(status, req.body.id);
                HelpDeskModel.findOneAndUpdate({_id: req.body.id}, {status: status})
                    .exec(function (err, hd) {
                        res.status(200).json(hd);
                    });
            }

        });
    },
    attachUserTechnical: function (req, res) {
        const token = req.get("Authorization");
        jwt.verify(token, consts.keyJWT, (err, decoded) => {
            if (!decoded.isadmin) res.status(401).json({errors: ["Você nao tem permissao para realizar esta ação"]});
            else {
                const user = req.body.technicalid;
                HelpDeskModel.findOneAndUpdate({_id: req.body.id}, {technical: user})
                    .exec(function (err, hd) {
                        res.status(200).json(hd);
                    });
            }
        });
    }
}
