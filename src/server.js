const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const config = require('./config/configGlobal')
const { routerApi } = require('./network/routerApi')

const app = express()

/*settings*/
app.set('port', config.port)

/*middlewares*/
app.use(morgan('dev'))
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

/*routes*/
routerApi(app)

/* starting the server */
app.listen(app.get('port'), () => {
   console.log(`Server on port: ${config.host}:${app.get('port')}`)
})
