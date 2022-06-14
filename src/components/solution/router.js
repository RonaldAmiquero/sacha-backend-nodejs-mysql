const express = require('express')
const { StatusCodes } = require('http-status-codes')
const { getSolution } = require('./service')
const { success, error } = require('../../network/response')
const router = express.Router()

router.get('/:id', async (req, res) => {
   const { id } = req.params
   const rta = await getSolution(id)
   success(req, res, rta)
})

module.exports = router
