import React from "react"


function FilterTheme({theme, setTheme}){

    function handleFilter(e){
        setTheme(e.target.value)
    }

    return ( 
        <div className="select">
            <h3>Customize yoy calendar:</h3>
            <label htmlFor='typeFilter'>Theme: </label>
            <select  onChange={handleFilter} id="typeFilter" defaultValue={theme}>
                <option value="default" className="type">Default</option>
                <option value="theme1" className="type">Theme 1</option>
                <option value="theme2" className="type">Theme 2</option>
                <option value="theme3" className="type">Theme 3</option>
                

            </select>
        </div> );
}

export default FilterTheme
