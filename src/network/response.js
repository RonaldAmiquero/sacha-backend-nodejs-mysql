const { StatusCodes, getReasonPhrase } = require('http-status-codes')

function success(
   req,
   res,
   data,
   status = StatusCodes.OK,
   message = getReasonPhrase(status)
) {
   res.status(status).send({
      error: false,
      status: status,
      message: message,
      body: data
   })
}

function error(
   req,
   res,
   error,
   status = StatusCodes.INTERNAL_SERVER_ERROR,
   message = getReasonPhrase(StatusCodes.INTERNAL_SERVER_ERROR)
) {
   console.error(`Error: ${error}`)
   res.status(status).send({
      error: true,
      status: status,
      message: message,
      body: ''
   })
}

module.exports = { success, error }
