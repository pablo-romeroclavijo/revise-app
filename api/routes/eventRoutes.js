const { Router } = require('express')

const eventController = require('../controllers/eventController')
const eventRouter = Router()


eventRouter.get('/', eventController.getAll)
eventRouter.get('/:id', eventController.getOneById)

eventRouter.post('/', eventController.create)

eventRouter.patch('/', eventController.update)
eventRouter.patch('/time', eventController.updateTime)

eventRouter.delete('/:id', eventController.destroy)
eventRouter.delete('/', eventController.destroyAll)

module.exports = eventRouter