const User = require('../../../models/User')
const db = require("../../../database/connect")



describe('constructor', ()=>{
  it('return an instance of User', async ()=>{
      const data = {
          user_id: 1,
          username: 'pablo', 
          password: 'pablo123', 
          email: 'pablo123@gamil.com'}

      const newUser =  new User(data)
      expect(newUser).toBeInstanceOf(User)
      expect(newUser.id).toBe(1)
      expect(newUser.username).toBe('pablo')
      expect(newUser.password).toBe('pablo123')
      expect(newUser.email).toBe("pablo123@gamil.com")

  })

})
describe('create', ()=>{
    it('return an instance of User', async ()=>{
        jest.spyOn(db, 'query')
        .mockResolvedValueOnce({
          rows: [{
            user_id: 1, 
            username: 'pablo', 
            password: 'pablo123', 
            email: 'pablo123@gamil.com'}]
        })

        const data = {
            username: 'pablo', 
            password: 'pablo123', 
            email: 'pablo123@gamil.com'}

        const newUser =  await User.create(data)
    
        expect(newUser).toBeInstanceOf(User)
        expect(newUser.id).toBe(1)
        expect(newUser.username).toBe('pablo')
        expect(newUser.password).toBe('pablo123')
        expect(newUser.email).toBe("pablo123@gamil.com")

    })

})

describe('getOneByID', () => {
    it('resolves with user on successful', async () => {
      jest.spyOn(db, 'query')
        .mockResolvedValueOnce({
          rows: [{
            user_id: 1, 
            username: 'pablo', 
            password: 'pablo123', 
            email: 'pablo123@gamil.com'}]
        })

      const user = await User.getOneById(1)
      expect(user).toBeInstanceOf(User)
      expect(user.id).toBe(1)
      expect(user.username).toBe('pablo')
      expect(user.password).toBe('pablo123')
      expect(user.email).toBe("pablo123@gamil.com")
      
    })

    it('should throw an Error on db query error', async () => {
      jest.spyOn(db, 'query').mockRejectedValue(new Error('oh no'))

      jest.spyOn(db, 'query')
        .mockResolvedValueOnce({ rows: [] })

      try {
        await User.getOneById()
      } catch (err) {
        expect(err).toBeDefined()
        expect(err.message).toBe("Unable to locate user.")
      }
    })
  })

  describe('getOneByUsername', () => {
    it('resolves with user on successful', async () => {
      jest.spyOn(db, 'query')
        .mockResolvedValueOnce({
          rows: [{
            user_id: 1, 
            username: 'pablo', 
            password: 'pablo123', 
            email: 'pablo123@gamil.com'}]
        })

      const user = await User.getOneByUsername('pablo')
      expect(user).toBeInstanceOf(User)
      expect(user.id).toBe(1)
      expect(user.username).toBe('pablo')
      expect(user.password).toBe('pablo123')
      expect(user.email).toBe("pablo123@gamil.com")
    })

    it('should throw an Error on db query error', async () => {
      jest.spyOn(db, 'query').mockRejectedValue(new Error('oh no'))

      jest.spyOn(db, 'query')
        .mockResolvedValueOnce({ rows: [] })

      try {
        await User.getOneByUsername()
      } catch (err) {
        expect(err).toBeDefined()
        expect(err.message).toBe("Unable to locate user.")
      }
    })
})

describe('getOneByToken', () => {
    it('resolves with token on successful', async () => {
      jest.spyOn(db, 'query')
        .mockResolvedValueOnce({
          rows: [{
            token_id: 1, 
            user_id: 1, 
            token: '5f6d8c90-5536-4a4a-b952-26077f6893a6', 
           }]
        })

        jest.spyOn(User, 'getOneById')
        .mockResolvedValueOnce({
          rows: [{
            user_id: 1, 
            username: 'pablo', 
            password: 'pablo123', 
            email: 'pablo123@gamil.com'}]
        })


      const user = await User.getOneByToken('5f6d8c90-5536-4a4a-b952-26077f6893a6')
      expect(user.rows[0].user_id).toBe(1)
    })

    it('should throw an Error on db query error', async () => {
      jest.spyOn(db, 'query').mockRejectedValue(new Error('oh no'))

      jest.spyOn(db, 'query')
        .mockResolvedValueOnce({ rows: [] })

      try {
        await User.getOneByToken()
      } catch (err) {
        expect(err).toBeDefined()
        expect(err.message).toBe("Unable to locate user.")
      }
    })
})
