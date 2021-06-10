import React from 'react'

const UserItem = ({item}) => {
   return (
       <tr>
            <td>
               {item.id}
           </td>
           <td>
               {item.username}
           </td>
           <td>
               {item.first_name}
           </td>
           <td>
               {item.last_name}
           </td>
           <td>
               {item.email}
           </td>
       </tr>
   )
}

const UserList = ({items}) => {
   return (
       <table class="listusers">
           <th>
               ID
           </th>
           <th>
               Username
           </th>
           <th>
               First Name
           </th>
           <th>
               Last Name
           </th>
           <th>
               Email
           </th>
           {items.map((item) => <UserItem item={item} />)}
       </table>
   )
}


export default UserList

