import React from 'react'

function Error(error: any) {
  console.log(error.error.message)
  return (
    <div>Error {error.error}</div>
  )
}

export default Error