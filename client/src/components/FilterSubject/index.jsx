import React from "react"

function FilterSubject({subjects, setActive, activeSubjects}){

    function handleFilter(e){
        const value = e.target.value
        //console.log(value)
        
        if(!activeSubjects.find(subject => subject == value)){
            activeSubjects.push(value)
            //console.log('here3', activeSubjects)  
        }
        else{
            const index = activeSubjects.findIndex(subject => subject == value)
            activeSubjects.splice(index)
           // console.log('here', subjects)
        }
        setActive(activeSubjects)
        
    }
    //console.log(activeSubjects)
    return ( 
        <form onChange={handleFilter}>
            {subjects.map(subject => <>
                <label htmlFor={subject}>{subject}</label> 
                <input type='checkbox' value={subject} name={subject} defaultChecked />
                </>
             )}
        </form> );
}

export default FilterSubject