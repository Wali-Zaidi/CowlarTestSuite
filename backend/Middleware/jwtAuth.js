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

const isAuthorizedWithRefresh = (req, res, next) => {
    const token = req.headers.authorization;

    if (!token) {
        return res.status(403).send({ message: "You are not allowed to perform this action" });
    }

    const accessToken = token;

    try {

        const decoded = jwt.verify(accessToken, process.env.SECRET_KEY);
        req.user = decoded;
        next();
    } catch (accessTokenError) {

        if (accessTokenError.name === "TokenExpiredError") {
            const refreshToken = req.cookies.refreshToken; 

            if (!refreshToken) {
                return res.status(403).send({ message: "Refresh token not provided" });
            }

            try {
                const decodedRefreshToken = jwt.verify(refreshToken, process.env.SECRET_KEY);
                req.user = decodedRefreshToken;
                next();
            } 
            catch (refreshTokenError) {
                return res.status(403).send({ message: "Invalid refresh token" });
            }
        } 
        else {
            return res.status(403).send({ message: "Invalid access token" });
        }
    }
};


module.exports = { isAuthorized, isAuthorizedWithRefresh };