import React from 'react';
import logo from './logo.svg';
import './App.css';
import UserList from './components/User.js'
import ProjectList from './components/Projects.js'
import ProjectInfoList from './components/ProjectInfo.js'
import TodoList from './components/Todo.js'
import MenuItem from './components/Menu.js'
import FooterItem from './components/Footer.js'
import LoginForm from './components/Auth.js'
import Cookies from 'universal-cookie'
import {BrowserRouter, Route, Switch, Redirect, Link} from 'react-router-dom'
import axios from 'axios'


const NotFound404 = ({ location }) => {
  return (
    <div>
        <h1>Страница по адресу '{location.pathname}' не найдена</h1>
    </div>
  )
}


class App extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      'users': [],
      'projects': [],
      'todo': [],
      'token': ''
    }
  }
  set_token(token) {
    const cookies = new Cookies()
    cookies.set('token', token)
    this.setState({'token': token}, ()=>this.load_data())
  }
is_authenticated() {
    return this.state.token != ''
  }
logout() {
    this.set_token('')
  }
 get_token_from_storage() {
    const cookies = new Cookies()
    const token = cookies.get('token')
    this.setState({'token': token}, ()=>this.load_data())
  }

get_token(username, password) {
    axios.post('http://127.0.0.1:8000/api-token-auth/', {username: username, password: password})
    .then(response => {
        this.set_token(response.data['token'])
    }).catch(error => alert('Неверный логин или пароль'))
  }
get_headers() {
    let headers = {
      'Content-Type': 'application/json'
    }
  if (this.is_authenticated())
    {
        headers['Authorization'] = 'Token ' + this.state.token
    }
    return headers
  }
  load_data() {
  const headers = this.get_headers()
   axios.get('http://127.0.0.1:8000/api/users/', {headers})
       .then(response => {
           const users = response.data['results']
               this.setState(
               {
                   'users': users
               }
           )
       }).catch(error => {
       console.log(error)
       this.setState({users: []})
       })

   axios.get('http://127.0.0.1:8000/api/projects/', {headers})
       .then(response => {
           const projects = response.data['results']
               this.setState(
               {
                   'projects': projects
               }
           )
       }).catch(error => {
       console.log(error)
       this.setState({projects: []})
       })

   axios.get('http://127.0.0.1:8000/api/todo/', {headers})
       .then(response => {
           const todo = response.data['results']
               this.setState(
               {
                   'todo': todo
               }
           )
       }).catch(error => {
       console.log(error)
       this.setState({todo: []})
    })

}

componentDidMount() {
    this.get_token_from_storage()

  }

render() {
    return (
      <div class = "wrapper">
          <BrowserRouter>
          <div class = "header">
              <MenuItem />
              {this.is_authenticated() ? <button onClick={()=>this.logout()}>Logout</button> : <Link to='/login'>Login</Link>}
          </div>

              <div className="App">
                  <Switch>
                      <Route exact path='/' component={() => <UserList items={this.state.users} />}  />
                      <Route exact path='/projects' component={() => <ProjectList items={this.state.projects} />} />
                      <Route exact path='/todo' component={() => <TodoList items={this.state.todo} />} />
                      <Route exact path='/login' component={() => <LoginForm get_token={(username, password) => this.get_token(username, password)} />} />
                      <Route path="/project/:id">
                            <ProjectInfoList items={this.state.projects} />
                      </Route>

                      <Redirect from='/users' to='/' />
                      <Route component={NotFound404} />
                  </Switch>
               </div>
          </BrowserRouter>
          <FooterItem />
      </div>
    )
  }
}

export default App;









