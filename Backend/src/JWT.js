const { sign, verify } = require('jsonwebtoken');

const createToken = (user) => {
    const accessToken = sign(
        { username: user.user, id: user._id },
        "jwtsecret(changethisafter)"
    );

    return accessToken;
};

const validateToken = (req, res, next) => {
    const accessToken = req.cookies["access-token"]

    if (!accessToken)
         return res.status(400).json({error: "User not Authenticate4d"});

    try {
        const validToken = verify(accessToken, "jwtsecret(changethisafter)")

        if (validToken) {
            req.authenticated = true;
            return next();
        }
    } catch (error) {
        return res.status(400).json({error: error});
    }
}

module.exports = {createToken, validateToken};