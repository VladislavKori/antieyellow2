import React, { useState } from 'react'
import './PostPreview.scss'
import { Link } from 'react-router-dom'

import { ReactComponent as ShareIcon } from '../../../assets/icons/share.svg'

import globalConfig from '../../../configs/global.config'
import Button from '../../Ui/Button/Button'

interface IPost {
    id: number
    title: string
    content: string
    preview: string,
    createdAt: string,
    updatedAt: string
}

function PostPreview({ data }: { data: Array<IPost> }) {

    const [copySuccess, setCopySuccess] = useState<number | null>(null);
    const shareHandler = async (id: number) => {
        await navigator.clipboard.writeText(location.href + `/${id}`);
        setCopySuccess(id)
        setTimeout(() => {
            setCopySuccess(null)
        }, 2000)
    }

    return (
        <div className="pp__container">
            {data.map((item, index) => (
                <React.Fragment key={index}>
                    <div className="pp">
                        <div
                            style={{
                                background: `url(${globalConfig.SERVER_HOST + item.preview})`,
                                backgroundPosition: "center",
                                backgroundSize: "cover",
                                backgroundRepeat: 'no-repeat'
                            }}
                            className="pp__preview"
                        ></div>
                        <div className="pp__info">
                            <h1 className="pp__title">{item.title}</h1>
                            <p className="pp__date">{item.createdAt}</p>
                            <p className="pp__descript">{item.content}</p>

                            <div className="pp__btns">
                                <Link
                                    className="pp__btn"
                                    to={"/blog/" + item.id}
                                >
                                    Читать
                                </Link>
                                <button
                                    onClick={() => shareHandler(item.id)}
                                    className="pp__btn pp__btn_share"
                                >
                                    <ShareIcon />
                                </button>
                                {copySuccess == item.id ? (
                                    <p className="pp__message">Скопировано</p>
                                ) : null}
                            </div>
                        </div>
                    </div>
                </React.Fragment>
            ))}
        </div>
    )
}

export default PostPreview