const linkController = require('../../../controllers/linkController')
const Link = require('../../../models/Link')
const User = require('../../../models/User')
const Event = require('../../../models/Events')

const mockSend = jest.fn()
const mockJson = jest.fn()
const mockEnd= jest.fn()

const mockStatus = jest.fn(code => ({send : mockSend, json: mockJson, end: mockEnd}))
const mockRes = {status: mockStatus}

describe('LinkController',() => {
    beforeEach(() => jest.clearAllMocks())

    afterAll(() => jest.resetAllMocks())

    describe('getURL', () => {

        it("return 200 status code and link when succuesfull", async() => {
            mockUser = {
                user_id : 4
            }
           const mockReq = {
                headers :{
                    authorization : " 5f6d8c90-5536-4a4a-b952-26077f6893a6"
                }
            }
            jest.spyOn(User, "getOneByToken")
                .mockResolvedValue(mockUser);
            jest.spyOn(Link, "getOneByUserID")
                .mockResolvedValue({
                    
                        link_id: 1, 
                        url: 'http://localhost:3000/link/h84faxb1gn2d', 
                        user_id: 4, 
                })
            await linkController.getURL(mockReq,mockRes)

            expect(User.getOneByToken).toHaveBeenCalledTimes(1)
            expect(Link.getOneByUserID).toHaveBeenCalledTimes(1)
            expect(mockStatus).toHaveBeenCalledWith(200)
            expect(mockSend).toHaveBeenCalledWith({
                link_id: 1, 
                url: 'http://localhost:3000/link/h84faxb1gn2d', 
                user_id: 4, })

        })

        it("return 400 status code  when error", async() => {
            mockUser = {
                user_id : 4
            }
           const mockReq = {
                headers :{
                    authorization : " 5f6d8c90-5536-4a4a-b952-26077f6893a6"
                }
            }
            jest.spyOn(User, "getOneByToken")
                .mockResolvedValue(mockUser);
            jest.spyOn(Link, "getOneByUserID")
                .mockRejectedValue( new Error("Unable to get the link"))

            await linkController.getURL(mockReq,mockRes)
            
            expect(User.getOneByToken).toHaveBeenCalledTimes(1)
            expect(Link.getOneByUserID).toHaveBeenCalledTimes(1)
            expect(mockStatus).toHaveBeenCalledWith(400)
            expect(mockJson).toHaveBeenCalledWith({error: "Unable to get the link"})
        })

    })

    describe('returnCalender', () => {
        it("return 200 status code  when sucessfull", async() => {
            const mockReq = {
                params : { code : 1}
            }
            jest.spyOn(Link, "getOneByCode")
                .mockResolvedValue({
                rows: [{
                link_id: 1, 
                url: 'http://localhost:3000/link/h84faxb1gn2d', 
                user_id: 4, }]
            });
            jest.spyOn(Event, "getAll")
                .mockResolvedValue(
                    [
                        {
                            user_id: 4,
                            start_date: '2023-iu11-06 10:30:00',
                            end_date : '2023-11-06 11:00:00', 
                            title : 'Meeting',
                            description: 'Discuss project progress', 
                            location: 'Meeting Room 1', 
                            subject: 'Poject', 
                            priority: 'H'
                        },
                       {
                            user_id: 4,
                            start_date: '2023-11-06 11:30:00',
                            end_date : '2023-11-06 12:00:00', 
                            title : 'Lecture',
                            description: 'Lecture for Seience', 
                            location: 'Room 1', 
                            subject: 'Science', 
                            priority: 'M'
                       },
                    ]
            )
            await linkController.returnCalendar(mockReq,mockRes)

            expect(Link.getOneByCode).toHaveBeenCalledTimes(1)
            expect(Event.getAll).toHaveBeenCalledTimes(1)
            expect(mockStatus).toHaveBeenCalledWith(200)
            expect(mockSend).toHaveBeenCalledWith([
                {
                    user_id: 4,
                    start_date: '2023-iu11-06 10:30:00',
                    end_date : '2023-11-06 11:00:00', 
                    title : 'Meeting',
                    description: 'Discuss project progress', 
                    location: 'Meeting Room 1', 
                    subject: 'Poject', 
                    priority: 'H'
                },
               {
                    user_id: 4,
                    start_date: '2023-11-06 11:30:00',
                    end_date : '2023-11-06 12:00:00', 
                    title : 'Lecture',
                    description: 'Lecture for Seience', 
                    location: 'Room 1', 
                    subject: 'Science', 
                    priority: 'M'
               },
            ])
        })

        it("return 400 status code when error", async() => {
          
           const mockReq = {
                params : { code : 1}
            }
            jest.spyOn(Link, "getOneByCode")
            .mockResolvedValue({
                rows: [{
                link_id: 1, 
                url: 'http://localhost:3000/link/h84faxb1gn2d', 
                user_id: 4, }]
            });
            jest.spyOn(Event, "getAll")
            .mockRejectedValue( new Error("Unable to get the link"))

            await linkController.returnCalendar(mockReq,mockRes)
            
            expect(Link.getOneByCode).toHaveBeenCalledTimes(1)
            expect(mockStatus).toHaveBeenCalledWith(400)
            expect(mockJson).toHaveBeenCalledWith({error: "Unable to get the link"})
        })
    })
      
    
})