const express = require('express');
const OHLCController = require('@controllers/OHLCController');

const router = express.Router();
router
    .route('/')
    .get(
        OHLCController.index
    );

module.exports = router;
