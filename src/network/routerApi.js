const express = require('express')
const diagnosticRouter = require('../components/diagnostic/router')
const plantRouter = require('../components/plant/router')

function routerApi(app) {
   const router = express.Router()
   app.use('/api/v1', router)
   router.use('/diagnostic', diagnosticRouter)
   router.use('/plant', plantRouter)
}

module.exports = { routerApi }
