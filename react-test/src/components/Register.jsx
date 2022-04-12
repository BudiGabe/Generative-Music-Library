import React from 'react'

function Register() {
  return (
    <div className='registerpage'>
        <div className="container">
            <h2>Create your account</h2>
            <form>
                <input placeholder='Username'></input>
                <input type="email" placeholder='E-mail'></input>
                <input type="password" placeholder='Password' />
                <div className="termsandcontions">
                <input type="checkbox" className='checkboxbtn'></input><h3>I agree to the terms and conditions</h3></div>
                <button className='registerbtn'><h3>Register</h3></button>
            </form>
        </div>
        
    </div>
  )
}

export default Register