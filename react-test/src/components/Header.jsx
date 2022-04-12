import React from 'react'
import {Link} from 'react-router-dom'

function Header() {
  return (
    <header>
        <h1><Link to ="/">Generative music library</Link></h1>
        <div className="headerelements">
            <h2><Link to ="/topsamples">Top Samples</Link></h2>
            <h2><Link to ="/login">Log-in</Link></h2>
            <h2><Link to ="/register">Register</Link></h2>
        </div>
    </header>
  )
}

export default Header