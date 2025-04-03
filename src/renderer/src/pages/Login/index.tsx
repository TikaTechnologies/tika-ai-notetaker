// import Versions from '../../components/Versions'
import { useEffect, useRef } from 'react'
import electronLogo from '../../assets/electron.svg'
import { useNavigate } from 'react-router'
import Input from '@renderer/components/ui/Input'

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
      <div className="flex flex-col">
        <label htmlFor="user_email">Email</label>
        <input
          type="email"
          className="border border-white focus:border-red-500"
          id="user_email"
          ref={emailInputRef}
        />
        <label htmlFor="user_email">Password</label>
        <input
          type="password"
          className="border border-white  focus:border-red-500"
          id="user_password"
        />
      </div>
      <Input></Input>
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
