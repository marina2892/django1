import React from 'react'
import {Link} from 'react-router-dom'

const ProjectItem = ({item}) => {
   return (
       <tr>


           <td>
               <Link to={`project/${item.id}`}>{item.name}</Link>
           </td>

       </tr>
   )
}

const ProjectList = ({items}) => {
   return (
       <table class="listusers">

           <th>
               Name
           </th>

           {items.map((item) => <ProjectItem item={item} />)}
       </table>
   )
}


export default ProjectList