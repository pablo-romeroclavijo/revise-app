
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
const todayArray = [today.getDate(), today.getMonth()]
const eventArray = [eventDate.getDate(), eventDate.getMonth()]
// console.log(eventArray[1] == todayArray[1] && eventArray[0] == todayArray[0])
// console.log(todayArray, eventArray)
// console.log(eventDate)


const time = {hour: eventDate.getHours(), minute :eventDate.getMinutes()}
console.log(time)



const verify = eventArray[1] == todayArray[1] && eventArray[0] == todayArray[0]
console.log(event)
const body = (
  <div className='event-card'>
  <div className="row">
    <h3>{time.hour}:{time.minute == 0 ? "00" : time.minute}</h3>
    <h3>{title}</h3>
  </div>
  <div className="row">
    <p>Subject: {subject}</p>
    <p>Priority: {!event["priority"] ? 'Standard': event["priority"]}</p>
  </div>
  <br></br>
</div>
)

return (
  <>
  {verify ? body : <></>}
  </>


)
}
export default EventCard