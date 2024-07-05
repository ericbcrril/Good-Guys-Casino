const { sign, verify, decode } = require('jsonwebtoken');

const createToken = (user) => {
    const accessToken = sign(
        {
            user
        },
        process.env.ACCESS_TOKEN_SECRET
    );
    console.log(accessToken)
    return accessToken;
};

const validateToken = (req, res, next) => {
    const accessToken = req.cookies['access-token'];
    console.log('si esta pasando por aqui', accessToken); // Debugging line

    if (!accessToken) {
        console.log('No access token found'); // Debugging line
        return res.status(400).json({ error: "User not Authenticate4d" });
    }
    verify(accessToken, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) {
            return res.sendStatus(403);
        }
        req.user = user;
        next();
    });
};

module.exports = { createToken, validateToken };