import React, { Fragment, useState } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Navbar from './components/layout/Navbar'
import Alert from './components/layout/Alert'
import Users from './components/users/Users'
import User from './components/users/User'
import Search from './components/users/Search'
import About from './components/pages/About'
import axios from 'axios'
import './App.css';

const App = () => {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(false)
  const [alert, setAlert] = useState(null)
  const [user, setUser] = useState({})
  const [repos, setRepos] = useState([])

  // Search Github users
 const searchUsers = async (text) => {
    setLoading(true)

    const res = await axios.get(`https://api.github.com/search/users?q=${text}
    &client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&
        client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`)

    setUsers(res.data.items)
    setLoading(false)
  }

  // Get single user
 const getUser = async (username) => {
    setLoading(true)

    const res = await axios.get(`https://api.github.com/users/${username}
    ?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&
        client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`)

        setUser(res.data)
        setLoading(false)
  }

    // Get users repos
  const getUserRepos = async (username) => {
      setLoading(false)
  
      const res = await axios.get(`https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc
      &client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&
          client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`)
  
          setRepos(res.data)
          setLoading(false)
    }

  // Clear users from state
 const clearUsers = () => {
    setUsers([])
    setLoading(false)
  }

  // show alert when text is empty
 const showAlert = (msg,type) => {
    setAlert({msg,type})
    setTimeout(() => {
      return setAlert(null)
    }, 2000);
 }

    return (
      <Router >
        <div className="App">
        <Navbar title="Github Finder" icon="fab fa-github"/>
          <div className='container'>
              <Alert alert={ alert }/>
              <Switch>
                <Route 
                  exact path='/' 
                  render={ props =>(
                    <Fragment>
                      <Search 
                        searchUsers={searchUsers}
                        clearUsers={clearUsers}
                        showClear={ users.length > 0 ? true : false }
                        setAlert={showAlert}/>
                      <Users 
                        loading={loading} 
                        users={users}
                        />
                    </Fragment>
                  )}/>
                  <Route 
                    exact path='/about'
                    component={About}
                  />
                  <Route 
                    exact path='/user/:login'
                    render={
                      props=>(
                        <User
                         {...props} 
                         getUser={getUser}
                         getUserRepos={getUserRepos}
                         user={user}
                         loading={loading}
                         repos={repos}
                         />
                      )
                    }
                  />
              </Switch>
          </div>
        </div>
      </Router>
    );
}

export default App;
