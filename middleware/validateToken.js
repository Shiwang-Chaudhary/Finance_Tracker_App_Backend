const jwt = require("jsonwebtoken");

const validateToken = (req,res,next)=>{
    const authHeader = req.headers.authorization || req.headers.Authorization
    if (!authHeader && !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ message: "❌ No token provided" });
    }
    const token = authHeader.split(" ")[1];

    try {
        const decoded = jwt.verify(token,process.env.JWT_SECRET);
        req.user = decoded;
        console.log("✅ Token is valid:", decoded);
        next();
    } catch (error) {
        console.error("❌ Invalid or expired token:", error.message);
        return res.status(401).json({ message: "❌ Token invalid or expired" });
    }
}
module.exports = validateToken;