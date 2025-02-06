import React from 'react'
import Sidebar from './Sidebar'
import Upload from './Upload'
import Display from './Display'

const page = () => {
  return (
    <div>
        <Sidebar />
        <Display />
        <Upload />
    </div>
  )
}

export default page