import React, {useEffect} from 'react'
import Galary from '../components/Galary/Galary'
import { useAppDispatch, useAppSelector } from '../hooks/redux'
import { getPhotos } from '../redux/actions/galaryActions';
import Loader from '../components/Elements/Loader/Loader';

function PhotoGalary() {

  const dispatch = useAppDispatch();
  useEffect( () => {
    dispatch(getPhotos())
  }, [])

  const {
    photos,
    loading,
    error,
    success
  } = useAppSelector(state => state.galary)
  
  return (
    <>
      {loading ? <Loader /> : null}
      {error ? (
        <h1>Loader Error</h1>
      ) : null}
      {photos ? (
        <Galary photos={photos} />
      ) : null}
    </>
  )
}

export default PhotoGalary