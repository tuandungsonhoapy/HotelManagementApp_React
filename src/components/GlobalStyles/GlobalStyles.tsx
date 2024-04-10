import './GlobalStyles.scss'

interface GlobalStylesProps {
  children: React.ReactNode
}

const GlobalStyles = ({ children }: GlobalStylesProps) => <div className='GlobalStyles'>{children}</div>

export default GlobalStyles
