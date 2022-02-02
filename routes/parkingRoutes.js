// api-routes.js
// Initialize express router
let router = require('express').Router();
// Import contact controller

router.get('/', function (req, res) {
    res.json({
        status: 'API Its Working',
        message: 'Welcome to RESTHub crafted with love!',
    });
});

var parkingController = require('../controller/parkingController');

router.route("/park/getCar")
    .post(parkingController.view)

router.route("/park/updateParkingSection")
    .post(parkingController.updateParkingSection)


// Export API routes
module.exports = router;