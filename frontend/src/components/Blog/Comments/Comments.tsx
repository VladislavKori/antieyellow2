import React, { useState, useEffect } from 'react'

// styles
import './Comments.scss'

// components
import Input from '../../Ui/Input/Input'
import Button from '../../Ui/Button/Button'

// icons
import { ReactComponent as SendIcon } from '../../../assets/icons/send.svg'
import CommentsItem from './CommentsItem/CommentsItem'
import { useAppDispatch, useAppSelector } from '../../../hooks/redux'
import { createComment, getComments, getLikeOnComments } from '../../../redux/actions/commentsActions'

function Comments() {

    const [newComment, setNewComment] = useState<string>("")

    const dispatch = useAppDispatch()
    const auth = useAppSelector(state => state.auth);
    const post = useAppSelector(state => state.posts);
    const comments = useAppSelector(state => state.comments)

    useEffect(() => {
        if (post.posts != null) {
            dispatch(getComments({
                postid: post.posts[0].id
            }))
        }
    }, [post, dispatch])

    useEffect( () => {
        if (auth.isAuth) {
            dispatch(getLikeOnComments())
        }
    }, [auth.isAuth]) 

    const createNewCommentHandler = () => {
        if (newComment == "") { return false }
        if (!auth.isAuth) { return alert("Вы не можите оставлять комментарии, пока вы не авторизованы") }

        if (post.posts != null) {
            dispatch(createComment({
                postid: post.posts[0].id,
                text: newComment
            }))
            setNewComment("")
        }
    }

    return (
        <div className="comments">
            <header className="comments__header">
                <input
                    className="comments__input"
                    placeholder='Оставьте комментарий'
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                />
                <Button
                    onClick={createNewCommentHandler}
                    className='comments__button'
                >
                    <SendIcon className="comments__icon" />
                </Button>
            </header>
            <div className="comments__body">
                {comments.comments.length != 0 ? (
                    <>
                        {comments.comments.map((item, index) => (
                            <React.Fragment key={index}>
                                <CommentsItem {...item} />
                            </React.Fragment>
                        ))}
                    </>
                ) : (
                    <h1 className="error-text">Комментариев нет</h1>
                )}
            </div>
        </div>
    )
}

export default Comments