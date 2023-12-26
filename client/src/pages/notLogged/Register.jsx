import React, { useState }  from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import bobur from '../../data/bobr.png';
import config from '../../config/Config';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash, faHeart } from '@fortawesome/free-solid-svg-icons';

const Register = () => {

  const [eye, setEye] = useState(faEye);
  const [msg, setMsg] = useState({});
  const [error, setError] = useState(false)
  const [user, setUser] = useState({ 
    name: "",
    email: "",
    pass: "",
    pass_repeat: ""
  });

  const handleChange = (e) => {
    setUser(prev => ({...prev, [e.target.name]: e.target.value})); 
  };

  function passToggle() {
    let pass = document.getElementById("pass");
    let pass_repeat = document.getElementById("pass_repeat");

    if (pass.type === "password") {
      pass.type = "type"
      pass_repeat.type = "type"
      setEye(faEyeSlash)
    }

    else {
      pass.type = "password"
      pass_repeat.type = "password"
      setEye(faEye)
    }
  }

  const handleClick = async (e) => {
    e.preventDefault();

    if (!user.name) {
      return setError(true);
    }

    if (!user.email) {
      return setError(true);
    }

    if (!user.pass) {
      return setError(true);
    }
    
    if (!user.pass_repeat) {
      return setError(true);
    }
  
    try {
      const response = await axios.post(`${config.apiUrl}/register`, user, {
        headers: {
          'Content-Type': 'application/json'
        },
        withCredentials: true
      });
  
      if (response.data.message ) {
        setMsg(response.data);
      } 
    } catch (error) {
      console.log(error);
      alert(error);
    }
  };

  return (
    <div className="not-logged-holder">

      <div className="landing-container">
        <div className="landing-photo">
          <img src={bobur} alt="das" />
        </div>

        <form className="landing-form" onSubmit={handleClick}>
          <h1>Register Form</h1>
          <p>Create your account and learn</p>

          <div className="label-input">
            <label htmlFor="name" className={error && user.name.length <=0  ? 'label-error' : "label-classic"}>{error && user.name.length <=0 ? "Insert your name!" : "Nick"}</label>
            <input 
              type="text" 
              id="name" 
              name="name" 
              placeholder='Insert your name' 
              onChange={handleChange} 
              className={error && user.name.length <=0  ? 'input-error' : "input-classic"}
              />
          </div>

          <div className="label-input">
            <label htmlFor="email" className={error && user.email.length <=0  ? 'label-error' : "label-classic"}>{error && user.email.length <=0 ? "Insert your e-mail!" : "E-mail"}</label>
            <input 
              type="text" 
              id="email" 
              name="email" 
              placeholder='Insert your email' 
              onChange={handleChange} 
              className={error && user.email.length <=0  ? 'input-error' : "input-classic"}
              />
          </div>

          <div className="label-input">
            <label htmlFor="pass" className={error && user.pass.length <=0  ? 'label-error' : "label-classic"}>{error && user.pass.length <=0 ? "Insert your password!" : "Password"}</label>
            <input 
              type="password" 
                id="pass" 
                name="pass" 
                placeholder='******' 
                onChange={handleChange} 
                className={error && user.pass.length <=0  ? 'input-error' : "input-classic"}
                />
          </div>

          <div className="label-input">
            <label htmlFor="pass_repeat" className={error && user.pass_repeat.length <=0  ? 'label-error' : "label-classic"}>{error && user.pass_repeat.length <=0 ? "Repeat your password!" : "Repeat Password"}</label>
            <input 
              type="password" 
                id="pass_repeat" 
                name="pass_repeat" 
                placeholder='******' 
                onChange={handleChange} 
                className={error && user.pass_repeat.length <=0  ? 'input-error' : "input-classic"}
                />
            <FontAwesomeIcon onClick={passToggle} icon={eye}  className='label-input-eye'/>
          </div>
          
          {msg.message ? <h5 className='login-error'> {msg.message}</h5>: null }
          {msg.messageGreen ? <h5 className="login-success"> {msg.messageGreen} <FontAwesomeIcon  icon={faHeart} /></h5> : null }
          <button className='not-logged-button'>Login</button>
          <p style={{ marginTop: "10px" }}>Already have an account? <Link to="/index" style={{color: "#098be7"}}>Login here</Link></p>
        </form>
      </div>
    </div>
  )
}

export default Register;
