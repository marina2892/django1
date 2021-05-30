import React from 'react'
import { useParams } from 'react-router-dom'


const ProjectItem = ({item}) => {
    return (
        <tr>

            <td>{item.name}</td>
            <td>{item.repo_url}</td>
            <td><div>{item.authors.map(item => (<span>{item},</span>))}</div></td>

        </tr>
    )
}


const ProjectInfoList = ({items}) => {

    let { id } = useParams();
    let filtered_items = items.filter((item) => item.id == id)
    return (
        <table>
            <tr>

                <th>NAME</th>
                <th>REPO_URL</th>
                <th>AUTHORS</th>
            </tr>
            {filtered_items.map((item) => <ProjectItem item={item} />)}
        </table>
    )
}

export default ProjectInfoList