import React, { useRef, useState } from 'react'
import './AdminPostCreator.scss'
import Input from '../../Ui/Input/Input'
import Button from '../../Ui/Button/Button'

import { ReactComponent as UploadIcon } from '../../../assets/icons/upload.svg';
import { createPost } from '../../../redux/actions/postsActions';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';

function AdminPostCreate() {

    const dispatch = useAppDispatch()
    const state = useAppSelector(state => state.posts);

    const form = new FormData();
    const [drag, setDrag] = useState<boolean>(false);
    const file = useRef<File | null>(null);
    const [previewImg, setPreviewImg] = useState<boolean>(false)

    const [title, setTitle] = useState<string>("")
    const [text, setText] = useState<string>("")

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

    const createPostHandler = () => {
        if (file.current == null || title == "" || text == "") return false;
        console.log(file.current)
        form.append('title', title);
        form.append('img', file.current);
        form.append('text', text)
        dispatch(createPost({ data: form }))
    }

    return (
        <div className="ape">
            <div
                onDragStart={(e) => onDragStartHandler(e)}
                onDragLeave={(e) => onDragOverHandler(e)}
                onDragOver={(e) => onDragStartHandler(e)}
                onDrop={(e) => onDropHandler(e)}
                className={drag ? "ape__uploadarea ape__uploadarea_active" : "ape__uploadarea"}
            >
                {previewImg ? (
                    <>
                        <h1 className="ape__load-text">Фото загружено</h1>
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
            <Button onClick={createPostHandler}>
                Создать пост
            </Button>
        </div >
    )
}

export default AdminPostCreate