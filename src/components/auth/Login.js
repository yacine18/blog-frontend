import React, { useState, useContext } from 'react'
import { useHistory, Link } from 'react-router-dom'
import UserContext from '../../context/UserContext'
import { Form, Button} from 'react-bootstrap'
import ErrorsAlert from '../errors/ErrorsAlert'
import axios from 'axios'

const Login = () => {

    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const [error, setError] = useState()

    const {setUserData} = useContext(UserContext)
    const history = useHistory()

    const submit = async (e)=>{
        e.preventDefault()
        try{
       
         const loginUser = { email, password }
         const loginRes = await axios.post('https://blog-application-api.herokuapp.com/api/users/login', loginUser)
        

         setUserData({
             token: loginRes.data.token,
             user: loginRes.data.user
         })

         localStorage.setItem('auth-token', loginRes.data.token)
         history.push('/')
         
        }catch(err){
            err.response.data.msg && setError(err.response.data.msg);
        }
    }

    return (
        <div className="mt-5">
            <h2 className="text-center">Login</h2>

            {error && (
                <ErrorsAlert message={error} clearError={ ()=>setError(undefined) } />
            )}

            <Form className=" container col-sm-4" onSubmit={submit} >
                <Form.Group controlId="formGridEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" onChange={ e =>setEmail(e.target.value) } />
                </Form.Group>

                <Form.Group controlId="formGridPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" onChange={ e =>setPassword(e.target.value)} />
                </Form.Group>

                <Button variant="primary" className="btn btn-block" type="submit">
                    Login
               </Button>
               <Link to="/register">Don't have an account?</Link>
            </Form>
        </div>
    )
}

export default Login
