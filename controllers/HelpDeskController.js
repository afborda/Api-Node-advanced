const HelpDeskModel = require("../models/HelpDeskModel");

module.exports = {
    show: function(req, res) {
        return res.json({
            "prioridade": [{id: "P01","text":"Baixa"}, {id: "P02", "text":"Alta"}, {id: "P03", text: "Média"}],
            "area": [{id: "A01", text: "Financeiro"}, {id: "A02", text: "TI"}, {id: "A03", text: "RH"} ],
            "tipo_atendimento": ["dev", "mais folhas", "help desk", "saude"]
        });
    },
    store: async function (req, res) {
        const healpdesk = new HelpDeskModel(req.body);
        await healpdesk.save();
        delete healpdesk.password;
        res.status(200).json(healpdesk);
    }
}
