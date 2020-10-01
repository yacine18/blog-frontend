import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import AuthOptions from './components/auth/AuthOptions'
import Home from './components/pages/Home'
import Register from './components/auth/Register'
import Login from './components/auth/Login'
import Profile from './components/auth/Profile'
import axios from 'axios'
import UserContext from './context/UserContext'
import NewArticle from './components/pages/NewArticle'
import SignleArticle from './components/pages/SingleArticle'
import EditArticle from './components/pages/EditArticle'
import EditProfile from './components/auth/EditProfile'
import Footer from './components/pages/Footer'


function App() {

  const [userData, setUserData] = useState({
    token: undefined,
    user: undefined,
  })
  useEffect(() => {
    const checkLoggedIn = async () => {
      let token = localStorage.getItem('auth-token')
      if (token === null) {
        localStorage.setItem('auth-token', "")
        token = ""
      }

      const tokenRes = await axios.post('https://blog-application-api.herokuapp.com/api/users/tokenIsValid',
        null,
        { headers: { 'x-auth-token': token } }

      )

      if (tokenRes.data) {
        const userRes = await axios.get('https://blog-application-api.herokuapp.com/api/users/profile', {
          headers: { 'x-auth-token': token }
        })

        setUserData({
          token,
          user: userRes.data
        })
      }

    }

    checkLoggedIn()

  }, [])


  return (
    <BrowserRouter>
      <UserContext.Provider value={{userData,setUserData}}>
        <AuthOptions />
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/register" component={Register} />
          <Route path="/login" component={Login} />
          <Route path="/profile" component={Profile} />
          <Route path="/new" component={NewArticle} />
          <Route path="/article/:id" component={SignleArticle} />
          <Route path="/edit/:id" component={EditArticle} />
          <Route path="/user/edit/:id" component={EditProfile} />
        </Switch>
        <Footer />
    </UserContext.Provider>
    </BrowserRouter>
  );
}

export default App;
