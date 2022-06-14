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
      const { idPlanta, hechos } = req.body.data
      let resultDiseases = await getDisease(idPlanta, hechos)
      success(req, res, resultDiseases)
   } catch (err) {
      error(req, res, err)
   }
})

router.get('/:id', async (req, res) => {
   const { id } = req.params
   const rta = await getQuestionsAnomalies(id)
   success(req, res, rta)
})

module.exports = router
