const eventController = require('../../../controllers/eventController')
const Event = require('../../../models/Events')
const User = require('../../../models/User')

const mockSend = jest.fn()
const mockJson = jest.fn()
const mockEnd= jest.fn()

const mockStatus = jest.fn(code => ({send : mockSend, json: mockJson, end: mockEnd}))
const mockRes = {status: mockStatus}

describe('eventController',() => {
    beforeEach(() => jest.clearAllMocks())

    afterAll(() => jest.resetAllMocks())

    describe('getAll',() => {
        let mockEvents, mockReq, mockUser
        beforeEach(() =>{
            mockEvents = [
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
               
            ],
            mockUser = { 
                user_id : 4
            }
            mockReq = {
                headers : {"authorization": "5f6d8c90-5536-4a4a-b952-26077f6893a6"},
            }
        })
        
         it("successfully gets events and displays the 200 status code", async () => {
           
            
            
             jest.spyOn(User, "getOneByToken")
                 .mockResolvedValue(mockUser);

             jest.spyOn(Event, "getAll")
                 .mockResolvedValue(mockEvents);
               
            
             await eventController.getAll(mockReq, mockRes);
            
             // Expectations
             expect(User.getOneByToken).toHaveBeenCalledTimes(1)
             expect(Event.getAll).toHaveBeenCalledTimes(1)
             expect(mockStatus).toHaveBeenCalledWith(200); // Should set status code to 200
             expect(mockSend).toHaveBeenCalledWith(mockEvents);
           });

        it("send error gets when it fails and 400 status error", async () => {
            
            jest.spyOn(User, "getOneByToken")
                 .mockResolvedValue(mockUser);
            jest.spyOn(Event, "getAll")
                .mockRejectedValue(new Error('Something happened to your api'));


            await eventController.getAll(mockReq, mockRes);
            // Expectations
            //expect(User.getOneById).toHaveBeenCalledTimes(1)
            //expect(Event.getAll).toHaveBeenCalledTimes(1)
            expect(mockStatus).toHaveBeenCalledWith(400); // Should set status code to 400
            expect(mockJson).toHaveBeenCalledWith({error:"Something happened to your api"});
          });
    })

    describe('getOneById', () => {
        let mockEvent, mockReq
        beforeEach(() => {
             mockEvent = 
                {
                    event_id: 1,
                    user_id: 1,
                    start_date: '2023-11-06 10:30:00',
                    end_date : '2023-11-06 11:00:00', 
                    title : 'Meeting',
                    description: 'Discuss project progress', 
                    location: 'Meeting Room 1', 
                    subject: 'Poject', 
                    priority: 'H'
                }; 
            mockReq = { params: { id: 1 } }
          })

        it("successfully gets one event and displays the 200 status code", async () => {
            
            jest.spyOn(Event, "getOneById")
                .mockResolvedValue(new Event(mockEvent));
            
            await eventController.getOneById(mockReq, mockRes);
      
            // Expectations
            expect(Event.getOneById).toHaveBeenCalledTimes(1)
            expect(mockStatus).toHaveBeenCalledWith(200); // Should set status code to 200
            expect(mockSend).toHaveBeenCalledWith(mockEvent);
          });

        it("send error gets when it fails and 400 status error", async () => {
            
            jest.spyOn(Event, "getOneById")
                .mockRejectedValue(new Error('Cannot find an Event'));

            await eventController.getOneById(mockReq, mockRes);
            // Expectations
            expect()
            expect(Event.getOneById).toHaveBeenCalledTimes(1)
            expect(mockStatus).toHaveBeenCalledWith(400); // Should set status code to 400
            expect(mockJson).toHaveBeenCalledWith({error:"Cannot find an Event"});
          });
    })
      
    describe('create', ()=> {
        beforeEach(() =>{
            mockNewEvent = [
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
            ],
            mockUser = { 
                user_id : 4
            }
            mockReq = {
                headers : {"authorization": "5f6d8c90-5536-4a4a-b952-26077f6893a6"},
            }
        })
        it('it returns a new event with a 201 status code', async () => {
      
            jest.spyOn(Event, 'create')
              .mockResolvedValue( new Event(mockNewEvent))
      
            await eventController.create(mockReq, mockRes)

            expect(Event.create).toHaveBeenCalledTimes(1)
            expect(mockStatus).toHaveBeenCalledWith(201)
            expect(mockSend).toHaveBeenCalledWith(new Event({ ...mockNewEvent }) )
        })
        it('it error code 400 and error when it create fails', async () => {
      
            jest.spyOn(Event, 'create')
              .mockRejectedValue( new Error("Cannot create a event"))
      
            await eventController.create(mockReq, mockRes)

            expect(Event.create).toHaveBeenCalledTimes(1)
            expect(mockStatus).toHaveBeenCalledWith(400)
            expect(mockJson).toHaveBeenCalledWith({error: "Cannot create a event"})
        })

        
    })
        
    describe('Destroy', ()=> {
        it('successfully delete an event and displays the 202 status code' , async () => {
            const testEvent = {
                event_id: 1,
                user_id: 4,
                start_date: '2023-iu11-06 10:30:00',
                end_date : '2023-11-06 11:00:00', 
                title : 'Meeting',
                description: 'Discuss project progress', 
                location: 'Meeting Room 1', 
                subject: 'Poject', 
                priority: 'H'
            }
            const mockReq = {
                params : {event_id: 1 }
            }
        jest.spyOn(Event, 'getOneById')
            .mockResolvedValue(new Event(testEvent))
    
        jest.spyOn(Event.prototype, 'delete')
            .mockResolvedValue(new Event(testEvent))
        
        const event = await eventController.destroy(mockReq,mockRes)
        
        expect(Event.getOneById).toHaveBeenCalledTimes(1)
        expect(Event.prototype.delete).toHaveBeenCalledTimes(1)
        expect(mockStatus).toHaveBeenCalledWith(202)
        expect(mockSend).toHaveBeenCalledWith(testEvent)
        })
        it('it send error code 400 and error when it destroy fail', async () => {
      
            jest.spyOn(Event, 'create')
              .mockRejectedValue( new Error("Cannot read properties of undefined (reading 'id')"))
      
            await eventController.destroy(mockReq, mockRes)

            
            expect(mockStatus).toHaveBeenCalledWith(400)
            expect(mockJson).toHaveBeenCalledWith({error: "Cannot read properties of undefined (reading 'id')"})
        })
    })
    
    describe('destroyAll', ()=>{
        beforeEach(() => {
            mockUser = { 
                user_id : 4
            }
            mockReq = {
                headers : {"authorization": "5f6d8c90-5536-4a4a-b952-26077f6893a6"},
            }
        })
        it('successfully delete all event of a user and displays the 200 status code' , async () => {
            const testEvent = [
                    {
                        event_id: 1,
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
                        event_id: 2,
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
                        event_id: 3,
                        user_id: 4,
                        start_date: '2023-iu11-06 10:30:00',
                        end_date : '2023-11-06 11:00:00', 
                        title : 'Meeting',
                        description: 'Discuss project progress', 
                        location: 'Meeting Room 1', 
                        subject: 'Poject', 
                        priority: 'H'
                    },
            ]
        
        jest.spyOn(Event, 'getOneById')
            .mockResolvedValue(testEvent)
    
        jest.spyOn(Event, 'deleteAll')
            .mockResolvedValue(testEvent)
        
        await eventController.destroyAll(mockReq,mockRes)
        
        expect(User.getOneByToken).toHaveBeenCalledTimes(1)
        expect(Event.deleteAll).toHaveBeenCalledTimes(1)
        expect(mockStatus).toHaveBeenCalledWith(202)
        expect(mockSend).toHaveBeenCalledWith(testEvent)
        })
        it("send error gets when it fails and 400 status error", async () => {
            
            jest.spyOn(User, "getOneByToken")
                 .mockResolvedValue(mockUser);
            jest.spyOn(Event, "deleteAll")
                .mockRejectedValue(new Error('Something happened to your api'));


            await eventController.destroyAll(mockReq, mockRes);
            // Expectations
            //expect(User.getOneById).toHaveBeenCalledTimes(1)
            //expect(Event.getAll).toHaveBeenCalledTimes(1)
            expect(mockStatus).toHaveBeenCalledWith(400); // Should set status code to 400
            expect(mockJson).toHaveBeenCalledWith({error:"Something happened to your api"});
          });
    })
    describe('update', ()=> {
       
        it("successfully update event and displays the 200 status code", async () => {
            const testEvent = {
                event_id: 3,
                user_id: 4,
                start_date: '2023-iu11-06 10:30:00',
                end_date : '2023-11-06 11:00:00', 
                title : 'Meeting',
                description: 'Discuss project progress', 
                location: 'Meeting Room 1', 
                subject: 'Poject', 
                priority: 'H'
            }
            const mockReq = {
                body: { 
                        event_id: 3,
                        start_date: '2023-iu11-06 10:30:00',
                        end_date : '2023-11-06 11:00:00', 
                        title : 'Project work',
                        description: 'Discuss project progress', 
                        location: 'Meeting Room 1', 
                        subject: 'Poject', 
                        priority: 'M'
                }
            }
            jest.spyOn(Event, "getOneById")
                 .mockResolvedValue(new Event(testEvent));

            jest.spyOn(Event.prototype, "update")
                .mockResolvedValue({...new Event(testEvent), 
                    start_date: '2023-iu11-06 10:30:00',
                    end_date : '2023-11-06 11:00:00', 
                    title : 'Project work',
                    description: 'Discuss project progress', 
                    location: 'Meeting Room 1', 
                    subject: 'Poject', 
                    priority: 'M'  
                });


            await eventController.update(mockReq, mockRes);
            // Expectations
            expect(Event.getOneById).toHaveBeenCalledTimes(1)
            expect(Event.prototype.update).toHaveBeenCalledTimes(1)
            expect(mockStatus).toHaveBeenCalledWith(200); // Should set status code to 400
            expect(mockSend).toHaveBeenCalledWith({...new Event(testEvent), 
                start_date: '2023-iu11-06 10:30:00',
                end_date : '2023-11-06 11:00:00', 
                title : 'Project work',
                description: 'Discuss project progress', 
                location: 'Meeting Room 1', 
                subject: 'Poject', 
                priority: 'M'  
            });
          });

          it("send error gets when it fails and 400 status error", async () => {
            const testEvent = {
                event_id: 3,
                user_id: 4,
                start_date: '2023-iu11-06 10:30:00',
                end_date : '2023-11-06 11:00:00', 
                title : 'Meeting',
                description: 'Discuss project progress', 
                location: 'Meeting Room 1', 
                subject: 'Poject', 
                priority: 'H'
            }
            const mockReq = {
                body: { 
                        event_id: 3,
                        start_date: '2023-iu11-06 10:30:00',
                        end_date : '2023-11-06 11:00:00', 
                        title : 'Project work',
                        description: 'Discuss project progress', 
                        location: 'Meeting Room 1', 
                        subject: 'Poject', 
                        priority: 'M'
                }
            }
            jest.spyOn(Event, "getOneById")
                 .mockResolvedValue(new Event(testEvent));
            jest.spyOn(Event.prototype, "update")
                .mockRejectedValue(new Error('Something happened to your api'));


            await eventController.update(mockReq, mockRes);
            // Expectations
            //expect(User.getOneById).toHaveBeenCalledTimes(1)
            //expect(Event.getAll).toHaveBeenCalledTimes(1)
            expect(mockStatus).toHaveBeenCalledWith(400); // Should set status code to 400
            expect(mockJson).toHaveBeenCalledWith({error:"Something happened to your api"});
          });
    })
    
    describe.skip('updateTime', ()=>{
        it("successfully delete all event of a user and displays the 200 status code", async () => {
            
            jest.spyOn(Event, "getOneById")
                 .mockResolvedValue(new Event(testEvent));
            jest.spyOn(Event.prototype, "update")
                .mockRejectedValue(new Error('Something happened to your api'));


            await eventController.update(mockReq, mockRes);
            // Expectations
            //expect(User.getOneById).toHaveBeenCalledTimes(1)
            //expect(Event.getAll).toHaveBeenCalledTimes(1)
            expect(mockStatus).toHaveBeenCalledWith(400); // Should set status code to 400
            expect(mockJson).toHaveBeenCalledWith({error:"Something happened to your api"});
          });
          it("send error gets when it fails and 400 status error", async () => {
            
            jest.spyOn(User, "getOneByToken")
                 .mockResolvedValue(mockUser);
            jest.spyOn(Event, "deleteAll")
                .mockRejectedValue(new Error('Something happened to your api'));


            await eventController.destroyAll(mockReq, mockRes);
            // Expectations
            //expect(User.getOneById).toHaveBeenCalledTimes(1)
            //expect(Event.getAll).toHaveBeenCalledTimes(1)
            expect(mockStatus).toHaveBeenCalledWith(400); // Should set status code to 400
            expect(mockJson).toHaveBeenCalledWith({error:"Something happened to your api"});
          });
    })

})
