/*** IMPORT */
const jwt = require('jsonwebtoken')

/*** EXTRACT */
/* istanbul ignore next */
const extractBearer = authorization => {
    if(typeof authorization !== 'string'){
        return false
    }

    const matches = authorization.match(/(bearer)\s+(\S+)/i)
    return matches && matches[2]
}

/*** CHECK */
/* istanbul ignore next */
const checkToken = (req, res, next) => {
    const token = req.headers.authorization && extractBearer(req.headers.authorization)

    if(!token){
        return res.status(401).json({message: "Commentaire"})
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
        if(err){
            return res.status(401).json({message: "Gros gros commentaire"})
        }
    })

    next()
}

// Commentaire
module.exports = checkToken