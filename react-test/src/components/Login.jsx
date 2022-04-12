import React from 'react'

function Login() {
  return (
    <div className='loginpage'>
        <div className="container">
            <h2>Sign-in</h2>
            <form>
                <input type="email" placeholder='E-mail'></input>
                <input type="password" placeholder='Password' />
                <div className="termsandcontions">
                <input type="checkbox" className='checkboxbtn'></input><h3>Keep me signed in</h3></div>
                <button className='registerbtn'><h3>Sign in</h3></button>
            </form>
        </div>
        
    </div>
  )
}

export default Login