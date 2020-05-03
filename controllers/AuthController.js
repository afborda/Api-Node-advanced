const UserModel = require("../models/UserModel");
const bcrypt = require("bcryptjs");
const consts = require("../consts");
const jwt = require("jsonwebtoken");

module.exports = {
  register: async function (req, res) {
    try {
      let userRegister = await UserModel.findOne({ email: req.body.email });
      if (!userRegister) {
        const user = new UserModel(req.body);
        user.password = bcrypt.hashSync(req.body.password, consts.bcryptSalts);
        await user.save();
        delete user.password;
        res.status(200).json(user);
      } else {
        res
          .status(403)
          .json({ message: "Email already registered", error: {} });
      }
    } catch (e) {
      res
        .status(500)
        .json({ message: "Error while saving the user", error: {} });
    }
  },

  login: function (req, res) {
    const password = req.body.password;
    const email = req.body.email;
    UserModel.findOne({ email: email })
      .lean()
      .exec(function (err, user) {
        if (err) {
          return res.status(500).json({
            message: "Server Error",
            error: err,
          });
        }
        const auth_err = password == "" || password == null || !user;

        if (!auth_err) {
          if (bcrypt.compareSync(password, user.password)) {
            let token = jwt.sign({ _id: user._id }, consts.keyJWT, {
              expiresIn: consts.expiresJWT,
            });
            delete user.password;
            return res.json({
              ...user,
              token: token,
            });
          }
        }
        return res.status(404).json({
          message: "Wrong e-mail or password",
        });
      });
  },
  check_token: function (req, res, next) {
    const token = req.get("Authorization");
    if (!token) {
      return res.status(401).json({ message: "Token Not Found" });
    }
    jwt.verify(token, consts.keyJWT, (err, decoded) => {
      if (err || !decoded) {
        return res
          .status(401)
          .json({ message: "Wrong token. Athentication error" });
      }
      next();
    });
  },

  user_data: function (req, res) {
    const token = req.get("Authorization");
    jwt.verify(token, consts.keyJWT, (err, decoded) => {
      const id = decoded._id;
      UserModel.findById(id)
        .lean()
        .exec(function (err, user) {
          if (err || !user) {
            return res.status(500).json({
              message: "Error when trying to fetch user data",
              error: err,
            });
          }
          let token = jwt.sign({ _id: user._id }, consts.keyJWT, {
            expiresIn: consts.expiresJWT,
          });
          delete user.password;
          return res.json({ ...user, token: token });
        });
    });
  },
};
