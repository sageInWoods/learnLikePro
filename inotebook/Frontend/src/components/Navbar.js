import React, { useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
// import "./components/Landing-page/UserLogin.css";

const Navbar = () => {
  let location = useLocation();
  let navigate = useNavigate();
  // useEffect(() => {
  //   // Google Analytics
  //   console.log(location.pathname)
  // }, [location]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };
  const handleToggle=()=>{
    var checkbox=document.getElementById('switch');
    if(checkbox.checked){
      navigate("/login")
    }
    else{
      navigate("/signup")
    }
  }



  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark rounded-navbar">
        <div className="container-fluid">
          <Link className="circular-text" to="/">
            GhostWriter
          </Link>
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
              <li className="nav-item">
                <Link
                  className={`nav-link link-position ${
                    location.pathname === "/" ? "active" : ""
                  }`}
                  aria-current="page"
                  to="/"
                >
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className={`nav-link link-position ${
                    location.pathname === "/about" ? "active" : ""
                  }`}
                  to="/about"
                >
                  About
                </Link>
              </li>
            </ul>
            {!localStorage.getItem("token") ? (
              <form className="d-flex link-position " role="search">
                <input type="checkbox" id="switch" className="checkbox" onChange={handleToggle}/>
                <label htmlFor="switch" className="toggle">
                  <div className="place-inline">
                  <p className="login-font">Sign up</p>
                  <p className="login-font">Login</p>
                  </div>
                </label>
                {/* <label className="switch">
                  <input type="checkbox" />
                  <span className="slider round"></span>
                </label> */}
                
              </form>
            ) : (
              <button onClick={handleLogout} className="btn btn-primary ">
                Logout
              </button>
            )}
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
