import React, { useState, useEffect, useContext } from 'react'
import UserContext from '../../context/UserContext'
import { useHistory, Link } from 'react-router-dom'
import ErrorsAlert from '../errors/ErrorsAlert'
import { Table, Button } from 'react-bootstrap'
import axios from 'axios'

const Profile = () => {

  const [profile, setProfile] = useState([])
  const [error, setError] = useState()

  const { userData, setUserData } = useContext(UserContext)

  const history = useHistory()

  useEffect(() => {
    let token = localStorage.getItem('auth-token')

    const fetchProfile = async () => {
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


  return (
    <div className="mt-5">
      {error && (
        <ErrorsAlert message={error} clearError={() => setError(undefined)} />
      )}

      <h3 className="container mt-5 col-md-7">Profile Information</h3>

      <Table className="container mt-5 col-md-7" responsive>
        <thead>
          <tr>
            <th>#ID</th>
            <th>Full Name</th>
            <th>Email</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{profile._id}</td>
            <td>{profile.name}</td>
            <td>{profile.email}</td>
            <td>
              <Link to={`/user/edit/${profile._id}`}>
                <Button variant="warning">Edit</Button>
              </Link>
            </td>
          </tr>
        </tbody>
      </Table>
    </div>
  )
}

export default Profile
