import React from 'react'
import {Link} from 'react-router-dom'

const TodoItem = ({item, deleteTodo}) => {
   return (
       <tr>
           <td>
               {item.text}
           </td>
           <td>
               {item.date_create}
           </td>
           <td>
               {item.date_update}
           </td>
           <td>
               {item.active}
           </td>
           <td>
               {item.project}
           </td>
           <td>
               {item.user}
           </td>
           <td><button onClick={()=>deleteTodo(item.id)} type='button'>Delete</button></td>
       </tr>
   )
}

const TodoList = ({items, deleteTodo}) => {
   return (
    <div>
       <table class="listusers">
           <th>
               Text
           </th>
           <th>
               Date create
           </th>
           <th>
               Date update
           </th>
           <th>
               Active
           </th>
           <th>
               Project
           </th>
           <th>
               User
           </th>
           <th>
            </th>
           {items.map((item) => <TodoItem item={item} deleteTodo={deleteTodo}/>)}
       </table>
       <Link to='/todo/create'>Create</Link>
       </div>
   )
}


export default TodoList