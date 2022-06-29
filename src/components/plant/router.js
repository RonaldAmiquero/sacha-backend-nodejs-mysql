const express = require('express')
const { getPlants } = require('./service')
const { success, error } = require('../../network/response')
const router = express.Router()

router.get('/', async (req, res) => {
   try {
      const search = req.query.search
      const plants = await getPlants(search)
      success(req, res, plants)
   } catch (err) {
      error(req, res, err)
   }
})

module.exports = router
