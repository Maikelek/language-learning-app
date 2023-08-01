import React from 'react';
import bobur from '../../data/bobr.png';
import { Link } from 'react-router-dom';

const Register = () => {
  return (
    <div className="not-logged-holder">

      <div className="landing-container">
        <div className="landing-photo">
          <img src={bobur} alt="das" />
        </div>

        <form className="landing-form">
          <h1>Register Form</h1>
          <p>Create your account and learn</p>

          <div className="label-input">
            <label htmlFor="name">Name</label>
            <input type="text" id="name" placeholder='Insert your name' />
          </div>

          <div className="label-input">
            <label htmlFor="email">Email</label>
            <input type="text" id="email" placeholder='Insert your email' />
          </div>

          <div className="label-input">
            <label htmlFor="pass">Password</label>
            <input type="password" id="pass" placeholder='******' />
          </div>

          <div className="label-input">
            <label htmlFor="pass_repeat">Repeat Password</label>
            <input type="password" id="pass_repeat" placeholder='******' />
          </div>

          <button className='not-logged-button'>Login</button>
          <p style={{ marginTop: "10px" }}>Already have an account? <Link to="/index" style={{color: "#098be7"}}>Login here</Link></p>
        </form>
      </div>
    </div>
  )
}

export default Register;
