const express = require("express");
const router = express.Router();
const PersonController = require("../controllers/PersonController");
const ProductController = require("../controllers/ProductController");
const CallServiceController = require("../controllers/CallServiceController");
const HelpDeskController = require("../controllers/HelpDeskController");

const AuthController = require("../controllers/AuthController");

router.use(AuthController.check_token);

router.get('/help-desk/show', HelpDeskController.show);
router.post('/help-desk', HelpDeskController.store);
router.get('/help-desk', HelpDeskController.index);
router.post('/help-desk/change-status', HelpDeskController.changeStatus);
/**
 * @route POST /help-desk/change-status
 * * * example
 * @json
 *  {
	"id": "5ee8152b75a90e04725d2a7f",
	"status": "fechado"
 *  }
 */
router.post('/help-desk/attach-technical', HelpDeskController.attachUserTechnical);
/**
 * @route POST /help-desk/attach-technical
 * * * example
 * @json
 *  {
	"technicalid": "5ee8152b75a90e04725d2a7f",
 *  }
 */

router.get("/people", PersonController.all);
router.get("/products", ProductController.all);
router.get("/callservice", CallServiceController.all);
router.get("/callservice/:id", CallServiceController.getCall);

module.exports = router;
