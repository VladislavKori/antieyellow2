import React, { useEffect, useRef, useState } from 'react'
import '../AdminPostCreator/AdminPostCreator.scss'
import Input from '../../Ui/Input/Input'
import Button from '../../Ui/Button/Button'

import { ReactComponent as UploadIcon } from '../../../assets/icons/upload.svg';
import { createPost, editPost, getPosts } from '../../../redux/actions/postsActions';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import { useParams } from 'react-router-dom';
import globalConfig from '../../../configs/global.config';

function AdminPostEditor() {

    const { postid } = useParams();
    if (!postid) return (<h1>PostId не указан</h1>)

    const dispatch = useAppDispatch()
    const state = useAppSelector(state => state.posts);

    const form = new FormData();
    const [drag, setDrag] = useState<boolean>(false);
    const file = useRef<File | null>(null);
    const [previewImg, setPreviewImg] = useState<boolean>(false)

    const [title, setTitle] = useState<string>("")
    const [text, setText] = useState<string>("")
    const [preview, setPreview] = useState<string>("")

    useEffect( () => {
        dispatch(getPosts())
    }, [])

    useEffect( () => {
        // @ts-ignore
        if (state.posts && state.posts[postid]) {
            // @ts-ignore
            setTitle(state.posts[postid].title)
            // @ts-ignore
            setText(state.posts[postid].content)
            // @ts-ignore
            setPreview(state.posts[postid].preview)
        }
    }, [state.posts])

    const onDragStartHandler = (e: any) => {
        e.preventDefault()
        setDrag(true)
    }

    const onDragOverHandler = (e: any) => {
        e.preventDefault()
        setDrag(false)
    }

    const onDropHandler = (e: any) => {
        e.preventDefault()
        file.current = [...e.dataTransfer.files][0];
        setPreviewImg(true)
        setDrag(false)
    }

    const editPostHandler = () => {
        if (file.current == null || !title || !text) return alert('Ничего не изменнено');
        // console.log(file.current)
        form.append('title', title);
        form.append('img', file.current);
        form.append('content', text)
        // @ts-ignore
        form.append('postid', state.posts[postid].id)
        dispatch(editPost({data: form}))
    }

    return (
        <div className="ape">
            <div
                onDragStart={(e) => onDragStartHandler(e)}
                onDragLeave={(e) => onDragOverHandler(e)}
                onDragOver={(e) => onDragStartHandler(e)}
                onDrop={(e) => onDropHandler(e)}
                className={drag ? "ape__uploadarea ape__uploadarea_active" : "ape__uploadarea"}
                style={preview ? {
                    background: `url('${globalConfig.SERVER_HOST + '/' + preview}')`,
                    backgroundPosition: 'center',
                    backgroundSize: 'cover',
                    backgroundRepeat: 'no-repeat'
                } : {}}
            >
                {previewImg ? (
                    <>
                        <h1 className="ape__load-text">Фото загружено для обновления</h1>
                    </>
                ) : (
                    <>
                        <UploadIcon />
                        <p className="ape__text">Перетащите картинку сюда или загрузите</p>
                    </>
                )}
            </div>

            <Input
                lable='Введите название поста'
                placeholder='Введите название'
                type="text"
                value={title}
                setValue={setTitle}
            />

            <Input
                lable='Введите текст поста'
                placeholder='Введите текст'
                type="text"
                value={text}
                setValue={setText}
                textarea={true}
            />
            <Button onClick={editPostHandler}>
                Изменить пост
            </Button>
        </div >
    )
}

export default AdminPostEditor