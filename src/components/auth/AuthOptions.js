import React, { useContext } from 'react'
import UserContext from '../../context/UserContext'
import { useHistory, Link } from 'react-router-dom'
import { Navbar, Nav, NavDropdown } from 'react-bootstrap'

const AuthOptions = () => {

    const { userData, setUserData } = useContext(UserContext)

    const history = useHistory();
    const home = () => history.push("/")
    const register = () => history.push("/register")
    const login = () => history.push("/login")
    const profile = () => history.push('/profile')
    const newArticle = () => history.push('/new')
    const logout = () => {
        setUserData({
            token: undefined,
            user: undefined
        })

        localStorage.setItem('auth-token', "")
        history.push('/login')
    }

    return (
        <div>
            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">


                <Link to="/">
                    <Navbar.Brand className="ml-4">MERN Blog</Navbar.Brand>
                </Link>

                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="mr-auto">
                        <Nav.Link onClick={home}>Home</Nav.Link>
                    </Nav>

                    {userData.user ? (
                        <>
                            <Nav className="mr-2">
                                <Nav.Link onClick={newArticle}>New Article</Nav.Link>
                            </Nav>

                            <NavDropdown title={`Hi,  ${userData.user.name}`} className="mr-4" id="collasible-nav-dropdown">
                                <NavDropdown.Item onClick={profile}>Profile</NavDropdown.Item>
                                <NavDropdown.Item onClick={logout}>Logout</NavDropdown.Item>
                            </NavDropdown>
                        </>
                    ) : (

                            <Nav className="mr-5">
                                <Nav.Link onClick={register}>Register</Nav.Link>
                                <Nav.Link onClick={login}>Login</Nav.Link>
                            </Nav>
                        )}


                </Navbar.Collapse>
            </Navbar>
        </div>
    )
}

export default AuthOptions
