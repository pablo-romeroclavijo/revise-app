import React from "react"

function FilterSubject({subjects, setActive}){
    const form = document.getElementsByClassName('subjects')

    function handleFilter(e){
    
        let activeSubjects = []
        for(let i of form){
            //console.log(i.checked)
            if(i.checked)
            activeSubjects.push(i["value"])
        }
        //console.log(activeSubjects)
        setActive(activeSubjects)
       
        
    }
    //console.log(activeSubjects)
    return ( 
        
        <form onChange={handleFilter} id='subject-form'>
            <h3>Filter by subject:</h3>
            <ul>
            {subjects.map(subject => <li>
                <input type='checkbox' className='subjects' value={subject} name={subject} defaultChecked />
                <label htmlFor={subject}>{subject}</label> 
                </li>
             )}
             </ul>
        </form> );
}

export default FilterSubject