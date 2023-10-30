const eventController = require('../../../controllers/eventController')
const Events = require('../../../models/Events')

const mockSend = jest.fn()
const mockJson = jest.fn()
const mockEnd= jest.fn()

const mockStatus = jest.fn(code => ({send : mockSend, json: mockJson, end: mockEnd}))
const mockRes = {status: mockStatus}

describe('eventController',() => {
    describe('getAll',() => {

    
    })

    describe('getOneById', () => {

    })
      
    describe('create', ()=> {

    })

    describe('Destroy', ()=> {

    })
    
    describe('destroyAll', ()=>{

    })
})