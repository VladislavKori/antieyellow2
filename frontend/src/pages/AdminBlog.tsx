import React from 'react'

// styles
import '../styles/page/adminpage.scss'

// redux
import { useAppSelector } from '../hooks/redux'

// components
import AdminMenu from '../components/Admin/AdminMenu/AdminMenu'
import AdminBlog from '../components/Admin/AdminBlog/AdminBlog';

function AdminCommonPage() {

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
                <AdminBlog />
            </div>
            <AdminMenu />
        </div>
    )
}

export default AdminCommonPage