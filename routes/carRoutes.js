// api-routes.js
// Initialize express router
let router = require('express').Router();
// Set default API response
router.get('/', function (req, res) {
    res.json({
        status: 'API Its Working',
        message: 'Welcome to RESTHub crafted with love!',
    });
});
// Import contact controller
var carController = require('../controller/carController');

router.route('/cars/getAllCars')
    .get(carController.index)

router.route("/cars/updateInStock")
    .post(carController.updateInStock)

router.route("/cars/updateTransmissionType")
    .post(carController.updateTransmissionType)

router.route("/cars/addNewCar")
    .post(carController.insert)

router.route("/cars/getCarDetails")
    .post(carController.view)


// Export API routes
module.exports = router;