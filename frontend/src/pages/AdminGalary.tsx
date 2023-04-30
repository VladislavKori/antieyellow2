import React from 'react'

// styles
import '../styles/page/adminpage.scss'

// redux
import { useAppSelector } from '../hooks/redux'

// components
import AdminGalary from '../components/Admin/AdminGalary/AdminGalary'
import AdminMenu from '../components/Admin/AdminMenu/AdminMenu'

function AdminPage() {

    const auth = useAppSelector(state => state.auth);

    if (!auth.userInfo && auth.loading) {
        return (
            <h1>Loading</h1>
        )
    }

    if (!auth.isAdmin) {
        return (
            <h1>Вы не админ, доступ запрещён</h1>
        )
    }

    return (
        <div className="admin">
            <div className="admin__main-area">
                <AdminGalary />
            </div>
            <AdminMenu />
        </div>
    )
}

export default AdminPage