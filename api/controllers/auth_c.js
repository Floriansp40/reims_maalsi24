/*** IMPORT */
const jwt = require('jsonwebtoken')
const DB = require('../db.config')

/*** CTRL FUNC */
exports.login = async (req, res) => {
    const { email, password } = req.body

    if(!email || !password){
        return res.status(400).json({message: "Missing data"})
    }

    try{
        let user = await DB.User.findOne({where: {email:email}, raw:true})
        if(user == null){
            return res.status(404).json({message: 'This user does not exist !'})
        }

        let test = await DB.User.checkPassword(password, user.password)
        if(!test){
            return res.status(401).json({message: 'Bad Credentials'})
        }

        const token = jwt.sign({
            id: user.id,            
        }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_DURING})
        return res.json({access_token: token})
    }catch(e){
        return res.status(500).json({message: 'Database Error'})
    }
}