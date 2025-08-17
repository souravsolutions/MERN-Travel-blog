import React from 'react'
import { Link } from 'react-router-dom'

function Front() {
  return (
    <div>
        <Link to="/login">
        <button>Login</button>
        </Link>
    </div>
  )
}

export default Front