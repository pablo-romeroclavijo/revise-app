const Token = require('../../../models/Token')
const db = require("../../../database/connect")



describe('constructor', ()=>{
  it('return an instance of Token', async ()=>{
      const data = {
          token_id: 1,
          token: 'af5fa85fa8sdffgba85v88a', 
          user_id: 5,}

      const newToken =  new Token(data)
      expect(newToken).toBeInstanceOf(Token)

  })

})
describe('create', ()=>{
    it('return an instance of Token', async ()=>{
        jest.spyOn(db, 'query')
        .mockResolvedValueOnce({
          rows: [{
            token_id: 1,
            token: 'af5fa85fa8sdffgba85v88a', 
            user_id: 5,}]
        })

        const newToken =  await Token.create(5)
        expect(newToken).toBeInstanceOf(Token)
        expect(newToken.token_id).toBe(1)
        expect(newToken.token).toBe("af5fa85fa8sdffgba85v88a")
        expect(newToken.user_id).toBe(5)

    })

})

describe('getOneByID', () => {
    it('resolves with user on successful', async () => {
      jest.spyOn(db, 'query')
        .mockResolvedValueOnce({
            rows: [{
                token_id: 1,
                token: 'af5fa85fa8sdffgba85v88a', 
                user_id: 5,}]
        })

      const newToken = await Token.getOneById(1)
      expect(newToken).toBeInstanceOf(Token)
      expect(newToken.token_id).toBe(1)
      expect(newToken.token).toBe("af5fa85fa8sdffgba85v88a")
      expect(newToken.user_id).toBe(5)
    })

    it('should throw an Error on db query error', async () => {
      jest.spyOn(db, 'query').mockRejectedValue(new Error('oh no'))

      jest.spyOn(db, 'query')
        .mockResolvedValueOnce({ rows: [] })

      try {
        await Token.getOneById()
      } catch (err) {
        expect(err).toBeDefined()
        expect(err.message).toBe("Unable to locate token.")
      }
    })
  })

  describe('getOneByToken', () => {
    it('resolves with token on successful', async () => {
      jest.spyOn(db, 'query')
        .mockResolvedValueOnce({
          rows: [{
            token_id: 1,
            token: 'af5fa85fa8sdffgba85v88a', 
            user_id: 5,}]
        })

        const newToken = await Token.getOneByToken('af5fa85fa8sdffgba85v88a')
        expect(newToken).toBeInstanceOf(Token)
        expect(newToken.token_id).toBe(1)
        expect(newToken.token).toBe("af5fa85fa8sdffgba85v88a")
        expect(newToken.user_id).toBe(5)
    })

    it('should throw an Error on db query error', async () => {
      jest.spyOn(db, 'query').mockRejectedValue(new Error('oh no'))

      jest.spyOn(db, 'query')
        .mockResolvedValueOnce({ rows: [] })

      try {
        await Token.getOneByToken()
      } catch (err) {
        expect(err).toBeDefined()
        expect(err.message).toBe("Unable to locate token.")
      }
    })
})

