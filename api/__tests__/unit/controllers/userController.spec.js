const userController = require("../../../controllers/userController")
const Token = require("../../../models/Token")
const User = require('../../../models/User')
const bcrypt = require("bcrypt")

const mockSend = jest.fn()
const mockJson = jest.fn()
const mockEnd= jest.fn()

const mockStatus = jest.fn(code => ({send : mockSend, json: mockJson, end: mockEnd}))
const mockRes = {status: mockStatus}

describe("UserController", () => {
    beforeEach(() => jest.clearAllMocks())

    afterAll(() => jest.resetAllMocks())

    describe("register",() => {
        
        it("sucessfull", async() => {
            const userTest = {
                username : "Mirnal", 
                password : "mirnal123", 
                email : "mgr@hotmail.com"
            }
            const hashedUser = {
                username : "Mirnal", 
                password : "$2b$10$GeiqA8k4nSbtRVRVCWdX9uKynzzNA4Zm4zHvaZ5qsJFbiSV/G.DSW", 
                email : "mgr@hotmail.com"
            }
            const mockReq= {
                body : userTest   
            }
            jest.spyOn(bcrypt, "genSalt")
                .mockResolvedValue("$2b$10$GeiqA8k4nSbtRVRVCWdX9u")
            jest.spyOn(bcrypt, "hash")
                .mockResolvedValue("$2b$10$GeiqA8k4nSbtRVRVCWdX9uKynzzNA4Zm4zHvaZ5qsJFbiSV/G.DSW")
            jest.spyOn(User, "create")
                .mockResolvedValue({
                    "authenticated": true,
                    "token": "af5fa85fa8sdffgba85v88a"
                })
            jest.spyOn(Token, "create")
                .mockResolvedValue({token_id: 1,
                    token: 'af5fa85fa8sdffgba85v88a', 
                    user_id: 5,})
            
            await userController.register(mockReq,mockRes)
            expect(bcrypt.genSalt).toHaveBeenCalledTimes(1)
            expect(bcrypt.hash).toHaveBeenCalledTimes(1)
            expect(User.create).toHaveBeenCalledTimes(1)
            expect(Token.create).toHaveBeenCalledTimes(1)
            expect(mockStatus).toHaveBeenCalledWith(200)
            expect(mockJson).toHaveBeenCalledWith({"authenticated": true,
            "token": "af5fa85fa8sdffgba85v88a"})
        } )


    })

} )