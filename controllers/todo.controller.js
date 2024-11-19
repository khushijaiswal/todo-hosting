const Todo = require("../models/Todo")

exports.Create = async (req, res) => {
    const { task, desc, priority, complete } = req.body
    await Todo.create({ ...req.body, userId: req.user })    // db mein entry padegi isse
    res.json({ message: " Todo create success " })
}
exports.Read = async (req, res) => {
    const { task, desc, priority, complete } = req.body
    const result = await Todo.find({ userId: req.user })
    res.json({ message: " Todo read success ", result })
}

exports.Update = async (req, res) => {
    const { kuchbhi } = req.params
    const updatedTodo = await Todo.findByIdAndUpdate(kuchbhi, req.body)
    res.json({ message: " Todo update success ", updatedTodo })
}

exports.Delete = async (req, res) => {
    const { kuchbhi } = req.params
    await Todo.findByIdAndDelete(kuchbhi, req.body)

    res.json({ message: " Todo delete success " })
}



