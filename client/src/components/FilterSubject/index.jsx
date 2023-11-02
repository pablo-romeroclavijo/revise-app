import React from "react"

function FilterSubject({subjects, setActive}){
    const form = document.getElementsByClassName('subjects')

    function handleFilter(e){
    
        let activeSubjects = []
        for(let i of form){
            console.log(i.checked)
            if(i.checked)
            activeSubjects.push(i["value"])
        }
        console.log(activeSubjects)
        setActive(activeSubjects)
       
        
    }
    //console.log(activeSubjects)
    return ( 
        
        <form onChange={handleFilter} id='subject-form'>
            {subjects.map(subject => <>
                <label htmlFor={subject}>{subject}</label> 
                <input type='checkbox' className='subjects' value={subject} name={subject} defaultChecked />
                </>
             )}
        </form> );
}

export default FilterSubject