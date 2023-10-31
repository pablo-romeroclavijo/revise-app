
const Link = require('../models/Link')
const User = require('../models/User')
const Event = require('../models/Events')

async function getURL(req, res){
    try{
        token = req.headers["authorization"]
        const user = await User.getOneByToken(token)

        const link = await Link.getOneByUserID(user.id)
        res.status(200).send(link)
    }catch(error){
        res.status(400).json({'error': error.message})    
    }
}

async function returnCalendar(req, res){
    try {
        const code = req.params.code
        const response = await Link.getOneByCode(code)
        
        const userID = response.userID
        const events = await Event.getAll(userID)
        res.status(200).send(events)

    } catch (error) {
        res.status(400).json({'error': error.message})  
    }

}

module.exports = {getURL, returnCalendar}