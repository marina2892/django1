import React from 'react'

class TodoForm extends React.Component {
    constructor(props) {
      super(props)

      this.state = {'text': '', 'dateCreate': '', 'dateUpdate':'','active': '1', 'project': props.projects[0].id, 'user':props.users[0].id }
    }

handleChange(event)
    {
        this.setState(
                {
                    [event.target.name]: event.target.value
                }
            );
    }




handleSubmit(event) {

      console.log(this.state.text)
      console.log(this.state.active)
      this.props.createTodo(this.state.text,this.state.dateCreate, this.state.dateUpdate,this.state.active,this.state.project, this.state.user)
      event.preventDefault()

    }

render() {
      return (
        <form onSubmit={(event)=> this.handleSubmit(event)}>
            <div className="form-group">
            <label for="text">text</label>
                <input type="text" className="form-control" name="text" value={this.state.text} onChange={(event)=>this.handleChange(event)} />
            </div>
            <div className="form-group">
            <label for="dateCreate">dateCreate</label>
                <input type="text" className="form-control" name="dateCreate" value={this.state.dateCreate} onChange={(event)=>this.handleChange(event)} />
            </div>
            <div className="form-group">
            <label for="dateUpdate">dateUpdate</label>
                <input type="text" className="form-control" name="dateUpdate" value={this.state.dateUpdate} onChange={(event)=>this.handleChange(event)} />
            </div>
            <div className="form-group">
            <label for="active">active</label>

                <select name="active" className='form-control'  onChange={(event)=>this.handleChange(event)}>
                <option value='1'>true</option>
                <option value='0'>false</option>
                </select>
            </div>

        <div className="form-group">
            <label for="project">project</label>
            <select name="project" className='form-control'  onChange={(event)=>this.handleChange(event)}>
                {this.props.projects.map((item)=><option value={item.id}>{item.name}</option>)}
            </select>

        </div>
        <div className="form-group">
            <label for="user">user</label>
            <select name="user" className='form-control'  onChange={(event)=>this.handleChange(event)}>
                {this.props.users.map((item)=><option value={item.id}>{item.username}</option>)}
            </select>

        </div>
          <input type="submit" className="btn btn-primary" value="Save" />
        </form>
      );
    }
  }

  export default TodoForm