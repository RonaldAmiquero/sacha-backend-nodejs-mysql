const express = require('express')
const { StatusCodes } = require('http-status-codes')
const { getDisease, getQuestionsAnomalies } = require('./service')
const { success, error } = require('../../network/response')
const router = express.Router()

router.get('/:id', async (req, res) => {
   const { id } = req.params
   const rta = await getQuestionsAnomalies(id)
   success(req, res, rta)
})

router.post('/process', async (req, res) => {
   try {
      let resultDiseases = await getDisease(req.body.idPlanta, req.body.hechos)
      success(req, res, resultDiseases)
   } catch (err) {
      error(req, res, err)
   }
})

module.exports = router
