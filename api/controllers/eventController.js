const Event = require('../models/Events')
const Link = require('../models/Link')
const User = require('../models/User')


async function getAll(req, res){      //body: {user_id: <user_id>}
    try {
        token = req.headers["authorization"]
        const user = await User.getOneByToken(token)


        const response = await Event.getAll(user.id)
        res.status(200).send(response)
    } catch (error) {
        res.status(400).json({'error': error.message})    
    }
}


async function getOneById(req, res){      //dynamic paramater :id (event)
    try {
        const eventID = req.params.id

        const response = await Event.getOneById(eventID)
        res.status(200).send(response)    
    } catch (error) {
        res.status(400).json({'error': error.message}) 
    }
}

async function create(req, res){      //body: {date_end, date_start, description,…}
    try {
        const event = req.body
        token = req.headers["authorization"]
        const user = await User.getOneByToken(token)
        

        const response = await Event.create(user.id, event)
        res.status(201).send(response)
    } catch (error) {
        res.status(400).json({'error': error.message})    
    }
}

async function destroy(req, res){        //dynamic paramater :id (event)
    try{
        const eventID = req.params.id
        const event = await Event.getOneById(eventID)
        const response =  await event.delete()
        console.log('response', response)
        res.status(202).send(response)

    }catch(error){
        res.status(400).json({'error': error.message}) 
    }
}

async function destroyAll(req, res){     //body: {subjects:[]}
    try{
        token = req.headers["authorization"]
        const user = await User.getOneByToken(token)

        const subjects = req.body.subjects

        const response = await Event.deleteAll(user.id, subjects)

        res.status(202).send(response)
    }catch(error){
        res.status(400).json({'error': error.message}) 
    }

}

async function update(req, res){
    try {
        const data = req.body
        const event = await Event.getOneById(data.event_id)

        const response = await event.update(data)
        res.status(200).send(response)
    } catch (error) {
        res.status(400).json({'error': error.message}) 
    }
}

async function updateTime(req, res){
    try {
        const data = req.body
        const event = await Event.getOneById(data.event_id)

        const response = await event.updateTime(data)
        res.status(200).send(response)
    } catch (error) {
        res.status(400).json({'error': error.message}) 
    }
}



module.exports = { getAll, getOneById, create, destroy, destroyAll, update, updateTime }



//eventRouter.get('/', eventController.getAll)
//eventRouter.get('/:id', eventController.getOneById)

//eventRouter.post('/', eventController.create)

//eventRouter.patch('/', eventController.update)
//eventRouter.patch('time/:id', eventController.updateTime)

// eventRouter.delete('/:id', eventController.destroy)
// eventRouter.delete('/', eventController.destroyAll)
