import React, { useState, useContext } from 'react'
import { useHistory, Link } from 'react-router-dom'
import UserContext from '../../context/UserContext'
import { Form, Button, Col } from 'react-bootstrap'
import ErrorsAlert from '../errors/ErrorsAlert'
import axios from 'axios'


const Register = () => {

    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const [name, setName] = useState()
    const [error, setError] = useState()

    const {setUserData} = useContext(UserContext)
    const history = useHistory()

    const submit = async (e) => {
        e.preventDefault()

        try{

           const newUser = { email,password,name }
           await axios.post('https://blog-application-api.herokuapp.com/api/users/register',newUser)
           const loginRes = await axios.post('https://blog-application-api.herokuapp.com/api/users/login',{
               email,
               password
           })

        setUserData({
            token: loginRes.data.token,
            user: loginRes.data.user
        })

        localStorage.setItem('auth-token', loginRes.data.token)
        history.push('/')

        }catch(err){
           err.response.data.msg && setError(err.response.data.msg)
        }
    }

    return (
        <div>
            <h2 className="text-center mt-5 mb-4">Create Account</h2>
            
            {error && (
                <ErrorsAlert message={error} clearError={ ()=>setError(undefined) } />
            )}

            <Form className=" container col-sm-4 mt-4" onSubmit={submit} >
                <Form.Group controlId="formGridAddress1">
                    <Form.Label>Full Name</Form.Label>
                    <Form.Control placeholder="Full Name" onChange={ (e)=>setName(e.target.value) } />
                </Form.Group>
                <Form.Row>
                    <Form.Group as={Col} controlId="formGridEmail">
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" placeholder="Enter email" onChange={ (e)=>setEmail(e.target.value) } />
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" onChange={ (e)=>setPassword(e.target.value) } />
                    </Form.Group>
                </Form.Row>

                <Button variant="primary" className="btn btn-block" type="submit">
                    Submit
               </Button>
               <Link to="/login">Already have an account?</Link>
            </Form>
        </div>
    )
}

export default Register
