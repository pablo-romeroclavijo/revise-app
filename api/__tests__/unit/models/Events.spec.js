const Event = require('../../../models/Events')
const db = require('../../../database/connect')

describe('Events',() => {
    beforeEach(() => jest.clearAllMocks())

    afterAll(() => jest.resetAllMocks())

    describe('getAll', () => {
        it("resolve with events on successful", async () => {
            const user_id = 1;
            jest.spyOn( db, "query").mockResolvedValueOnce({
                rows:[
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
                    },
                    {
                        event_id: 2,
                        user_id: 1,
                        start_date: '2023-11-06 10:30:00',
                        end_date : '2023-11-06 11:00:00', 
                        title : 'Meeting',
                        description: 'Discuss project progress', 
                        location: 'Meeting Room 1', 
                        subject: 'Poject', 
                        priority: 'H'
                    }
                ]
            });

            const response = await Event.getAll(user_id);
            expect(response).toHaveLength(2)
            expect(response[0]).toHaveProperty("event_id")
          });

          it("should thow and Error on db query error", async () => {
            
            jest.spyOn( db, "query").mockResolvedValueOnce({ rows:[] });

            try{
                await Event.getAll();

            }catch(err){
                expect(err).toBeDefined();
                expect(err.message).toBe("Unable to find events")
            }
          });
    
    })

    describe('getOneById', () => {
        it("should return one event ",  async() => {
            jest.spyOn(db, "query").mockResolvedValueOnce({
                rows:[
                    {
                    event_id: 2,
                    user_id: 1,
                    start_date: '2023-11-06 10:30:00',
                    end_date : '2023-11-06 11:00:00', 
                    title : 'Meeting',
                    description: 'Discuss project progress', 
                    location: 'Meeting Room 1', 
                    subject: 'Poject', 
                    priority: 'H'
                    },
                ]
            });
            const response = await Event.getOneById(2);
            console.log(response)
            expect(response).toHaveProperty("title");
            })

        it("throw error when no event is passed ",  async() => {
            jest.spyOn(db, "query").mockResolvedValueOnce({
                rows:[
                ]
            });
            
            try{
                const event = await Event.getOneById(1)

            }catch(err){
                expect(err).toBeDefined()
                expect(err.message).toBe("Unable to find event")
            }
        })
    })
      
    describe('create', ()=> {
        it("creates a new event and retruns it",  async() => {
            const newEventData = {
                    start_date: '2023-11-06 10:30:00',
                    end_date : '2023-11-06 11:00:00', 
                    title : 'Meeting',
                    description: 'Discuss project progress', 
                    location: 'Meeting Room 1', 
                    subject: 'Poject', 
                    priority: 'H'
            }
            jest.spyOn(db, "query").mockResolvedValueOnce({
                rows: [
                    {
                        event_id: 5,
                        user_id: 1,
                        ...newEventData,
                    },
                ],   
            })
            const response = await Event.create(1,newEventData)

            expect(response).toBeInstanceOf(Event);
            expect(response.event_id).toBe(5);
        });

        it("throw error when unsucessfull",  async() => {
            const newEventData = {
                start_date: '2023-11-06 10:30:00',
                end_date : '2023-11-06 11:00:00', 
                title : 'Meeting',
                description: 'Discuss project progress', 
                location: 'Meeting Room 1', 
                subject: 'Poject', 
                priority: 'H'
                
            }
            jest.spyOn(db, 'query').mockRejectedValue(new Error('oh no'))

            jest.spyOn(db, 'query')
              .mockResolvedValueOnce({ rows: [] })
      
            try{
                await Event.create(5, newEventData)
            }catch(err){
                expect(err).toBeDefined()
                expect(err.message).toBe("Unable to create event" )
            }
        })
    })

    describe('Delete', ()=> {
        it("delete one event when sucessfull",  async() => {
            const event = new Event({
                event_id: 2,
                user_id: 4,
                start_dat: '2023-11-06 10:30:00',
                end_date : '2023-11-06 11:00:00', 
                title : 'Meeting',
                description: 'Discuss project progress', 
                location: 'Meeting Room 1', 
                subject: 'Poject', 
                priority: 'H'
            })
        
            jest.spyOn(db, "query").mockResolvedValueOnce({
                rows: [{         
                    event_id: 2,
                    user_id: 4,
                    start_date: '2023-11-06 10:30:00',
                    end_date : '2023-11-06 11:00:00', 
                    title : 'Meeting',
                    description: 'Discuss project progress', 
                    location: 'Meeting Room 1', 
                    subject: 'Poject', 
                    priority: 'H'
                    }]
                });
              //not static so need an instance
              console.log(event)
              const deletedUser = await event.delete();
              expect(deletedUser).toBeInstanceOf(Event); // Check if it's an instance of the Skill class.
              //expect(deletedUser.user_id).toBe(2);
              
        })

        it("fail test",  async() => {
            jest.spyOn(db, 'query')
                .mockResolvedValueOnce({ rows: [{}, {}] })

            try {
                const event = new Event({ event_id: 2,
                    user_id: 4,
                    start_date: '2023-11-06 10:30:00',
                    end_date : '2023-11-06 11:00:00', 
                    title : 'Meeting',
                    description: 'Discuss project progress', 
                    location: 'Meeting Room 1', 
                    subject: 'Poject', 
                    priority: 'H' })
                await event.delete()
            } catch (err) {
                console.log(err)
                expect(err).toBeTruthy()
            }

        })
    })
    
    describe('destroyAll', ()=>{
        it("test",  () => {
            
            
        })

        it("fail test",  () => {
            

        })
    })
    
})