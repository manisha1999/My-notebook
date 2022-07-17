import React from "react";
import { NavLink ,useLocation ,useHistory } from "react-router-dom";


 

const Navbar = () => {
  // let navigate = useNavigate();
  console.log("entered navbar");
  

  let history = useHistory();
  const handleLogout = () =>{
    localStorage.removeItem('token');
    history.push("/login");
  }
  let location = useLocation();
  console.log("before",location.pathname)
  React.useEffect(() => {
    console.log("after",location.pathname)
  }, [location]);
  console.log("history",history)

  return (
    
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          < NavLink className="navbar-brand" to="/">
            Notebook
          </ NavLink>
          
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item" onClick={()=>{history.push("/")}} style={{color:"white"}}>
                {/* < NavLink className={`nav-link ${location.pathname==="/"?"active":""}`} aria-current="page" to="/">
                  Home
                </ NavLink> */}
                Home
              </li>
              <li className="nav-item " onClick={()=>{history.push("/about")}} style={{color:"white"}}>
                {/* < NavLink className={`nav-link ${location.pathname==="/about"?"active":""}`} to="/about">
                  About
                </ NavLink> */}
                About
              </li>
            </ul>
          {!localStorage.getItem('token')? <form className="d-flex" role="search">
              <NavLink NavLink   className="btn btn-primary mx-2" role="button" to="/login">Login</NavLink>
              <NavLink NavLink  className="btn btn-primary mx-2" role="button" to="/signup">Signup</NavLink>
            </form>:<button className="btn btn-primary" onClick={handleLogout}>Logout</button>}
          </div>
        </div>
        </nav>
    </div>
   
  );
};

export default Navbar;
