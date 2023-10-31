const Link = require('../../../models/Link')
const db = require('../../../database/connect')
const {expect} = require ('@jest/globals')

describe('makeid return a random code',() => {
    it('resolves code succesfuly', () => {
        const code = Link.makeid(20)
        expect(code).toBeDefined()
        expect(code).toHaveLength(20)
    })
})
describe('generate', ()=>{
    it('return an instance of Link', async ()=>{
        jest.spyOn(db, 'query')
        .mockResolvedValueOnce({
          rows: [{
            link_id: 1, 
            url: 'http://localhost:3000/link/h84faxb1gn2d', 
            user_id: 4, }]
        })

        const newLink =  await Link.generate(5)
    
        expect(newLink).toBeInstanceOf(Link)
        expect(newLink.linkID).toBe(1)
        expect(newLink.userID).toBe(4)
        expect(newLink.url).toBe('http://localhost:3000/link/h84faxb1gn2d')
    })

    it('should throw an Error on db query error', async () => {
        jest.spyOn(db, 'query').mockRejectedValue(new Error('oh no'))
  
        jest.spyOn(db, 'query')
          .mockResolvedValueOnce({ rows: [] })
  
        try {
          await Link.generate(5)
        } catch (err) {
          expect(err).toBeDefined()
          expect(err.message).toBe("Unable to create link")
        }
      })

    })

describe('getOneByCode', () => {
    it('resolves with code on successful', async () => {
        jest.spyOn(db, 'query')
        .mockResolvedValueOnce({
            rows: [{
                link_id: 1, 
                url: 'http://localhost:3000/link/h84faxb1gn2d', 
                user_id: 4, }]
        })

        const newLink =  await Link.getOneByCode(5)
        expect(newLink).toBeInstanceOf(Link)
        expect(newLink.linkID).toBe(1)
        expect(newLink.userID).toBe(4)
        expect(newLink.url).toBe('http://localhost:3000/link/h84faxb1gn2d')
    })

    it('should throw an Error on db query error', async () => {
        jest.spyOn(db, 'query').mockRejectedValue(new Error('oh no'))
  
        jest.spyOn(db, 'query')
          .mockResolvedValueOnce({ rows: [] })
  
        try {
          await Link.getOneByCode(5)
        } catch (err) {
          expect(err).toBeDefined()
          expect(err.message).toBe("Unable to locate shared calendar")
        }
      })
})

describe('getOneByUserID', () => {
    it('resolves with userID on successful', async () => {
        jest.spyOn(db, 'query')
        .mockResolvedValueOnce({
            rows: [{
                link_id: 1, 
                url: 'http://localhost:3000/link/h84faxb1gn2d', 
                user_id: 4, }]
        })

        const newLink =  await Link.getOneByUserID(5)
        expect(newLink).toBeInstanceOf(Link)
        expect(newLink.linkID).toBe(1)
        expect(newLink.userID).toBe(4)
        expect(newLink.url).toBe('http://localhost:3000/link/h84faxb1gn2d')
    })

    it('Generates a new link if not found', async () => {

        mockLink = new Link({
            link_id: 1, 
            url: 'http://localhost:3000/link/h84faxb1gn2d', 
            user_id: 4 })

        jest.spyOn(db, 'query')
          .mockResolvedValueOnce({ rows: [] })

        jest.spyOn(Link, 'generate')
            .mockResolvedValueOnce(mockLink)
    
  
        const newLink =  await Link.getOneByUserID(5)
        expect(newLink).toBeInstanceOf(Link)
        expect(newLink.linkID).toBe(1)
        expect(newLink.userID).toBe(4)
        expect(newLink.url).toBe('http://localhost:3000/link/h84faxb1gn2d')
  

      })
})