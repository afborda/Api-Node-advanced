const CallServiceModel = require("../models/CallServiceModel");

module.exports = {
  all: function (req, res) {
    CallServiceModel.find({})
      .lean()
      .exec(function (err, callService) {
        if (err) return res.json([]);
        return res.json(callService);
      });
  },
};
