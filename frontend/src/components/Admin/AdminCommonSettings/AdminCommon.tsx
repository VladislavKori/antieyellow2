import React, { useState, useEffect, useRef } from 'react'
import './AdminCommon.scss'
import Input from '../../Ui/Input/Input';
import Button from '../../Ui/Button/Button';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import { changeCommonSettings, getCommonSettings } from '../../../redux/actions/sitesetActions';

function AdminCommon() {

    const [vklink, setVklink] = useState<string>("");
    const [tglink, setTglink] = useState<string>("");
    const [donateLink, setDonateLink] = useState<string>("");

    const [drag, setDrag] = useState<boolean>(false);
    const file = useRef<File | null>(null);
    const [fileData, setFileData] = useState<boolean>(false)

    const form = new FormData();
    const commonset = useAppSelector(state => state.commonSettings);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(getCommonSettings())
    }, [])

    useEffect(() => {
        if (commonset.commonSettings) {
            setVklink(commonset.commonSettings.vklink)
            setTglink(commonset.commonSettings.tglink)
            setDonateLink(commonset.commonSettings.donationlink)
        }
    }, [commonset.commonSettings])

    const saveChangesHandler = () => {
        if (commonset.commonSettings.vklink == vklink &&
            commonset.commonSettings.tglink == tglink &&
            commonset.commonSettings.donationlink == donateLink
            ) {
            return alert("Заполните все поля")
        }

        if (file.current != null) {
            form.append('img', file.current);
        } 

        form.append('vklink', vklink);
        form.append('tglink', tglink);
        form.append('donation', donateLink);

        dispatch(changeCommonSettings(form))
    }

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
        setFileData(true)
        setDrag(false)
    }

    return (
        <div className="ac">
            <h1 className="admin__title">Общие Настройки</h1>
            <div className="admin__content ac__content">
                <Input
                    lable="Ссылка на ВКонтакте"
                    placeholder="https://donation-alerts/329429"
                    value={vklink}
                    setValue={setVklink}
                    type="text"
                />

                <Input
                    lable="Ссылка на Telegram"
                    placeholder="https://donation-alerts/329429"
                    value={tglink}
                    setValue={setTglink}
                    type="text"
                />

                <Input
                    lable="Ссылка на Donationalerts"
                    placeholder="https://donation-alerts/329429"
                    value={donateLink}
                    setValue={setDonateLink}
                    type="text"
                />

                <div 
                    className="ac__upload-area" 
                    onDragStart={(e) => onDragStartHandler(e)}
                    onDragLeave={(e) => onDragOverHandler(e)}
                    onDragOver={(e) => onDragStartHandler(e)}
                    onDrop={(e) => onDropHandler(e)}>
                    {fileData ? (
                        <h1 className="ac__upload-text">Файл загружен</h1>
                    ) : (
                        <h1 className="ac__upload-text">Перетащите файл</h1>
                    )}
                </div>
            </div>
            <Button onClick={saveChangesHandler}>Сохранить изменения</Button>
        </div>
    )
}

export default AdminCommon