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

    // describe('getAll',() => {
    //     let mockEvents, mockReq, mockUser
    //     beforeEach(() =>{
    //         mockEvents = [
    //             {
    //                 user_id: 1,
    //                 start_date: '2023-iu11-06 10:30:00',
    //                 end_date : '2023-11-06 11:00:00', 
    //                 title : 'Meeting',
    //                 description: 'Discuss project progress', 
    //                 location: 'Meeting Room 1', 
    //                 subject: 'Poject', 
    //                 priority: 'H'
    //             },
    //            {
    //                 user_id: 1,
    //                 start_date: '2023-11-06 11:30:00',
    //                 end_date : '2023-11-06 12:00:00', 
    //                 title : 'Lecture',
    //                 description: 'Lecture for Seience', 
    //                 location: 'Room 1', 
    //                 subject: 'Science', 
    //                 priority: 'M'
    //            },
               
    //         ],
    //         mockUser = { user_id : 1}
    //         mockReq = {
    //             Headers : [ "authorization"],
    //         }
    //     })
        
    //     it("successfully gets events and displays the 200 status code", async () => {
           
            
            
    //         jest.spyOn(User, "getOneByToken")
    //             .mockResolvedValue(mockUser);

    //         jest.spyOn(Event, "getAll")
    //             .mockResolvedValue(mockEvents);
               
            
    //         await eventController.getAll(mockReq, mockRes);
            
    //         // Expectations
    //         expect(User.getOneByToken).toHaveBeenCalledTimes(1)
    //         expect(Event.getAll).toHaveBeenCalledTimes(1)
    //         expect(mockStatus).toHaveBeenCalledWith(200); // Should set status code to 200
    //         expect(mockSend).toHaveBeenCalledWith(mockEvents);
    //       });

    //     it("send error gets when it fails and 400 status error", async () => {
            
    //         jest.spyOn(Event, "getAll")
    //             .mockRejectedValue(new Error('Something happened to your api'));

    //             const req = { body : {
    //                 user_id: 1,
    //             }};

    //         await eventController.getAll(req, mockRes);
    //         // Expectations
    //         expect(Event.getAll).toHaveBeenCalledTimes(1)
    //         expect(mockStatus).toHaveBeenCalledWith(400); // Should set status code to 400
    //         expect(mockJson).toHaveBeenCalledWith({error:"Something happened to your api"});
    //       });
    // })

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
            expect(Event.getOneById).toHaveBeenCalledTimes(1)
            expect(mockStatus).toHaveBeenCalledWith(400); // Should set status code to 400
            expect(mockJson).toHaveBeenCalledWith({error:"Cannot find an Event"});
          });
    })
      
    // describe('create', ()=> {
    //     let mockNewEvent, mockReq
    //     beforeEach(() => {
    //          mockNewEvent = 
    //             {
    //                 user_id: 1,
    //                 start_date: '2023-11-06 10:30:00',
    //                 end_date : '2023-11-06 11:00:00', 
    //                 title : 'Meeting',
    //                 description: 'Discuss project progress', 
    //                 location: 'Meeting Room 1', 
    //                 subject: 'Poject', 
    //                 priority: 'H'
    //             }; 
    //         mockReq = { body: mockNewEvent }
    //       })
    //     test('it returns a new event with a 201 status code', async () => {
      
    //         jest.spyOn(Event, 'create')
    //           .mockResolvedValue( new Event(mockNewEvent))
      
    //         await eventController.create(mockReq, mockRes)
    //         expect(Event.create).toHaveBeenCalledTimes(1)
    //         expect(mockStatus).toHaveBeenCalledWith(201)
    //         expect(mockSend).toHaveBeenCalledWith(new Event({ ...mockNewEvent }) )
    //       })
    // })

    describe('Destroy', ()=> {

    })
    
    describe('destroyAll', ()=>{

    })
})