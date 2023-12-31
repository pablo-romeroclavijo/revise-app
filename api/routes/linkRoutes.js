const { Router } = require('express')

const linkController = require('../controllers/linkController')
const linkRouter = Router()


linkRouter.get('/', linkController.getURL)
linkRouter.get('/:code', linkController.returnCalendar)

module.exports = linkRouter