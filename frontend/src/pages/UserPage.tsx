import React from 'react'
import { useParams,  } from 'react-router-dom'
import Button from '../components/Ui/Button/Button';
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import { logout } from '../redux/actions/userActions';

function UserPage() {

    const { userId } = useParams();

    const {
        userInfo,
        loading,
        error,
        success
    } = useAppSelector(state => state.user)
    const dispatch = useAppDispatch();

    const logoutHandler = () => {
        dispatch(logout())
        if (typeof window !== 'undefined') {
            window.location.href = "/";
       }
    }

    console.log(userId)

    return (
        <div>
            <h1>{userInfo.email}</h1>
            <Button 
                onClick={logoutHandler}
            >
                Выйти
            </Button>
        </div>
    )
}

export default UserPage