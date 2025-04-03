// import Versions from '../../components/Versions'
import { useEffect, useRef, useState } from 'react'

import { useNavigate } from 'react-router'
import InputField from '@renderer/components/ui/InputField'
import Flex from '@renderer/components/ui/Flex'
import { Button, Checkbox } from '@mui/material'

const LoginPage: React.FC = (): JSX.Element => {
  const navigate = useNavigate()
  const emailInputRef = useRef<HTMLInputElement>(null)
  const [userEmail, setUserEmail] = useState('')
  const [userPassword, setUserPassword] = useState('')

  const handleSetUserEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserEmail(e.target.value)
  }

  const handleSetUserPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserPassword(e.target.value)
  }

  const handleLogin = () => {
    console.log('EMAIL')
    console.log(userEmail)
    console.log('PASSWORD')
    console.log(userPassword)
  }

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
      <div className="text">Login</div>
      <Flex col gap={12}>
        <Flex col>
          <InputField
            type="email"
            labelTextDisplayed={true}
            labelText="Email"
            id="user_email"
            ref={emailInputRef}
            handleChange={handleSetUserEmail}
          ></InputField>
          <Flex justify="center" width={'75%'}>
            <Checkbox color="primary"></Checkbox>
          </Flex>
        </Flex>

        <InputField
          type="password"
          labelTextDisplayed={true}
          labelText="Password"
          id="user_password"
          handleChange={handleSetUserPassword}
        ></InputField>
        <Button onClick={handleLogin}>LOGIN</Button>
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
