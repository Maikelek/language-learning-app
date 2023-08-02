import React, { useState }  from 'react';
import { Link } from 'react-router-dom';

import bobur from '../../data/bobr.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

const Index = () => {

  const [eye, setEye] = useState(faEye);

  function passToggle() {
    let pass = document.getElementById("pass");

    if (pass.type === "password") {
      pass.type = "type"
      setEye(faEyeSlash)
    }

    else {
      pass.type = "password"
      setEye(faEye)
    }

  }

  return (
    <div className="not-logged-holder">

      <div className="landing-container">
        <div className="landing-photo">
          <img src={bobur} alt="das" />
        </div>

        <form className="landing-form">
          <h1>Login Form</h1>
          <p>Welcome to language learning app</p>

          <div className="label-input">
            <label htmlFor="name">Name</label>
            <input type="text" id="name" placeholder='Insert your name' />
          </div>

          <div className="label-input">
            <label htmlFor="pass">Password</label>
            <input type="password" id="pass" placeholder='******' />
            <FontAwesomeIcon onClick={passToggle} icon={eye}  className='label-input-eye'/>
          </div>

          <button className='not-logged-button'>Login</button>
          <p style={{ marginTop: "10px" }}>You don't have an account? <Link to="/register" style={{color: "#098be7"}}>Register here</Link></p>
        </form>
      </div>
    </div>
  )
}

export default Index;
