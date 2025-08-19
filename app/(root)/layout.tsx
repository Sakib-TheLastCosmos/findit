import React from 'react'
import Navbar from '../../components/Navbar'

const layout = ( { children } : { children: React.ReactNode } ) => {
  return (
    <>
      <Navbar />
      <main>{children}</main>
    </>
  )
}

export default layout