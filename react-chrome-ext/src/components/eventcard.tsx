
import React, {ReactNode} from "react"


type EventProps = {
  event : any
}


const EventCard  : React.FunctionComponent<EventProps> = (props) => {

const{event} = props

const {title, start_date, end_date, subject} = event

const today = new Date()
const eventDate = new Date(event.start_date)
console.log('----------')
console.log(eventDate)
console.log(today)



const body = (
  <div className='event-card'>
  <div className="row">
    <h3>{title}</h3>
    <p>{subject}</p>
  </div>
  <p>{start_date}</p>
  <p>{end_date}</p>

  <button>Completed</button>
  <br></br>
</div>
)

return (body


)
}
export default EventCard