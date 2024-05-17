const { Router } = require("express");
const bcrypt = require("bcryptjs");
const User = require("../models/User");
const jwt = require("jsonwebtoken");

const router = Router();

const {SECRET} = process.env;

router.post("/signup", async (req, res) => {
  try {
    req.body.password = await bcrypt.hash(req.body.password, 10);

    const user = await User.create(req.body);
    res.json(user);
  } catch (error) {
    res.status(400).json(error.message);
  }
});

router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    if (!user) {
      throw new Error("User doesn't exist");
    }

    const result = await bcrypt.compare(req.body.password, user.password);

    if(!result){
        throw new Error("Password doesn't match");
    }

    const token = await jwt.sign({ username: user.username }, SECRET);
    res.json({ token });
  } catch (error) {
    let errorMsg = error.message || "Unexpected error";
    res.status(400).json(errorMsg);
  }
});

module.exports = router;
