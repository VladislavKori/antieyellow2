import React, { useEffect } from 'react'
import './CommentsItem.scss'

import { ReactComponent as LikeIcon } from '../../../../assets/icons/like.svg';
import globalConfig from '../../../../configs/global.config';
import { useAppDispatch, useAppSelector } from '../../../../hooks/redux';
import Button from '../../../Ui/Button/Button';
import { deleteComment, getLikeOnComments, keepLikeOnComment } from '../../../../redux/actions/commentsActions';

interface CommentsItemProps {
    id: number
    text: string
    createdAt: string
    numsOfLike: number
    user: {
        id: number
        username: string
        avatar: string
    }
    thisUserIsLike: number
}

function CommentsItem({ user, text, createdAt, numsOfLike, id, thisUserIsLike }: CommentsItemProps) {

    const dispatch = useAppDispatch()
    const auth = useAppSelector(state => state.auth)
    const comments = useAppSelector(state => state.comments)

    const deleteCommentHandler = () => {
        dispatch(deleteComment({commentid: id}))
    }
    
    const keeplikeoncommentHandler = () => {
        dispatch(keepLikeOnComment({commentid: id}))
    }

    const checkCommentsResult = () => {
        if (comments.yourLikedComments.length == 0) return false;
        
        let result = false;
        for (let i = 0; i < comments.yourLikedComments.length; i++) {
            if (comments.yourLikedComments[i].commentId == id) {
                result = true
            }
        } 
        
        return result;
    }

    return (
        <div className="comments-item">
            <div className="comments-item__useravatar">
                <div
                    style={{
                        background: `url('${globalConfig.SERVER_HOST + "/" + user.avatar}')`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                    }}
                    className="comments-item__useravatar-inside"
                />
            </div>

            <div className="comments-item__header-info">
                <h2 className="comments-item__username">{user.username}</h2>
                <p className="comments-item__time">{createdAt}</p>
            </div>

            <p className="comments-item__text">{text}</p>

            <div className="comments-item__mark-bar">                
                <button className={!checkCommentsResult() ? "comments-item__like comments-item__btn" : "comments-item__like comments-item__btn comments-item__btn_active"} onClick={keeplikeoncommentHandler}> { }
                    <LikeIcon className="comments-item__icon" />
                    <p className="comments-item__like-text">{numsOfLike}</p>
                </button>
                {/* <button className="comments-item__dislike comments-item__btn">
                    <LikeIcon className="comments-item__icon comments-item__icon-dislike" />
                </button> */}
            </div>

            {/* Если админ, то он может удалить любой комментарий */}
            {auth.isAuth && auth.isAdmin ? (
                <div className="comments-item__del-btn">
                    <Button type="delete" onClick={deleteCommentHandler}><></></Button>
                </div>
            ) : (
                <>
                    {/* Если пользователь явялется владельцом комментария, то он может его удалить */}
                    {auth.isAuth && auth.userInfo.id == user.id ? (
                        <div className="comments-item__del-btn">
                            <Button type="delete" onClick={deleteCommentHandler}><></></Button>
                        </div>
                    ) : null}
                </>
            )}
        </div>
    )
}

export default CommentsItem