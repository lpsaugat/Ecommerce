const jwt = require("jsonwebtoken");

const verifyTokenOrNon = (req, res, next) => {
  if (req.cookies["Token"]) {
    const authHeader = req.cookies["Token"];
    if (authHeader) {
      const token = authHeader;
      jwt.verify(token.value, process.env.JWT_SECRET, (err, user) => {
        if (err) res.status(403).json("Token is not validd!");
        req.user = user;
        next();
      });
    } else {
      return res.status(401).json("You are not authenticated");
    }
  } else {
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith("Bearer")) {
      const token = authHeader.split(" ")[1];
      jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) res.status(403).json("Token is not valid!");
        req.user = user;
        next();
      });
    } else {
      next();
    }
  }
};

const verifyToken = (req, res, next) => {
  if (req.cookies["Token"]) {
    const authHeader = req.cookies["Token"];
    if (authHeader) {
      const token = authHeader;
      jwt.verify(token.value, process.env.JWT_SECRET, (err, user) => {
        if (err) res.status(403).json("Token is not validd!");
        req.user = user;
        next();
      });
    } else {
      return res.status(401).json("You are not authenticated");
    }
  } else {
    const authHeader = req.headers.authorization;
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
  }
};

const verifyTokenAndAuthorization = (req, res, next) => {
  // console.log(req.user);
  verifyToken(req, res, () => {
    if (
      req.user.user_type === "vendor" ||
      req.user.user_type === "super-admin"
    ) {
      if (req.user) {
        res.locals.global_user_type = req.user.user_type;
      } else {
        res.locals.global_user_type = "guest"; // Default user type
      }
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
      if (req.user && req.user.user_type) {
        res.locals.global_user_type = req.user.user_type;
      } else {
        res.locals.global_user_type = "guest"; // Default user type
      }
      next();
    } else {
      res.status(403).json("You are not allowed");
    }
  });
};

module.exports = {
  verifyTokenOrNon,

  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
};
