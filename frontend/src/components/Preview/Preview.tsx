import React from 'react'
import './Preview.scss'
import BookModel from './BookModel/BookModel'
import { ReactComponent as Quote } from '../../assets/HomePage/quote.svg'
import Button from '../Ui/Button/Button'

function Preview() {
  return (
    <div className="preview">
        <div className="preview__info">
          <h1 className="preview__title">Antiyellow</h1>
          <Quote className="preview__quote" />
          <p className="preview__text">Короткие слова автора что-то типа анотации</p>
          <span className="preview__dash"></span>
          <p className="preview__authorname">Дмитрий Матросов</p>
          <div className="preview__btns">
            <button
              className="preview__btn-fragment"
            >
              Скачать Фрагмент
            </button>
            <a 
              href="https://www.donationalerts.com/"
              className="preview__link"
            >
              Поддержать автора
            </a>
          </div>
        </div>
        <div className="preview__model">
            <BookModel />
        </div>
    </div>
  )
}

export default Preview