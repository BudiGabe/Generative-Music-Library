import React, { useState } from 'react'
import * as authService from "../Services/auth-service";

function Login() {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')


    const handleUsername = (e) => {
        setUsername(e.target.value);
    }

    const handlePassword = (e) => {
        setPassword(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault()
        let user = {
            name: username,
            password: password,
        }

        authService.login(user).then(jwt => {
            // console.log(jwt)
            // localStorage.setItem("jwt", response)
        })
    }

    return (
        <div className='loginpage'>
            <div className="container">
                <h2>Sign-in</h2>
                <form>
                    <input value={username} onChange={handleUsername} id={"username"} placeholder='Username'/>
                    <input value={password} onChange={handlePassword} id={"password"} type="password"
                           placeholder='Password'/>
                    <button onClick={(e) => handleSubmit(e)}
                            type="submit" className='registerbtn'><h3>Login</h3></button>
                </form>
            </div>
        </div>
    )
}

export default Login
