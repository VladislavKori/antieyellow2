import React, { useState } from 'react'
import './Preview.scss'
import BookModel from './BookModel/BookModel'
import { ReactComponent as Quote } from '../../assets/HomePage/quote.svg'
import Button from '../Ui/Button/Button'
import { useAppDispatch, useAppSelector } from '../../hooks/redux'
import globalConfig from '../../configs/global.config'

function Preview() {

  const state = useAppSelector(state => state.commonSettings)
  const dispatch = useAppDispatch()

  return (
    <div className="preview">
      <div className="preview__info">
        <h1 className="preview__title">Antiyellow</h1>
        <Quote className="preview__quote" />
        <p className="preview__text">
          «Memento Mori» и «Sic Mundus Creatus Est»:<br />
          Пусть эти слова наполнят вашу душу;<br />
          Ибо мы погружаемся в мир философско-психологического проекта «AntiYellow»
        </p>
        <span className="preview__dash"></span>
        <p className="preview__authorname">Дмитрий Матросов</p>
        <div className="preview__btns">
          {state.commonSettings ? (
            <>
              <a
                href={state.commonSettings.filepath != "" ? globalConfig.SERVER_HOST + '/' + state.commonSettings.filepath : ""}
                className="preview__btn-fragment"
              >
                Скачать Фрагмент
              </a>
              <a
                href={state.commonSettings.donationlink != "" ? String(state.commonSettings.donationlink) : ""}
                className="preview__link"
              >
                Поддержать автора {state.commonSettings.dontaionlink}
              </a>
            </>
          ) : null}
        </div>
      </div>
      <div className="preview__model">
        <h1 className="preview__title preview__mobile">Antiyellow</h1>
        <BookModel />
      </div>
    </div>
  )
}

export default Preview