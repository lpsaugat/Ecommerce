// userTypeMiddleware.js
module.exports = function (req, res, next) {
  if (req.user && req.user.user_type) {
    res.locals.global_user_type = req.user.user_type;
  } else {
    res.locals.global_user_type = "guest"; // Default user type
  }
  next();
};
