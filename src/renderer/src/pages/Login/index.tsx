// import Versions from '../../components/Versions'
import { useEffect, useRef } from 'react'
import electronLogo from '../../assets/electron.svg'
import { useNavigate } from 'react-router'
import InputField from '@renderer/components/ui/InputField'
import Flex from '@renderer/components/ui/Flex'

const LoginPage: React.FC = (): JSX.Element => {
  const navigate = useNavigate()
  const emailInputRef = useRef<HTMLInputElement>(null)

  const navToHomePage = () => {
    navigate('/home')
  }

  useEffect(() => {
    if (emailInputRef.current) {
      emailInputRef.current.focus()
    }
  }, [])

  return (
    <>
      <img alt="logo" className="logo" src={electronLogo} />
      <div className="text">Login</div>
      <Flex col gap={12}>
        <InputField
          type="email"
          labelTextDisplayed={true}
          labelText="Email"
          id="user_email"
          ref={emailInputRef}
        ></InputField>
        <InputField
          type="password"
          labelTextDisplayed={true}
          labelText="Password"
          id="user_password"
        ></InputField>
      </Flex>
      <div className="actions">
        <div className="action">
          <span onClick={navToHomePage}>Return</span>
        </div>
      </div>
      {/* <Versions></Versions> */}
    </>
  )
}

export default LoginPage
