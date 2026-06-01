const express = require('express')
// Imports the Express library into this file
const {createdOrder,verifyPayment} = require('../controller/paymentController')
const router = express.Router()
/*
Creates a mini app that handles routes
Instead of using app.get(), app.post() in every file, you use router.get(), router.post()
Then export it and attach to main app in index.js
*/

router.post('/order',createdOrder)
router.post('/verify',verifyPayment)

module.exports = router;