const express = require("express");
const {createMedication} = require('../controllers/medCotroller')

const medRouter = express.Router()

medRouter.post('/create', createMedication)

module.exports = medRouter