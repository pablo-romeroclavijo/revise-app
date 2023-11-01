const bcrypt = require('bcrypt');

const User = require('../models/User');
const Token = require('../models/Token');

async function register (req, res) {
    try {
        const data = req.body;
        console.log(data)

        // Generate a salt with a specific  cost
        const salt = await bcrypt.genSalt(parseInt(process.env.BCRYPT_SALT_ROUNDS));

        // Hash the password/ 
        console.log('a', data["password"], salt, typeof(data['password'])) 
        data["password"] = await bcrypt.hash(data["password"], salt);
        const result = await User.create(data);

        const token = await Token.create(result.id);
        res.status(200).json({ authenticated: true, token: token.token })

    } catch (err) {
        res.status(400).json({"error": err.message})
    }
};

async function login (req, res) { 
    const data = req.body;
    console.log(data)
    try {
        const user = await User.getOneByUsername(data.username); 
        console.log("User", user)
        console.log(data.password, user.password)
        const authenticated = await bcrypt.compare(data.password, user.password);
        console.log("Authenticated", authenticated)
        if (!authenticated) {
            throw new Error("Incorrect credentials.");
        } else {
            const token = await Token.create(user.id);
            console.log(token)
            res.status(200).json({ authenticated: true, token: token.token});
        }
        
    } catch (err) {
        res.status(403).json({"error": err.message})
    }
}

async function profile (req, res){
    const token = req.headers["authorization"];
    try {
        const user = await User.getOneByToken(token);
        console.log("User", user)
        const {username, identity_verified, postcode, email, family_unit, isAdmin} = user
        res.status(200).json({username: username, identity_verified: identity_verified, postcode: postcode, email: email, family_unit: family_unit, isAdmin:isAdmin});
        
    } catch (err) {
        res.status(403).json({"error": err.message})
    }
}
 
module.exports = { 
    register, login, profile
}                           
