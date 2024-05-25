const jwt = require('jsonwebtoken');

const authenticated = (req, res, next) => {
    console.log(req.headers)
    let token = req.headers.authorization;
    if (token) {
        token = token.replace('Bearer ', '').trim();
        try {
            const user = jwt.verify(token, 'loginKey')
            if(user) {
                next();
            }
        } catch (err) {
            res.json({
                error: 'invalid token'
            })
        }
    } else {
        res.json({error: 'token does not exist'})
    }
}
module.exports = {
    authenticated
}