import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Signup = (props) => {
  let [credentials, setCredentials] = useState({
    name:"",
    email: "",
    password: "",
    cpassword: ""
  });

  const host = "http://localhost:5000";

  let navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();

    const {name,email,password,cpassword}=credentials;
    if(password!==cpassword){
      alert("y")
    }

    const response = await fetch(`${host}/api/auth/createUsers`, {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        password
        // cpassword: credentials.cpassword,
      }), // body data type must match "Content-Type" header
    });
    const json = await response.json();
    console.log(json);
    if (json.success) {
      localStorage.setItem("token", json.authtoken);
      navigate("/");
      props.showAlert("successfully created your account ","success")

    } else {
      props.showAlert("invslid credentials","danger")
    }
  };
  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
        <label htmlFor="name" className="form-label">
           Name
          </label>
          <input
            type="name"
            className="form-control"
            value={credentials.name}
            id="name"
            onChange={onChange}
            name="name"
            aria-describedby="name"
          />
          <label htmlFor="email" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            value={credentials.email}
            id="email"
            onChange={onChange}
            name="email"
            aria-describedby="emailHelp"
          />
          <div id="emailHelp" className="form-text">
            We'll never share your email with anyone else.
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            value={credentials.password}
            id="password"
            onChange={onChange}
            name="password"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="cpassword" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            value={credentials.cpassword}
            id="cpassword"
            onChange={onChange}
            name="cpassword"
          />
        </div>
        <div id="emailHelp" className="form-text">
            Passwords Must be an exact match
          </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Signup;
