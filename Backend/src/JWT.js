const { sign, verify } = require('jsonwebtoken');

const createToken = (user) => {
    const accessToken = sign(
        { username: user.user, id: user._id },
        "jwtsecret(changethisafter)"
    );

    return accessToken;
};

const validateToken = (req, res, next) => {
    const accessToken = req.cookies["access-token"];
    console.log('Access Token:', accessToken); // Debugging line

    if (!accessToken){
        console.log('No access token found'); // Debugging line
         return res.status(400).json({error: "User not Authenticate4d"});
        }
    try {
        const validToken = verify(accessToken, "jwtsecret(changethisafter)");
        console.log('Valid Token:', validToken); // Debugging line
        if (validToken) {
            req.authenticated = true;
            return next();
        }
    } catch (error) {
        console.log('Token verification failed:', error); // Debugging line
        return res.status(400).json({error: error});
    }
}

module.exports = {createToken, validateToken};