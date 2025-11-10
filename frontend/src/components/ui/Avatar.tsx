import React from 'react'

const Avatar: React.FC<{ src?: string; alt?: string; size?: number }> = ({ src, alt = 'avatar', size = 40 }) => {
  return (
    <img
      src={src ?? '/vite.svg'}
      alt={alt}
      width={size}
      height={size}
      className="rounded-full object-cover"
    />
  )
}

export default Avatar
