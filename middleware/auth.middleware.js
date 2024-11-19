
const jwt = require('jsonwebtoken')
exports.userProtected = async (req, res, next) => {
    const token = req.cookies.auth
    if (!token) {
        return res.status(401).json({ message: "no cookie found" })
    }

    jwt.verify(token, process.env.JWT_KEY, (error, decode) => {  // decode mein ye value aari => { name: result.name, _id: result._id }  auth controller se
        if (error) {
            console.log(error);

            return res.status(401).json({ message: "invalid token" })
        }
        req.user = decode._id
        next()
    })
}
