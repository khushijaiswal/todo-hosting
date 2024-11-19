const jwt = require("jsonwebtoken")
const User = require("../models/User")
const bcyrpt = require('bcryptjs')

exports.register = async (req, res) => {
    const { email, password } = req.body
    const result = await User.findOne({ email })
    if (result) {
        return res.status(409).json({ message: "Email already regitered,please login or register with new email. Thank You!" })
    }
    const hashPassword = await bcyrpt.hash(password, 10)
    await User.create({ ...req.body, password: hashPassword })
    res.json({ message: "register success" })
}
exports.login = async (req, res) => {
    const { email, password } = req.body
    const result = await User.findOne({ email })
    if (!result) {
        return res.status(401).json({ Message: 'Email not found, please register. Thank you!' })
    }
    const verify = await bcyrpt.compare(password, result.password)
    if (!verify) {
        return res.status(401).json({ message: "password do not match" })
    }
    const token = jwt.sign({ name: result.name, _id: result._id }, process.env.JWT_KEY)
    // console.log(token)
    res.cookie('auth', token, { maxAge: 1000 * 60 * 60 })
    res.json({ message: "Login success", result: { _id: result._id, name: result.name, email: result.email } })
}
exports.logout = async (req, res) => {
    res.clearCookie('auth')
    res.json({ message: "Logout success" })
}