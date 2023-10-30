const { Events } = require('pg')
const db = require('../database/connect')

class Event {
    constructor ({event_id, user_id, start_date, end_date, title, description, location, subject, priority}){
        this.event_id = event_id
        this.user_id = user_id
        this.start_date = start_date
        this.end_date = end_date
        this.title = title
        this.description = description
        this.location = location
        this.subject = subject
        this.priority = priority
    }

    static async getAll(userID){
        const response = await db.query("SELECT * FROM events WHERE user_id = $1", [userID])
        if (response.rows.length < 1){
            throw new Error ('Unable to find events')
        }
        return response.rows.map(event => new Event(event))
    }


    static async getOneById(eventID){
        const response = await db.query("SELECT * FROM events WHERE event_id = $1", [eventID])
        if (response.rows.length < 1){
            throw new Error ('Unable to find event')
        }
        return new Event(response.rows[0])
    }

    static async create(userID, event){
        const query = 'INSERT INTO events (user_id, start_date, end_date, title, description, location, subject, priority) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *'
        console.log(event, userID)
        const params = [userID, event.start_date, event.end_date, event.title, event.description, event.location, event.subject, event.priority ]
        const response = await db.query(query, params)

        if (response.rows.length != 1){
            throw new Error ('Unable to create event')
        }
        return new Event(response.rows[0])
    }
    
    async delete(){
        const query = 'DELETE FROM events WHERE event_id = $1 RETURNING *'
        const params = [this.event_id]

        const response = await db.query(query, params)
        console.log(response.rows)

        return new Event(response.rows[0])
    }



    static async deleteAll(userID, subjects){
        let events = []
        if(subjects.length == 0){
            console.log('no subjects')
            const query = 'DELETE FROM events WHERE user_id = $1 RETURNING *'
            const params = [userID]

            const response = await db.query(query, params)
            console.log(response.rows)

            if (response.rows.length < 1){
                throw new Error ('Unable to delete events')
                }
            response.rows.map(event => events.push(new Event(event)))

        }else{
            console.log('there are subjects')
            for(let i in subjects){
                console.log(subjects[i])
                const query = 'DELETE FROM events WHERE user_id = $1 AND subject=$2 RETURNING *'
                const params = [userID, subjects[i]]
                console.log(params)

                const response = await db.query(query, params)
    
                if (response.rows.length < 1){
                    throw new Error ('Unable to delete events')
                    }
                response.rows.map(event => events.push(new Event(event)))
            }
        }
        return events
    }


    async update(data){

        const query = 'UPDATE events SET start_date = $1, end_date = $2, title = $3, description = $4, location = $5, subject = $6, priority =$7 WHERE event_id = $8 RETURNING *'
        const params = [data.start_date, data.end_date, data.title, data.description, data.location, data.subject, data.priority, this.event_id]

        const response = await db.query(query, params)
    

        if (response.rows.length < 1){
            throw new Error ('Unable to edit event')
            }
        return (new Event(response.rows[0]))

    }

    async updateTime(data){

        const query = 'UPDATE events SET start_date = $1, end_date = $2 WHERE event_id =$3 RETURNING *'
        const params = [data.start_date, data.end_date, this.event_id]

        const response = await db.query(query, params)

        if (response.rows.length < 1){
            throw new Error ('Unable to edit event')
            }
        return (new Event(response.rows[0]))

    }

}

    





module.exports = Event