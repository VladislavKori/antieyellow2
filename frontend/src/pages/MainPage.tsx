import React from 'react'

import SmtImage from '../assets/image.jpg';
import Preview from '../components/Preview/Preview';
import Themes from '../components/Home/Themes/Themes';
import Author from '../components/Home/Author/Author';

function MainPage() {
  return (
    <>
        <Preview />
        <Themes />
        <Author />
    </>
  )
}

export default MainPage