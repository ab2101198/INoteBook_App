import './App.css';
import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import NoteState from './context/notes/NoteState' ;

import {
  Route,
  Routes
} from "react-router-dom";
import Alert from './components/Alert';
import Login from './components/Login';
import Signup from './components/Signup';
import { useState } from 'react';

const App = () => {

  const [alert, setalert] = useState(null) ;
  const showalert = (message, type)=>{
    setalert({
       msg : message,
       type : type
    })
    
    setTimeout(() => {
      setalert(null) ;
    }, 5000);
 }
  return (
     <NoteState>
      <Navbar/>
      <Alert alert={alert}/>
      <div className='container'>
      <Routes>
            <Route exact path="/about"       element={<About/>}/>
            <Route exact path="/"            element={<Home showalert={showalert}/>}/>
            <Route exact path="/login"       element={<Login showalert={showalert}/>}/>
            <Route exact path="/signup"      element={<Signup showalert={showalert}/>}/>
      </Routes>
      </div>
 
     </NoteState>
  );
}

export default App;
