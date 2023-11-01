import React from "react"

['Maths', 'History', 'English', 'Science', 'Physics']

function FilterSubject({subjects, setSubjects}){

    function handleFilter(e){
        console.log(e.target.value)
        // if(value in subjects){
        //     subjects.filter(subject => )
        // }
        //setSubjects(e.target.value)
    }

    console.log(subjects)
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