const jwt = require("jsonwebtoken");

const verifyAuth = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({ message: "No token provided" });
    }

    const token = authHeader.split(" ")[1]; 

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        if (err.name === "TokenExpiredError" || err.message === "jwt expired") {
          return res.status(401).json({ message: "Access token expired" });
        }
        return res.status(403).json({ message: "Invalid token" });
      }

      req.user = decoded; 
      next();
    });
  } catch (error) {
    console.error("Auth Middleware Error:", error.message);
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = verifyAuth;
