import React from 'react'

const TodoItem = ({item}) => {
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
       </tr>
   )
}

const TodoList = ({items}) => {
   return (
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
           {items.map((item) => <TodoItem item={item} />)}
       </table>
   )
}


export default TodoList