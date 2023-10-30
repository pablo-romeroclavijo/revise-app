const Event = require('../models/Events')
const Link = require('../models/Link')


async function getAll(req, res){      //body: {user_id: <user_id>}
    try {
        const data = req.body
        const userID = data.user_id

        const response = await Event.getAll(userID)
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

async function create(req, res){      //body: {user_id: <user_id>, event: {date_end, date_start, description,…}}
    try {
        const data = req.body
        const userID = data.user_id
        const event = data.event

        const response = await Event.create(userID, event)
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
        res.status(204).send(response)

    }catch(error){
        res.status(404).json({'error': error.message}) 
    }
}

async function destroyAll(req, res){     //body: {user_id: <user_id>, subject:[]}
    try{
        const userID = req.body.user_id
        const subjects = req.body.subjects
        const response = await Event.deleteAll(userID, subjects)

        res.status(204).send(response)
    }catch(error){
        res.status(404).json({'error': error.message}) 
    }

}


module.exports = { getAll, getOneById, create, destroy, destroyAll }



//eventRouter.get('/', eventController.getAll)
//eventRouter.get('/:id', eventController.getOneById)

//eventRouter.post('/', eventController.create)

//eventRouter.patch('/:id', eventController.update)
//eventRouter.patch('time/:id', eventController.updateTime)

// eventRouter.delete('/:id', eventController.destroy)
// eventRouter.delete('/', eventController.destroyAll)
