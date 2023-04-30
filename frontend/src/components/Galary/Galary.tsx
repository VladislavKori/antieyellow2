import React, { useEffect, useState } from 'react'
import './Galary.scss'

import globalConfig from '../../configs/global.config'

import { ReactComponent as CloseIcon } from '../../assets/icons/close.svg'
import ImageViewer from '../Elements/ImageViewer/ImageViewer'

interface IPhoto {
    id: 1
    title: string
    path: string
    fileid: number
    createdAt: string
    updatedAt: string
}

interface GalaryProps {
    photos: Array<IPhoto>
}

function Galary({ photos }: GalaryProps) {

    const [isOpen, setIsOpen] = useState<number | null>();
    const photoHandler = (photoid: number, clear: boolean) => {
        if (clear) { setIsOpen(null); document.body.style.overflow = 'auto' }
        else { setIsOpen(photoid) }
    }

    return (
        <>
        <div className="galary">
            {photos.map((item, index) => (
                <React.Fragment key={index}>
                    <div
                        onClick={() => photoHandler(item.id, false)}
                        className="galary__img-container"
                    >
                        <img className="galary__img" src={globalConfig.SERVER_HOST + "/" + item.path} />
                    </div>

                    {isOpen === item.id ? (
                        <ImageViewer photoHandler={photoHandler} isOpen={isOpen} item={item} />
                    ) : null}

                </React.Fragment>
            ))}
        </div>
        </>
    )
}

export default Galary