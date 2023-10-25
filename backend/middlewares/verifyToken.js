const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
    const authHeader = req?.headers?.authorization || req?.headers?.Authorization;
    if (!authHeader?.startsWith("Bearer ")) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    const accessToken = authHeader.split(" ")[1];

    jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
        if (err) {
            return res.status(403).json({ message: "Forbidden" });
        }

        req.id = decoded.id;
        req.username = decoded.username;

        next();
    });
};

module.exports = verifyToken;