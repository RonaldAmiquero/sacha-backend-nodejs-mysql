const express = require('express')
const diagnosticRouter = require('../components/diagnostic/router')
const plantRouter = require('../components/plant/router')
const solutionRouter = require('../components/solution/router')

function routerApi(app) {
   const router = express.Router()
   app.use('/api/v1', router)
   router.use('/plant', plantRouter)
   router.use('/diagnostic', diagnosticRouter)
   router.use('/solution', solutionRouter)
}

module.exports = { routerApi }
