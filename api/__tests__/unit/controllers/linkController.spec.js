const linkController = require('../../../controllers/linkController')
const Link = require('../../../models/Link')

const mockSend = jest.fn()
const mockJson = jest.fn()
const mockEnd= jest.fn()

const mockStatus = jest.fn(code => ({send : mockSend, json: mockJson, end: mockEnd}))
const mockRes = {status: mockStatus}

describe('LinkController',() => {
    describe('',() => {

    
    })

    describe('', () => {

    })
      
    describe('', ()=> {

    })

    describe('', ()=> {

    })
    
    describe('', ()=>{

    })
    
})