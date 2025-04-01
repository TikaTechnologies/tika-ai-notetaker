import Versions from '../../components/Versions'
import electronLogo from '../../assets/electron.svg'
import { useNavigate } from 'react-router'

const RegisterPage: React.FC = (): JSX.Element => {
  const navigate = useNavigate()

  const navToHomePage = () => {
    navigate('/home')
  }

  return (
    <>
      <img alt="logo" className="logo" src={electronLogo} />
      <div className="text">Register Page</div>
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
