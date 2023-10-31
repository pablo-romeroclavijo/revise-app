const apiUrl = "https://revise-app.onrender.com"

async function fetchEvents(){
  const options  = {
    method: "GET",
    headers : {
      "Authorization": localStorage.token,
      "Accept": 'application/json',
      "Content-Type": "application/json"
    }
  }
  const response = await fetch(apiUrl +'/event', options)
  const data = await response.json()
  if(response.status == 200){
    setEvents(data)
  }else{
    alert('Unable to fetch events')
  }
}

async function fetchEventByID(id){
  const response = await fetch(apiUrl +'/event/' + id)
  const data = await response.json()
  if(response.status == 200){
    setEvents(data)
  }else{
    alert('Unable to fetch events')
  }
}


async function postEvent(data){    // data = {date_end, date_start, description,…}
  const options  = {
    method: "POST",
    headers : {
      "Authorization": localStorage.token,
      "Accept": 'application/json',
      "Content-Type": "application/json"
    },
    body: data
  }
  const response = await fetch(apiUrl +'/event', options)
  const newData = await response.json()
  if(response.status == 201){
      
  }else{
    alert('Unable to post events')
  }
}

async function deleteEvent(id){
  const options  = {
    method: "DELETE",
    headers : {
      "Accept": 'application/json',
      "Content-Type": "application/json"
    }
  }

  const response = await fetch(apiUrl +'/event/' + id, options)
  const data = await response.json()
  if(response.status == 202){
    
  }else{
    alert('Unable to delete events')
  }
}

async function deleteAll(subjects){    //subjects = ['history', 'maths'] OR subjects = []
  const options  = {
    method: "DELETE",
    headers : {
      "Authorization": localStorage.token,
      "Accept": 'application/json',
      "Content-Type": "application/json"
    },
    body: subjects
  }

  const response = await fetch(apiUrl +'/event/', options)
  const data = await response.json()
  if(response.status == 202){
    
  }else{
    alert('Unable to delete events')
  }
}

async function update(event){    //event = {event_id, date_end, date_start, description,…}
  const options  = {
    method: "PATCH",
    headers : {
      "Accept": 'application/json',
      "Content-Type": "application/json"
    },
    body: event
  }

  const response = await fetch(apiUrl +'/event/', options)
  const data = await response.json()
  if(response.status == 200){
    
  }else{
    alert('Unable to delete events')
  }
}

async function updateTime(event){    //event = {event_id, end_date, start_date}
  const options  = {
    method: "PATCH",
    headers : {
      "Accept": 'application/json',
      "Content-Type": "application/json"
    },
    body: event
  }

  const response = await fetch(apiUrl +'/event/time', options)
  const data = await response.json()
  if(response.status == 200){
    
  }else{
    alert('Unable to delete events')
  }
}




async function getShareLink(){    
  const options  = {
    method: "GET",
    headers : {
      "Authorization": localStorage.token,
      "Accept": 'application/json',
      "Content-Type": "application/json"
    }
  }

  const response = await fetch(apiUrl +'/link', options)
  const data = await response.json()
  if(response.status == 200){
    //return a api custom link
    
  }else{
    alert('Unable to delete events')
  }
}

async function getSharedEvents(url){
  const response = fetch(url)
  const data = await response.json()
  if(response.status == 200){
    //returns array of events identical to getAll
    
  }else{
    alert('Unable to fetch shared events')
  }

}
module.exports={fetchEvents, fetchEventByID, postEvent, deleteEvent, deleteAll, update, updateTime, getShareLink, getSharedEvents}
