import { useEffect, useState } from "react";
import "./App.css";
import * as Pages from './pages'
import { useFetcher } from "react-router-dom";


function App() {

  const [token, setToken] = useState(localStorage.token)

  

  function handleLogout() {
    localStorage.removeItem('token');
    setToken(localStorage.token)
  };

  useEffect(()=>{console.log('logging')},[token])
  
  return (
    <>
      {console.log(token)}
      {!token ? <Pages.LoginPage setToken={setToken} /> : <Pages.TimetablePage handleLogout={handleLogout} /> }
      
    </>
    
  );
} 

export default App; 