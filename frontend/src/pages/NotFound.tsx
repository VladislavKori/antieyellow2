import React from 'react'
import { Link } from 'react-router-dom'
import '../styles/page/notfound.scss'

function NotFound() {
  return (
    <div className="notfound">
        <h1 className="notfound__title">404</h1>
        <h1 className="notfound__text">Старница не найдена</h1>
        <Link className="notfound__link" to={'/'}>Вернуться</Link>
    </div>
  )
}

export default NotFound