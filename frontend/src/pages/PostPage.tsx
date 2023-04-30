import React, { useEffect, useState, useRef } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import { getPost } from '../redux/actions/postsActions';
import globalConfig from '../configs/global.config';
import '../styles/page/postpage.scss'
import Button from '../components/Ui/Button/Button';
import { ReactComponent as HeartIcon } from '../assets/icons/heart.svg'
import Input from '../components/Ui/Input/Input';
import { ReactComponent as ShareIcon } from '../assets/icons/share.svg';
import { getLike, keepLike } from '../redux/actions/likeActions';
import Comments from '../components/Blog/Comments/Comments';

function PostPage() {

    useEffect(() => {
        dispatch(getPost({ id: String(postId) }))
    }, [])

    const { postId } = useParams();
    const [postHasLike, setPostHasLike] = useState<boolean>(false);
    const [postError, setPostError] = useState<string>("")

    const {
        posts,
        loading,
        success,
        error
    } = useAppSelector(state => state.posts);
    const user = useAppSelector(state => state.auth)
    const like = useAppSelector(state => state.likes)
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (error) {
            setPostError(error)
        }
        if (posts && postId) {
            dispatch(getLike({ postid: postId }))
        }
    }, [error, dispatch, posts])

    useEffect( () => {
        if (like.like) {
            setPostHasLike(like.like.like)
        }
    }, [like.like])

    const changeLikeHandler = () => {
        setPostHasLike(!postHasLike)
        dispatch(keepLike({ postid: String(postId) }))
    }

    async function copyInBuffer() {
        const value = String(globalConfig.FRONT_HOST + `/blog/${postId}`);
        const result = await navigator.clipboard.writeText('dsf')
    }

    if (postError != null && posts != null && posts?.length != 0) {
        return (
            <div className="post">
                <div
                    className="post__preview"
                    style={{
                        height: 400,
                        width: '100%',
                        background: `url('${globalConfig.SERVER_HOST + "/" + posts[0].preview}')`,
                        backgroundRepeat: 'no-repeat',
                        backgroundSize: 'cover',
                        backgroundPosition: 'center'
                    }}
                />
                <div className="post__content">
                    <h1 className="post__title">{posts[0].title}</h1>
                    <p className="post__text">{posts[0].content}</p>

                    <div className="post__estimation">
                        {like && user.isAuth ? (
                            <Button
                                onClick={changeLikeHandler}
                                className={postHasLike ? "post__estimation-btn post__estimation-btn_active" : "post__estimation-btn"}>
                                <div className="post__estimation-inside">
                                    <HeartIcon className="post__estimation-icon" />
                                    <p className='post__estimation-text'>Понравилось</p>
                                </div>
                            </Button>
                        ) : null}
                        <Button
                            onClick={() => copyInBuffer()}
                            className="post__estimation-btn">
                            <div className="post__estimation-inside">
                                <ShareIcon />
                            </div>
                        </Button>
                    </div>
                    <div className="post__comments">
                        <Comments />
                    </div>
                </div>
            </div>
        )
    } else {
        return (<h1 className="error-text">{error} error</h1>)
    }

}

export default PostPage