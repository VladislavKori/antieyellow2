import React, { useState, useRef, useEffect } from 'react'
import './AddPhoto.scss'
import Input from '../../Ui/Input/Input'
import Button from '../../Ui/Button/Button';

import { ReactComponent as UploadIcon } from '../../../assets/icons/upload.svg'
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import { createPhoto, getPhotos } from '../../../redux/actions/galaryActions';
import { reset } from '../../../redux/slices/galarySlice';

function AddPhoto() {

    const galary = useAppSelector(state => state.galary)
    const dispatch = useAppDispatch();

    const form = new FormData();
    const file = useRef<File | null>(null);
    const [drag, setDrag] = useState<boolean>(false);
    const [previewImg, setPreviewImg] = useState<boolean>(false)
    const [title, setTitle] = useState<string>("");

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

    const addPhoto = () => {
        if (file.current == null || title == "") return false;
        form.append('title', title);
        form.append('img', file.current);
        dispatch(createPhoto({ data: form }))
    }

    useEffect(() => {
        if (galary.error) {
            alert(galary.error);
            dispatch(reset())
        } else {
            dispatch(getPhotos())
        }
    }, [galary.error, dispatch])

    return (
        <div className="addphoto">
            <div
                onDragStart={(e) => onDragStartHandler(e)}
                onDragLeave={(e) => onDragOverHandler(e)}
                onDragOver={(e) => onDragStartHandler(e)}
                onDrop={(e) => onDropHandler(e)}
                className={drag ? "addphoto__upload addphoto__upload_active" : "addphoto__upload"}        >
                {previewImg ? (
                    <>
                        <h1 style={{color: 'white'}}>Файл загружен</h1>
                    </>
                ) : (
                    <div className="addphoto__upload-inside">
                        <UploadIcon />
                        <p className="addphoto__upload-text">Перетащите картинку сюда или <span className="addphoto__upload-text_yellow">загрузите</span></p>
                    </div>
                )}
            </div>
            <div className="addphoto__content">
                <Input
                    lable="Название"
                    placeholder='Введите название'
                    type="text"
                    setValue={setTitle}
                    value={title}
                />
                <Button
                    onClick={addPhoto}>
                    Добавить фотографию
                </Button>
            </div>
        </div>
    )
}

export default AddPhoto