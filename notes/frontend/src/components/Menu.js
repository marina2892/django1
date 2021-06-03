import {Link} from 'react-router-dom'


const MenuItem = () => {
    return (
        <div class = "header">
            <nav>
            <ul>

              <li>
                <Link to='/users'>Users</Link>
              </li>
              <li>
                <Link to='/projects'>Projects</Link>
              </li>
              <li>
                <Link to='/todo'>Todo</Link>
              </li>
            </ul>
          </nav>


        </div>
    )
}


export default MenuItem
