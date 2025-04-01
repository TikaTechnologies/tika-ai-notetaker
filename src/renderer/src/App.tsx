import Versions from './components/Versions'
import electronLogo from './assets/electron.svg'

const App: React.FC = (): JSX.Element => {

  const navToMainApp = () => {}
  const navToLoginPage = () => {}
  const navToRegisterPage = () => {}

  return (
    <>
      <img alt="logo" className="logo" src={electronLogo} />
      <div className="text">
        TIKA AI Notetaker
      </div>
      <div className="actions">
        <div className="action">
          <span onClick={navToMainApp}>
            Dev
          </span>
        </div>
        <div className="action">
          <span onClick={navToLoginPage}>
            Login
          </span>
        </div>
        <div className="action">
          <span onClick={navToRegisterPage}>
            Register
          </span>
        </div>
      </div>
      <Versions></Versions>
    </>
  )
}

export default App
