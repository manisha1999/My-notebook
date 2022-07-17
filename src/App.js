import "./App.css";
import Navbar from "./components/Navbar";
import { Home } from "./components/Home";
import { About } from "./components/About";
import NoteState from "./context/notes/NoteState";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Alert from "./components/Alert";
import React, { useState } from 'react';
import Login from './components/Login';
import Signup from "./components/Signup";

function App() {
  const [alert, setAlert] = useState(null);

  const showAlert = (message, type)=>{
      setAlert({
        msg: message,
        type: type
      })
      setTimeout(() => {
          setAlert(null);
      }, 1500);
  }
  return (
    <div className="home">
      <NoteState>
        <Router>
          <Navbar />
          <Alert alert={alert}/>
          <div className="container" >
          <Switch>
            <Route exact path="/" component={Home} >
              <Home showAlert={showAlert}/>
            </Route>
            <Route exact path="/about" component={About}>
              <About/>
            </Route>
            <Route exact path="/login" element={<Login  />} >
              <Login showAlert={showAlert}/>
            </Route>
            <Route exact path="/signup" element={<Signup />} >
              <Signup showAlert={showAlert}/>
            </Route>
              
          </Switch>
          </div>
        </Router>
      </NoteState>
    </div>
  );
}

export default App;
