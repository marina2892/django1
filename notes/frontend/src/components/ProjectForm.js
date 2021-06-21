import React from 'react'

class ProjectForm extends React.Component {
    constructor(props) {
      super(props)
      this.state = {'name': '', 'repo': '', 'authors':[]}
    }

handleChange(event)
    {
        this.setState(
                {
                    [event.target.name]: event.target.value
                }
            );
    }

handleChangeAuthors(event) {
        if (!event.target.selectedOptions) {
            return;
        }

        let authors = [];
        for (let i = 0; i < event.target.selectedOptions.length; i++){
            authors.push(event.target.selectedOptions.item(i).value);
        }
        console.log(authors);

        this.setState(
            {
                'authors': authors
            }
        );
    }


handleSubmit(event) {

      this.props.createProject(this.state.name,this.state.repo, this.state.authors)
      event.preventDefault()

    }

render() {
      return (
        <form onSubmit={(event)=> this.handleSubmit(event)}>
            <div className="form-group">
            <label for="name">name</label>
                <input type="text" className="form-control" name="name" value={this.state.name} onChange={(event)=>this.handleChange(event)} />
            </div>
            <div className="form-group">
            <label for="repo">repo</label>
                <input type="text" className="form-control" name="repo" value={this.state.repo} onChange={(event)=>this.handleChange(event)} />
            </div>

        <div className="form-group">
            <label for="authors">authors</label>
            <select multiple name="authors" className='form-control'  onChange={(event)=>this.handleChangeAuthors(event)}>
                {this.props.users.map((item)=><option value={item.id}>{item.username}</option>)}
            </select>

        </div>
          <input type="submit" className="btn btn-primary" value="Save" />
        </form>
      );
    }
  }

  export default ProjectForm


