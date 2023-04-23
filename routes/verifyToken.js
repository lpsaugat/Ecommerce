const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  console.log(authHeader);
  if (authHeader && authHeader.startsWith("Bearer")) {
    const token = authHeader.split(" ")[1];
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err) res.status(403).json("Token is not valid!");
      req.user = user;
      next();
    });
  } else {
    return res.status(401).json("You are not authenticated");
  }
};

const verifyTokenAndAuthorization = (req, res, next) => {
  verifyToken(req, res, () => {
    if (
      req.user.id === req.params.id ||
      req.user.user_type === "vendor" ||
      req.user.user_type === "super-admin"
    ) {
      next();
    } else {
      res.status(403).json("You are not allowed");
    }
  });
};

const verifyTokenAndAdmin = (req, res, next) => {
  verifyToken(req, res, () => {
    const roles = ["super-admin", "admin"];
    if (roles.includes(req.user.user_type)) {
      next();
    } else {
      res.status(403).json("You are not allowed");
    }
  });
};

module.exports = {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
};
