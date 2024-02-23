function errorHandlerMiddleware(err, req, res, next) {
  console.log(err);
  return res.status(500).json({msg: `Something went wrong: ${err.message}`});
}

module.exports = errorHandlerMiddleware;