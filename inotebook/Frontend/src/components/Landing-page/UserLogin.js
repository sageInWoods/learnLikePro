import React from "react";
import "../Landing-page/UserLogin.css";
const UserLogin = () => {
  return (<>
    <div className="login-container">
      <div className="form-container sign-up">
        <form>
          <h1>Create Account</h1>
          <span>Register Yourself</span>
          <input type="text" placeholder="Name" />
          <input type="email" placeholder="username" />
          <input type="password" placeholder="Password" />                                                                                                        
          <input type="text" placeholder="Gender" />
          {/* date of birth should not be more than todays's date */}
          <input type="text" placeholder="DOB" />
          {/* address filed is optional  */}
          <input type="text" placeholder="Address" />
          <button>Sign Up</button>
        </form>
      </div>
      
    </div>
  </>
  );
};

export default UserLogin;
