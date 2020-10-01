import React, { useContext, useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import UserContext from '../../context/UserContext'
import axios from 'axios'
import { Form, Button, Col } from 'react-bootstrap'
import ErrorsAlert from '../errors/ErrorsAlert'




const EditProfile = (props) => {

    const [profile, setProfile] = useState([])
    const [ email, setEmail ] = useState()
    const [ name, setName ] = useState()
    const [ password, setPassword ] = useState()
    const [error, setError] = useState()

    const { userData, setUserData } = useContext(UserContext)

  const history = useHistory()

  useEffect(() => {
    let token = localStorage.getItem('auth-token')

    const fetchProfile = async (id) => {
      {
        userData.user ? (
         await axios.get('http://localhost:5000/api/users/profile', {
            headers: { 'x-auth-token': token }
          })
          
            .then(res => {
              setProfile(res.data)
              setUserData({
                token: userData.token,
                user: userData.user
              })

            })
            .catch(err => err.response.data.msg && setError(err.response.data.msg))
        ) : (
            history.push('/login')
          )
      }

    }

    fetchProfile()

  }, [])

  const submit = async (e) => {
    e.preventDefault()

    try{
       
       const token = localStorage.getItem('auth-token')
       const editUser = { email,password,name }
       const userId = props.match.params.id
       await axios.put('http://localhost:5000/api/users/edit/'+userId,editUser,{
             headers :{ 'x-auth-token': token }
       })
                  .then(res=>{
                      console.log(res.data)
                      setUserData({
                        token: userData.token,
                        user: userData.user
                      })
                      { res ? (
                          history.push('/profile')
                      ):(
                          history.push('/user/edit/'+userId)
                      ) }
                  })

    }catch(err){
       err.response.data.msg && setError(err.response.data.msg)
    }
}

    return (
        <div>
            <h2 className="text-center mt-5 mb-4">Update Profile </h2>
            
            {error && (
                <ErrorsAlert message={error} clearError={ ()=>setError(undefined) } />
            )}

            <Form className=" container col-sm-4 mt-4" onSubmit={submit}  >
                <Form.Group controlId="formGridAddress1">
                    <Form.Label>Full Name</Form.Label>
                    <Form.Control placeholder="Full Name"  onChange={ e => setName(e.target.value) } />
                </Form.Group>
                <Form.Row>
                    <Form.Group as={Col} controlId="formGridEmail">
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" placeholder="Enter email"  onChange={ e => setEmail(e.target.value) } />
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password"  onChange={ e => setPassword(e.target.value) } />
                    </Form.Group>
                </Form.Row>

                <Button variant="primary" className="btn btn-block" type="submit">
                    Save
               </Button>
            </Form>
        </div>
    )
}

export default EditProfile
