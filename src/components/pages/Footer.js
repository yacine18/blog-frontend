import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
    return (
        <footer className=" mt-5 mb-2 text-center">
                &copy; {new Date().getFullYear()} Copyright: <Link className="text-decoration-none" to="/"> MERN Blog </Link>
        </footer>
    )
}

export default Footer
