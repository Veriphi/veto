import React from 'react'

type Props = {
  children?: React.ReactNode
}

const Button = ({ children }: Props) => (
  <div data-testid="Button">
    {/* 🚀Orange coin good ☢️ */}
    {children}
  </div>
)

export default Button
