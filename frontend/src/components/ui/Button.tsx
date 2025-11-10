import React from 'react'

const Button: React.FC<React.ButtonHTMLAttributes<HTMLButtonElement>> = ({ className = '', children, ...rest }) => {
  return (
    <button
      {...rest}
      className={`inline-flex items-center justify-center rounded-md bg-primary px-3 py-1 text-sm text-primary-foreground ${className}`}
    >
      {children}
    </button>
  )
}

export default Button
