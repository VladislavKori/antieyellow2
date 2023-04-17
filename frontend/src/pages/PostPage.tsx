import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import { getPost } from '../redux/actions/postsActions';
import globalConfig from '../configs/global.config'; 

function PostPage() {

    const { postId } = useParams();

    const {
        posts,
        loading,
        success,
        error
    } = useAppSelector(state => state.posts);
    const dispatch = useAppDispatch();

    let foundedPost;

    if (posts == null) {
        dispatch(getPost({ id: String(postId) }))
    } else {
        for (let i = 0; i < posts.length; i++) {
            if (posts[i].id == postId) {
                console.log(posts[i])
                foundedPost = posts[i];
                break;
            }
        }
    }
    
    if (foundedPost !== undefined) {
        return (
            <div className="post">
                <div
                    className="post__preview"
                    style={{
                        height: 400,
                        width: '100%',
                        background: `url('${globalConfig.SERVER_HOST + foundedPost.preview}')`,
                        backgroundRepeat: 'no-repeat',
                        backgroundSize: 'cover',
                        backgroundPosition: 'center'
                    }}
                />
                <div className="post__content">
                    <h1 className="post__title">{foundedPost.title}</h1>
                    <p className="post__text">{foundedPost.content}</p>
                </div>
                <div className="post__comments">
                    В разработке
                </div>
            </div>
        )
    } else {
        return null
    }

}

export default PostPage