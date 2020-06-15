const express = require("express");
const router = express.Router();
const PersonController = require("../controllers/PersonController");
const ProductController = require("../controllers/ProductController");
const CallServiceController = require("../controllers/CallServiceController");
const HelpDeskController = require("../controllers/HelpDeskController");

const AuthController = require("../controllers/AuthController");

router.use(AuthController.check_token);

router.get('/help-desk', HelpDeskController.show);
router.get("/people", PersonController.all);
router.get("/products", ProductController.all);
router.get("/callservice", CallServiceController.all);
router.get("/callservice/:id", CallServiceController.getCall);

module.exports = router;
