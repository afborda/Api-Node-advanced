

module.exports = {
    show: function(req, res) {
        return res.json({
            "prioridade": [{id: "P01","text":"Baixa"}, {id: "P02", "text":"Alta"}, {id: "P03", text: "Média"}],
            "area": [{id: "A01", text: "Financeiro"}, {id: "A02", text: "TI"}, {id: "A03", text: "RH"} ],
            "tipo_atendimento": ["dev", "mais folhas", "help desk", "saude"]
        });
    }
}
