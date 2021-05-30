import React from 'react';
import logo from './logo.svg';
import './App.css';
import UserList from './components/User.js'
import ProjectList from './components/Projects.js'
import ProjectInfoList from './components/ProjectInfo.js'
import TodoList from './components/Todo.js'
import MenuItem from './components/Menu.js'
import FooterItem from './components/Footer.js'
import {BrowserRouter, Route, Switch, Redirect} from 'react-router-dom'
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
      'todo': []
    }
  }
  componentDidMount() {
   axios.get('http://127.0.0.1:8000/api/users')
       .then(response => {
           const users = response.data['results']
               this.setState(
               {
                   'users': users
               }
           )
       }).catch(error => console.log(error))

   axios.get('http://127.0.0.1:8000/api/projects')
       .then(response => {
           const projects = response.data['results']
               this.setState(
               {
                   'projects': projects
               }
           )
       }).catch(error => console.log(error))

   axios.get('http://127.0.0.1:8000/api/todo')
       .then(response => {
           const todo = response.data['results']
               this.setState(
               {
                   'todo': todo
               }
           )
       }).catch(error => console.log(error))


}
render() {
    return (
      <div class = "wrapper">
          <BrowserRouter>
              <MenuItem />
              <div className="App">
                  <Switch>
                      <Route exact path='/' component={() => <UserList items={this.state.users} />}  />
                      <Route exact path='/users' component={() => <UserList items={this.state.users} />}  />
                      <Route exact path='/projects' component={() => <ProjectList items={this.state.projects} />} />
                      <Route exact path='/todo' component={() => <TodoList items={this.state.todo} />} />
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









