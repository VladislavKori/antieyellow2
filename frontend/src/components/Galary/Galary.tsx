import React, { useState } from 'react'
import './Galary.scss'

import globalConfig from '../../configs/global.config'

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

        if (clear) { setIsOpen(null) }
        else { setIsOpen(photoid) }

        if (!!isOpen) { document.body.style.overflow = "auto" }
        else { document.body.style.overflow = "hidden" }
    }

    return (
        <div className="galary">
            {photos.map((item, index) => (
                <React.Fragment key={index}>
                    <div
                        onClick={() => photoHandler(item.id, false)}
                        className="galary__img-container"
                    >
                        <img className="galary__img" src={globalConfig.SERVER_HOST + item.path} />
                    </div>

                    {isOpen === item.id ? (
                        <div className="galary__modal">
                            <div
                                onClick={() => photoHandler(item.id, true)}
                                className="galary__modal-bg"
                            ></div>
                            <img className="galary__modal-img" src={globalConfig.SERVER_HOST + item.path} />
                        </div>
                    ) : null}

                </React.Fragment>
            ))}
        </div>
    )
}

export default Galary