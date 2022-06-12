import React, { useState } from 'react'
import * as authService from "../Services/auth-service";

function Register() {

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [producer, setProducer] = useState('')

    const handleUsername = (e) => {
        setUsername(e.target.value);
    }

    const handlePassword = (e) => {
        setPassword(e.target.value);
    }
    const handleProducer = (e) => {
        setProducer(e.target.checked);
    }

    function handleSubmit(e) {
        let user = {
            name: username,
            password: password,
            roles: [
                {name: "USER"}
            ]
        }

        if (producer === true) {
            user.roles.push({name: "PRODUCER"})
        }

        e.preventDefault()
        authService.register(user).then(response => console.log(response))

    }

    return (
        <div className='registerpage'>
            <div className="container">
                <h2>Create your account</h2>
                <form>
                    <input value={username} onChange={handleUsername} id={"username"}
                           placeholder='Username'/>
                    <input value={password} onChange={handlePassword} id={"password"} type="password"
                           placeholder='Password'/>
                    <div className="producer">
                        <input value={producer} onChange={handleProducer} id={"producer"} type="checkbox"
                               className='checkboxbtn'/><h3>I am a producer</h3></div>
                    <button onClick={(e) => handleSubmit(e)} type="submit" className='registerbtn'><h3>Register</h3>
                    </button>
                </form>
            </div>

        </div>
    )
}

export default Register
