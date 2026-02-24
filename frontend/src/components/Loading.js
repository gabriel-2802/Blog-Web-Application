import React from 'react'
import CircularProgress from '@mui/material/CircularProgress';
import '../styles/loading.css'

function Loading() {
  return (
    <div className='loading'>
      <CircularProgress />
    </div>
  )
}

export default Loading
