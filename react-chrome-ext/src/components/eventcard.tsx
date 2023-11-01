
import React, {ReactNode} from "react"

type EventProps = {
  event : any
}


const EventCard  : React.FunctionComponent<EventProps> = (props) => {

const{event} = props
console.log(typeof(event))

const {title, start_date, end_date, subject} = event



return (

<div className='event-card'>
  <h3>{title}</h3>
  <p>{subject}</p>
  <p>{start_date}</p>
  <p>{end_date}</p>

  <button>Completed</button>
  <br></br>
</div>
)
}
export default EventCard