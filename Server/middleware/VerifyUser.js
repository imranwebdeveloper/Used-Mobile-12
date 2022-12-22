const jwt = require("jsonwebtoken");

const verifyUser = (req, res, next) => {
  const authToken = req.headers.authorization;

  const token = authToken.split(" ")[1];
  if (!token) {
    return res.status(401).json({
      status: false,
      message: "No token provided",
    });
  }
  jwt.verify(token, process.env.JWT_SECRET, function (err, decoded) {
    if (err) {
      return res.status(401).json({ status: false, message: err.message });
    }
    req.decoded = decoded;
    next();
  });
};

module.exports = { verifyUser };
