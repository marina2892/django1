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
import ProjectForm from './components/ProjectForm.js'
import TodoForm from './components/TodoForm.js'
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

deleteProject(id) {
    const headers = this.get_headers()
    axios.delete(`http://127.0.0.1:8000/api/projects/${id}`, {headers})
        .then(response => {
          this.setState({projects: this.state.projects.filter((item)=>item.id !== id)})
        }).catch(error => console.log(error))

  }

deleteTodo(id) {
    const headers = this.get_headers()
    axios.delete(`http://127.0.0.1:8000/api/todo/${id}`, {headers})
        .then(response => {
          this.setState({todo: this.state.todo.filter((item)=>item.id !== id)})
        }).catch(error => console.log(error))

  }

createProject(name, repo, authors) {
    const headers = this.get_headers()
    const data = {name: name, repo: repo, authors: authors}
    console.log(data)
    axios.post(`http://127.0.0.1:8000/api/projects/`, data, {headers})
        .then(response => {
          console.log(response.data)
          let new_project = response.data

          const authors = this.state.users.filter((item) => item.id === new_project.authors)[0]
          new_project.authors = authors
          this.setState({projects: [...this.state.projects, new_project]})
        }).catch(error => console.log(error))
  }

createTodo(text, dateCreate, dateUpdate, active, project, user) {
    const headers = this.get_headers()
    const data = {text: text, date_create: dateCreate, date_update: dateUpdate,active: active, project: project, user: user }
    console.log(data)
    axios.post(`http://127.0.0.1:8000/api/todo/`, data, {headers})
        .then(response => {
          console.log(response.data)
          let new_todo = response.data
          const user = this.state.users.filter((item) => item.id === new_todo.user)[0]
          new_todo.user = user
          const project = this.state.projects.filter((item) => item.id === new_todo.project)[0]
          new_todo.project = project
          this.setState({todo: [...this.state.todo, new_todo]})
        }).catch(error => console.log(error))
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
                      <Route exact path='/projects' component={() => <ProjectList items={this.state.projects} deleteProject={(id)=>this.deleteProject(id)}/>} />
                      <Route exact path='/projects/create' component={() => <ProjectForm users = {this.state.users} createProject={(name, repo, authors)=>this.createProject(name, repo, authors)}/>}/>
                      <Route exact path='/todo/create' component={() => <TodoForm  users = {this.state.users} projects = {this.state.projects} createTodo={(text, dateCreate, dateUpdate, active, project, user)=>this.createTodo(text, dateCreate, dateUpdate, active, project, user)}/>}/>
                      <Route exact path='/todo' component={() => <TodoList items={this.state.todo} deleteTodo={(id)=>this.deleteTodo(id)}/>} />
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









