const PersonModel = require("../models/PersonModel");

module.exports = {
  all: function (req, res) {
    PersonModel.find({})
      .lean()
      .exec(function (err, products) {
        if (err) return res.json([]);
        return res.json(products);
      });
  },
};
