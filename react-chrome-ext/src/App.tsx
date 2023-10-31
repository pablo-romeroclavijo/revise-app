import "./App.css";
import * as Pages from './pages'


function App() {
  
  return (
    <>
      {console.log(localStorage.token)}
      {!localStorage.token ? <Pages.LoginPage /> : <Pages.TimetablePage /> }
      
    </>
    
  );
}

export default App; 