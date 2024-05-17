const { Router } = require("express");
const { isLoggedIn } = require("./middleware");
const Todo = require("../models/Todo");

const router = Router();

router.get("/", isLoggedIn, async (req, res) => {
  try {
    const { username } = req.user;
    const todos = await Todo.find({ username });
    res.json(todos);
  } catch (error) {
    res.status(400).json(error);
  }
});
router.get("/:id", isLoggedIn, async (req, res) => {
  try {
    const { username } = req.user;
    const _id = req.params.id;
    const todos = await Todo.find({ username, _id });
    res.json({ todos });
  } catch (error) {
    res.status(400).json(error);
  }
});
router.post("/", isLoggedIn, async (req, res) => {
  try {
    const { username } = req.user;
    req.body.username = username;
    //create new todo and send it in response
    const todo = await Todo.create(req.body);
    res.json({ todo });
  } catch (error) {
    res.status(400).json(error);
  }
});
router.put("/:id", isLoggedIn, async (req, res) => {
  try {
    const { username } = req.user;
    req.body.username = username;
    const _id = req.params.id;
    const todo = await Todo.updateOne({ username, _id }, req.body, {
      new: true,
    });
    res.json({ todo });
  } catch (error) {
    res.status(400).json({ error });
  }
});
router.delete("/:id", isLoggedIn, async (req, res) => {
  try {
    const { username } = req.user;
    const _id = req.params.id;
    await Todo.remove({ username, _id });
    res.json({ _id });
  } catch (error) {
    res.status(400).json({ error });
  }
});
module.exports = router;
