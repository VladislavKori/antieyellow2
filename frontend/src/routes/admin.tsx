import React from 'react';
import AdminCreatePost from '../pages/AdminCreatePost';
const AdminBlog= React.lazy(() => import('../pages/AdminBlog'))
const AdminGalary= React.lazy(() => import('../pages/AdminGalary'))
const AdminCommon = React.lazy(() => import('../pages/AdminCommon'))
const AdminEditorPost = React.lazy(() => import('../pages/AdminEditorPost'))

export const adminRoutes = [
    { path: "/admin/galary", element: <AdminGalary /> },
    { path: "/admin/common", element: <AdminCommon /> },
    { path: "/admin/blog", element: <AdminBlog /> },
    { path: "/admin/blog/editor/:id", element: <AdminEditorPost /> },
    { path: "/admin/blog/create", element: <AdminCreatePost /> },
    { path: "/admin/blog/edit/:postid", element: <AdminEditorPost /> },
]