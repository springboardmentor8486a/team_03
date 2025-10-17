import React from 'react'

const GradientButton = ({name,width,height}) => {
  return (
    <button className=' px-6 py-2 rounded-lg text-white font-semibold bg-gradient-to-r from-purple-500 to-green-500' style={{width,height}}>{name}</button>
  )
}

export default GradientButton