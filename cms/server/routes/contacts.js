var express = require('express');
var router = express.Router();
var sequenceGenerator = require('./sequenceGenerator');

const Contact = require('../models/contacts');

function returnError(res, error) {
    res.status(500).json({
        message: 'An error occured',
        error: error
    });
}

router.get('')