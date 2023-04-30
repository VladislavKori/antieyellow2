import React, { useEffect } from 'react'
import './AdminBlog.scss'
import Button from '../../Ui/Button/Button'
import { useAppDispatch, useAppSelector } from '../../../hooks/redux'
import BlogItem from './BlogItem/BlogItem';
import { getPosts } from '../../../redux/actions/postsActions';
import { useNavigate } from "react-router-dom";

function AdminBlog() {

    const navigate = useNavigate();

    const dispatch = useAppDispatch();
    const posts = useAppSelector(state => state.posts);

    useEffect(() => {
        dispatch(getPosts())
    }, [])

    const createPostHandler = () => {
        return navigate('create')
    }

    return (
        <div className="ac">
            <h1 className="admin__title">Блог</h1>
            <div className="admin__content ac__content">
                {posts.posts ? (
                    <ul className="admin__list">
                        {posts.posts.map((item, index) => (
                            <React.Fragment key={index}>
                                <BlogItem {...item} index={index} />
                            </React.Fragment>
                        ))}
                    </ul>
                ) : null}
            </div>
            <Button onClick={createPostHandler}>Создать пост</Button>
        </div>
    )
}

export default AdminBlog