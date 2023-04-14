import React from 'react'
import { useParams } from 'react-router-dom'

function UserPage() {

    const { userId } = useParams();

    return (
        <div>UserPage</div>
    )
}

export default UserPage