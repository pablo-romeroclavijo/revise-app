const { Events } = require('pg')
const db = require('../database/connect')

class Event {
    constructor ({event_id, user_id, start_date, end_date, title, description, location, subject, priority}){
        this.eventID = event_id
        this.userID = user_id
        this.startDate = start_date
        this.endDate = end_date
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
        const params = [userID, event.date_start, event.date_end, event.title, event.description, event.location, event.subject, event.priority ]
        const response = await db.query(query, params)

        if (response.rows.length != 1){
            throw new Error ('Unable to create event')
        }
        return new Event(response.rows[0])
    }
    
    async delete(){
        const query = 'DELETE FROM events WHERE event_id = $1'
        const params = [this.eventID]

        const response = await db.query(query, params)

        if (response.rows.length != 1){
            throw new Error ('Unable to create event')
        }
        return new Event(response.rows[0])
    }



    static async deleteAll(userID, subjects){
        let events = []
        if(!subjects){
            const query = 'DELETE FROM events WHERE user_id = $1'
            const params = [userID]

            const response = await db.query(query, params)

            if (response.rows.length < 1){
                throw new Error ('Unable to delete events')
                }
            response.rows.map(event => events.push(new Event(event)))

        }else{
            for(i in subjects){
                const query = 'DELETE FROM events WHERE user_id = $1 AND subject=$2'
                const params = [userID, subjects[i]]

                const response = await db.query(query, params)

                if (response.rows.length != 1){
                    throw new Error ('Unable to delete events')
                    }
                response.rows.map(event => events.push(new Event(event)))
            }
        }
        return events
    }


}

    





module.exports = Event