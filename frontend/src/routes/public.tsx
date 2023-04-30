import React from 'react';
import Loader from '../components/Elements/Loader/Loader';
const PostPage = React.lazy(() => import('../pages/PostPage'));
const Privacy = React.lazy(() => import('../pages/Privacy'));
const NotFound = React.lazy(() => import('../pages/NotFound'));
const Blog = React.lazy(() => import('../pages/BlogPage'));
const Main = React.lazy(() => import('../pages/MainPage'));
const Galary = React.lazy(() => import('../pages/PhotoGalary'));
const Profile = React.lazy(() => import('../pages/UserPage'))

export const publicRoutes = [
    { path: "/", element: <Main /> },
    { path: "/blog", element: <Blog /> },
    { path: "/galary", element: <Galary /> },
    { path: "/user/:userId", element: <Profile /> },
    { path: "*", element: <NotFound />},
    { path: "/privacy", element: <Privacy />},
    { path: "/blog/:postId", element: <PostPage />}
]