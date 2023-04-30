import React, { useEffect, useState } from 'react'
import './ImageViewer.scss'
import globalConfig from '../../../configs/global.config'
import { ReactComponent as CloseIcon } from '../../../assets/icons/close.svg'


function ImageViewer({photoHandler, isOpen, item}: any) {

    useEffect(() => {
        if (!isOpen) { document.body.style.overflow = "auto" }
        else { document.body.style.overflow = "hidden" }
    }, [isOpen])

    useEffect(() => {
        const closeHandler = (e: KeyboardEventInit) => {
            if (e.code == "Escape") {
                photoHandler(item.id, true)
            }
        }

        window.addEventListener("keydown", closeHandler)
        return () => {
            window.removeEventListener("keydown", closeHandler);
        };
    })

    return (
        <div className="imgviewer__modal">
            <button
                className="imgviewer__modal-close"
                onClick={() => photoHandler(item.id, true)}
            >
                <CloseIcon />
            </button>
            <div
                onClick={() => photoHandler(item.id, true)}
                className="imgviewer__modal-bg"
            ></div>
            <img className="imgviewer__modal-img" src={globalConfig.SERVER_HOST + "/" + item.path} />
            <p className="imgviewer__modal-hint">Для закрытия нажмите ESC или кликните на затемнённую область</p>
        </div>
    )
}

export default ImageViewer