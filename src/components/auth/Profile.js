import React,{ useState,useEffect, useContext } from 'react'
import UserContext from '../../context/UserContext'
import { useHistory } from 'react-router-dom'
import ErrorsAlert from '../errors/ErrorsAlert'
import axios from 'axios'

const Profile = () => {

  const [profile, setProfile] = useState([])
  const [error, setError] = useState()

  const {userData, setUserData} = useContext(UserContext)

  const history = useHistory()

useEffect( ()=> {
  let token = localStorage.getItem('auth-token')

  const fetchProfile = async() => {

    {userData.user ? (
      
      await axios.get('https://blog-application-api.herokuapp.com/api/users/profile',{
        headers : { 'auth-token': token}
      })
      .then(res=>{
        console.log(res.data)
         setProfile(res.data)
         setUserData({
           token: userData.token,
           user: userData.user
         })
      
      })
      .catch(err => err.response.data.msg && setError(err.response.data.msg))
    ):(
      history.push('/login')
    )}
    
  }
       
  fetchProfile()
     
},[])

  return (
    <div className="mt-5">
      {error && (
        <ErrorsAlert message={error} clearError={() => setError(undefined)} />
      )}

      <p>{profile.name}</p>
    </div>
  )
}

export default Profile
