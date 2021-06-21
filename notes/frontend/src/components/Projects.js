import React from 'react'
import {Link} from 'react-router-dom'

const ProjectItem = ({item, deleteProject}) => {
   return (
       <tr>


           <td>
               <Link to={`project/${item.id}`}>{item.name}</Link>
           </td>
           <td><button onClick={()=>deleteProject(item.id)} type='button'>Delete</button></td>
       </tr>
   )
}

const ProjectList = ({items,deleteProject}) => {
   return (
       <div>
       <table class="listusers">

           <th>
               Name
           </th>
            <th>

           </th>
           {items.map((item) => <ProjectItem item={item} deleteProject={deleteProject}/>)}
       </table>
       <Link to='/projects/create'>Create</Link>
        </div>
   )
}


export default ProjectList