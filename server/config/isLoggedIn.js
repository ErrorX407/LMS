import jwt from "jsonwebtoken";

export const isLoggedIn = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(" ")[1];
  
    if (!token) {
      return res.status(403).json({ Error: "You are not allowed to perform the following action" });
    }
  
    jwt.verify(token, process.env.JWT_SECRET_KEY, (err, user) => {
      if (err) {
        return res.status(403).json({ Error: "Invalid access token" });
      }
  
      req.user = user.id;
      next();
    })
  }