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
        })
        it("unsucessfull", async() => {
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
                .mockRejectedValue(new Error("Cannot create"))
           
            
            await userController.register(mockReq,mockRes)
            expect(bcrypt.genSalt).toHaveBeenCalledTimes(1)
            expect(bcrypt.hash).toHaveBeenCalledTimes(1)
            expect(User.create).toHaveBeenCalledTimes(1)
            expect(mockStatus).toHaveBeenCalledWith(400)
            expect(mockJson).toHaveBeenCalledWith({error: "Cannot create"})
        })
    })
    describe("loging",() => {
        it("sucussfull and pasword is valid", async() =>{
            const userTest = {
                username : "Mirnal", 
                password : "mirnal123", 
                email : "mgr@hotmail.com"
            }
            const testToken ={
                token_id : 1,
                token: "asqwer",
                user_id: 1
            }
            const mockReq = {
                body : userTest
            }
            jest.spyOn(User, "getOneByUsername")
                .mockResolvedValue(userTest)
            jest.spyOn(bcrypt, "compare")
                .mockResolvedValue(true)
            jest.spyOn(Token, "create")
                .mockResolvedValue(testToken)
            await userController.login(mockReq,mockRes)
            
            expect(User.getOneByUsername).toHaveBeenCalledTimes(1)
            expect(bcrypt.compare).toHaveBeenCalledTimes(1)
            expect(Token.create).toHaveBeenCalledTimes(1)
            expect(mockStatus).toHaveBeenCalledWith(200)
            expect(mockJson).toHaveBeenCalledWith({ authenticated: true, token: "asqwer" })
        })

        it("sucussfull and pasword is invalid", async() =>{
            const userTest = {
                username : "Mirnal", 
                password : "mirnal123", 
                email : "mgr@hotmail.com"
            }
           
            const mockReq = {
                body : userTest
            }
            jest.spyOn(User, "getOneByUsername")
                .mockResolvedValue(userTest)
            jest.spyOn(bcrypt, "compare")
                .mockResolvedValue(false)
        
            await userController.login(mockReq,mockRes)
            
            expect(User.getOneByUsername).toHaveBeenCalledTimes(1)
            expect(bcrypt.compare).toHaveBeenCalledTimes(1)
            expect(mockJson).toHaveBeenCalledWith({ error: "Incorrect credentials." })
        })
        it("unsucussfull or fail", async() =>{
            const userTest = {
                username : "Mirnal", 
                password : "mirnal123", 
                email : "mgr@hotmail.com"
            }
            const testToken ={
                token_id : 1,
                token: "asqwer",
                user_id: 1
            }
            const mockReq = {
                body : userTest
            }
            jest.spyOn(User, "getOneByUsername")
                .mockResolvedValue(userTest)
            jest.spyOn(bcrypt, "compare")
                .mockResolvedValue(true)
            jest.spyOn(Token, "create")
                .mockRejectedValue(new Error("Cannot get token"))
            await userController.login(mockReq,mockRes)
            
            expect(User.getOneByUsername).toHaveBeenCalledTimes(1)
            expect(bcrypt.compare).toHaveBeenCalledTimes(1)
            expect(Token.create).toHaveBeenCalledTimes(1)
            expect(mockStatus).toHaveBeenCalledWith(403)
            expect(mockJson).toHaveBeenCalledWith({ error: "Cannot get token"})
        })

    })
    describe("profile", () => {
        it("sucussfull" , async() => {
            testUser= {
                username: "username", 
                identity_verified: "identity_verified", 
                postcode: "postcode", 
                email: "email", 
                family_unit: "family_unit", 
                isAdmin:"isAdmin"
            }
            const mockReq = {
                headers: {
                    authorization: "asdfqwer"
                }
            }
            jest.spyOn(User, "getOneByToken")
                .mockResolvedValue(testUser)

            await userController.profile(mockReq,mockRes)
            expect(User.getOneByToken).toHaveBeenCalledTimes(1)
            expect(mockStatus).toHaveBeenCalledWith(200)
            

        })
        it("unSucussfull" , async() => {
            
            const mockReq = {
                headers: {
                    authorization: "asdfqwer"
                }
            }
            jest.spyOn(User, "getOneByToken")
                .mockRejectedValue(new Error("cannot get the profile"))

            await userController.profile(mockReq,mockRes)
            expect(User.getOneByToken).toHaveBeenCalledTimes(1)
            expect(mockStatus).toHaveBeenCalledWith(403)
            

        })
    })
    

} )