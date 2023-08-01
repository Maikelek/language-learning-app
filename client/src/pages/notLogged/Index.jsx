import React from 'react';
import bobur from '../../data/bobr.png';
import { Link } from 'react-router-dom';

const Index = () => {
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
          </div>

          <button className='not-logged-button'>Login</button>
          <p style={{ marginTop: "10px" }}>You don't have an account? <Link to="/register" style={{color: "#098be7"}}>Register here</Link></p>
        </form>
      </div>
    </div>
  )
}

export default Index;
