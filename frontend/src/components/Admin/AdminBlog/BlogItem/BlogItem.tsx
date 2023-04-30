import React, { useState } from 'react'
import './BlogItem.scss'
import Button from '../../../Ui/Button/Button'
import globalConfig from '../../../../configs/global.config'
import ImageViewer from '../../../Elements/ImageViewer/ImageViewer'
import ModalContainer from '../../../Modals/Container/ModalContainer'
import { useAppDispatch, useAppSelector } from '../../../../hooks/redux'
import { deletePost } from '../../../../redux/actions/postsActions'
import { useNavigate } from 'react-router-dom'

interface BlogItem {
  title: string,
  content: string
  createdAt: string
  preview: string,
  id: number
  index: number
}

function BlogItem({ title, createdAt, content, preview, id, index }: BlogItem) {

  const navigator = useNavigate()

  const dispatch = useAppDispatch();
  const posts = useAppSelector(state => state.posts)

  const [isOpen, setIsOpen] = useState<number | null>();
  const photoHandler = (photoid: number, clear: boolean) => {
    if (clear) { setIsOpen(null); document.body.style.overflow = "auto"; }
    else { setIsOpen(photoid) }
  }
  // Написать ограничитель контента для описания
  const shortContent = content.slice(0, 400) + "...";

  const [doYouAgreeIsOpen, setDoYoutAgreeOpen] = useState<boolean>(false);
  const modalDeleteHandler = () => {
    if (id != null) {
      dispatch(deletePost({ postid: id }))
    }
  }

  return (
    <>
      <div className="blogitem">
        <div
          className="blogitem__preview"
          style={{
            background: `url('${globalConfig.SERVER_HOST + '/' + preview}')`,
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            backgroundSize: 'cover',
          }}
          onClick={() => photoHandler(id, false)}
        />
        <div className="blogitem__info">
          <h1 className="blogitem__title">{title}</h1>
          <p className="blogitem__date">Опубликовано: {createdAt}</p>
          <p className="blogitem__text">{shortContent}</p>
        </div>
        <div className="blogitem__tools">
          <Button
            type="delete"
            onClick={() => setDoYoutAgreeOpen(true)}
          ><></></Button>
          <Button type="change"
            onClick={() => navigator(`edit/${index}`)}>
            <></>
          </Button>
        </div>
      </div>
      {isOpen === id ? (
        <ImageViewer photoHandler={photoHandler} isOpen={isOpen} item={{ id: id, path: preview }} />
      ) : null}

      {doYouAgreeIsOpen && id != null && posts.posts ? (
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

export default BlogItem