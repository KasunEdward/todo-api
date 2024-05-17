require("dotenv").config(); // loading env variables
const jwt = require("jsonwebtoken");

const isLoggedIn = async (req, res, next) => {
  try {
    if (!req.headers.authorization) {
      throw new Error("No authorization header");
    }
    const token = req.headers.authorization.split(" ")[1];
    if(!token){
        throw new Error('malformed auth header');
    }
    const payload = await jwt.verify(token, process.env.SECRET);

    if(!token){
        throw new Error("token verification failed");
    }
    req.user = payload;
    next();
  } catch (error) {
    let errorMsg = error.message||"unexpected error";
    res.status(400).json({error: errorMsg})
  }
};

module.exports = {
    isLoggedIn,
  };
