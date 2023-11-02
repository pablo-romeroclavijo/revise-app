import React from "react"


function FilterTheme({theme, setTheme}){

    function handleFilter(e){
        setTheme(e.target.value)
    }

    return ( 
        <div className="select">
            <h3>Customize your calendar:</h3>
            <label htmlFor='typeFilter'>Theme: </label>
            <select  onChange={handleFilter} id="typeFilter" defaultValue={theme}>
                <option value="theme1" className="type">Default</option>
                <option value="theme2" className="type">Peach</option>
                <option value="theme3" className="type">Jester</option>
                <option value="theme4" className="type">Smoke</option>
                <option value="theme5" className="type">Butter</option>

            </select>
        </div> );
}

export default FilterTheme
