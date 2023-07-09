const jwt = require('jsonwebtoken');

const isAuthorized = (req, res, next) => {
    const token = req.headers.authorization

    if (!token) {
        return res.status(403).send({message: "You are not allowed to perform this action"})
    }

    const decoded = jwt.verify(token, process.env.SECRET_KEY)
    req.user = decoded
    next()
}

module.exports = { isAuthorized };