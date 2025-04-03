import Versions from '../../components/Versions'
import electronLogo from '../../assets/electron.svg'
import { useNavigate } from 'react-router'
import { Input } from '@renderer/components/ui/input'

const RegisterPage: React.FC = (): JSX.Element => {
  const navigate = useNavigate()

  const navToHomePage = () => {
    navigate('/home')
  }

  return (
    <>
      <img alt="logo" className="logo" src={electronLogo} />
      <div className="text">Register Page</div>
      <Input variant="primary" type="email" placeholder="Email" />
      <div className="actions">
        <div className="action">
          <span onClick={navToHomePage}>Return</span>
        </div>
      </div>
      <Versions></Versions>
    </>
  )
}

export default RegisterPage
