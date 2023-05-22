function errorHandlerMiddleware(err, req, res, next) {
  // Handle the error and send an appropriate response
  res.status(500).json({ error: "Internal Server Error" });
}

module.exports = errorHandlerMiddleware;
