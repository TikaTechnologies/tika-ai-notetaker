import electronLogo from '../../assets/electron.svg'
import { useNavigate } from 'react-router'
import { Input } from '@mui/material'

const RegisterPage: React.FC = (): JSX.Element => {
  const navigate = useNavigate()

  const navToHomePage = () => {
    navigate('/home')
  }

  return (
    <>
      <img alt="logo" className="logo" src={electronLogo} />
      <div className="text">Register Page</div>
      <Input type="email" placeholder="Email" />
      <div className="actions">
        <div className="action">
          <span onClick={navToHomePage}>Return</span>
        </div>
      </div>
    </>
  )
}

export default RegisterPage
