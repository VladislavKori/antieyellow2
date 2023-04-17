import React, { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../hooks/redux'
import { getPosts } from '../redux/actions/postsActions';
import Loader from '../components/Elements/Loader/Loader';
import PostPreview from '../components/Blog/PostPreview/PostPreview';

function BlogPage() {

    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(getPosts())
    }, [])

    const {
        posts,
        success,
        error,
        loading
    } = useAppSelector(state => state.posts);

    return (
        <>
            {loading ? <Loader /> : null}
            {error ? (
                <h1>Loader Error</h1>
            ) : null}
            {posts ? (<PostPreview data={posts} />) : null}
        </>
    )
}

export default BlogPage