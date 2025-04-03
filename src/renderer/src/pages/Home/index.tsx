import electronLogo from '../../assets/electron.svg'
import { useNavigate } from 'react-router';

const HomePage: React.FC = (): JSX.Element => {

  const navigate = useNavigate()

  const navToMainApp = () => {
    navigate("/main")
  }
  const navToLoginPage = () => {
    navigate("/login")
  }
  const navToRegisterPage = () => {
    navigate("/register")
  }

  return (
    <>
      <img alt="logo" className="logo" src={electronLogo} />
      <div className="text">TIKA AI Notetaker</div>
      <div className="actions">
        <div className="action">
          <span onClick={navToMainApp}>Dev</span>
        </div>
        <div className="action">
          <span onClick={navToLoginPage}>Login</span>
        </div>
        <div className="action">
          <span onClick={navToRegisterPage}>Register</span>
        </div>
      </div>
    </>
  )
}

export default HomePage
