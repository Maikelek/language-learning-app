import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

import bobur from '../../data/bobr.png';
import config from '../../config/Config';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash, faHeart } from '@fortawesome/free-solid-svg-icons';

const Index = () => {
  const nav = useNavigate();
  const [eye, setEye] = useState(faEye);
  const [msg, setMsg] = useState({});
  const [error, setError] = useState(false);
  const [user, setUser] = useState({
    email: '',
    pass: '',
  });

  const handleChange = (e) => {
    setUser((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const passToggle = () => {
    let pass = document.getElementById('pass');

    if (pass.type === 'password') {
      pass.type = 'text';
      setEye(faEyeSlash);
    } else {
      pass.type = 'password';
      setEye(faEye);
    }
  };

  const handleClick = async (e) => {
    e.preventDefault();

    if (!user.email || !user.pass) {
      setError(true);
      return;
    }

    try {
      const response = await axios.post(`${config.apiUrl}/auth`, user, {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      });

      if (response.data.message === 'ok') {
        nav('/Decks');
      } else {
        setMsg(response.data);
      }
    } catch (error) {
      console.error(error);
      alert('An error occurred. Please try again.');
    }
  };

  return (
    <div className="not-logged-holder">
      <div className="landing-container">
        <div className="landing-photo">
          <img src={bobur} alt="das" />
        </div>

        <form className="landing-form" onSubmit={handleClick}>
          <h1>Login Form</h1>
          <p>Welcome to the language learning app</p>

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

            <FontAwesomeIcon onClick={passToggle} icon={eye} className='label-input-eye'/>
          </div>

          {msg.message ? <h5 className='login-error'> {msg.message}</h5>: null }
          {msg.messageGreen ? <h5 className="login-success"> {msg.messageGreen} <FontAwesomeIcon  icon={faHeart} /></h5> : null }
          <button className='not-logged-button' type="submit">Login</button>
          <p style={{ marginTop: "10px" }}>Don't have an account? <Link to="/register" style={{color: "#098be7"}}>Register here</Link></p>
        </form>
      </div>
    </div>
  )
}

export default Index;
