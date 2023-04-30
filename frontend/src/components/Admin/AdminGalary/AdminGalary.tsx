import React, { useEffect, useState, useRef } from 'react'
import './AdminGalary.scss'
import Button from '../../Ui/Button/Button'
import { useAppDispatch, useAppSelector } from '../../../hooks/redux'
import { deletePhoto, getPhotos } from '../../../redux/actions/galaryActions'
import globalConfig from '../../../configs/global.config'
import ModalContainer from '../../Modals/Container/ModalContainer'
import AddPhoto from '../../Modals/AddPhoto/AddPhoto'
import { reset } from '../../../redux/slices/galarySlice'
import EditPhoto from '../../Modals/EditPhoto/EditPhoto'
import ImageViewer from '../../Elements/ImageViewer/ImageViewer'

function AdminGalary() {

  const [isOpen, setIsOpen] = useState<number | null>();
  const photoHandler = (photoid: number, clear: boolean) => {
    if (clear) { setIsOpen(null); document.body.style.overflow = "auto"; }
    else { setIsOpen(photoid) }
  }

  const [editPhotoIsOpen, setEditPhotoIsOpen] = useState<boolean>(false);
  const [addPhotoIsOpen, setAddPhotoOpen] = useState<boolean>(false);
  const [doYouAgreeIsOpen, setDoYoutAgreeOpen] = useState<boolean>(false);

  const dispatch = useAppDispatch()
  const photos = useAppSelector(state => state.galary);
  const [curPhotoId, setCurPhotoId] = useState<number>(0)

  useEffect(() => {
    if (photos) {
      dispatch(reset())
    }
    dispatch(getPhotos())
  }, [])

  const modalDeleteHandler = () => {
    if (curPhotoId != null) {
      dispatch(deletePhoto({ photoid: curPhotoId }))
    }
  }

  const deletePhotoHandler = (id: number) => {
    setCurPhotoId(id)
    setDoYoutAgreeOpen(true)
  }

  const editPhotoHandler = (id: number) => {
    setCurPhotoId(id);
    setEditPhotoIsOpen(true)
  }

  return (
    <>
      <div className="ag">
        <h1 className="admin__title">Галерея</h1>
        <div className="admin__content">
          <h2 className="ag__min-title">Список добавленных фотографий</h2>
          <ul className="admin__list">
            {!!photos.photos ? (
              <>
                {photos.photos.map((item: any, index: any) => (
                  <React.Fragment key={index}>
                    <li className="ag__item admin__item" >
                      <div className="ag__info">
                        <div
                          style={{
                            background: `url('${globalConfig.SERVER_HOST + '/' + item.path}')`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center'
                          }}
                          className="ag__preview"
                          onClick={() => photoHandler(item.id, false)}
                        />
                        <div className="ag__text-info">
                          <h1 className="ag__item-title">{item.title}</h1>
                          <p className="ag__item-text">ID: {item.id}</p>
                          <p className="ag__item-text">Дата публикации: {item.createdAt}</p>
                        </div>
                      </div>
                      <div className="ag__manage">
                        <Button onClick={() => deletePhotoHandler(item.id)} type='delete'><></></Button>
                        <Button type='change' onClick={() => editPhotoHandler(index)}><></></Button>
                      </div>
                    </li>

                    {isOpen === item.id ? (
                      <ImageViewer photoHandler={photoHandler} isOpen={isOpen} item={item} />
                    ) : null}
                  </React.Fragment>
                ))}
              </>
            ) : (<h2>Фотографий нет</h2>)}
          </ul>
        </div>
        <Button
          onClick={() => setAddPhotoOpen(true)}>
          Добавить фотографию
        </Button>
      </div>

      {addPhotoIsOpen ? (
        <ModalContainer setVisible={setAddPhotoOpen} currentState={addPhotoIsOpen}>
          <AddPhoto />
        </ModalContainer>
      ) : null}

      {editPhotoIsOpen ? (
        <ModalContainer setVisible={setEditPhotoIsOpen} currentState={editPhotoIsOpen}>
          <EditPhoto photoid={curPhotoId} />
        </ModalContainer>
      ) : null}

      {doYouAgreeIsOpen && curPhotoId != null && photos.photos ? (
        <ModalContainer setVisible={setDoYoutAgreeOpen} currentState={doYouAgreeIsOpen}>
          <div className="admin__delwindow">
            <p className="admin__deltext">Вы уверены, что хотите удалить картину “{ }”?</p>
            <div className="admin__delbtns">
              <button className="admin__delbtn" onClick={modalDeleteHandler}>Удалить</button>
              <button className="admin__cancelbtn" onClick={() => setDoYoutAgreeOpen(false)}>Отмена</button>
            </div>
          </div>
        </ModalContainer>
      ) : null}
    </>
  )
}

export default AdminGalary

{/*  */ }