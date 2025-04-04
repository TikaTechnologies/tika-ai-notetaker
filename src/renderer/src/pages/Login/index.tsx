// import Versions from '../../components/Versions'
import { useEffect, useRef, useState } from 'react'

import { useNavigate } from 'react-router'
import InputField from '@renderer/components/ui/InputField'
import Flex from '@renderer/components/ui/Flex'
import { Alert, Button, Checkbox, FormControlLabel } from '@mui/material'

const LoginPage: React.FC = (): JSX.Element => {
  const navigate = useNavigate()
  const emailInputRef = useRef<HTMLInputElement>(null)
  const [userEmail, setUserEmail] = useState('')
  const [userPassword, setUserPassword] = useState('')
  const [rememberUser, setRememberUser] = useState(false)
  const [displayWarning, setDisplayWarning] = useState(false)

  const handleSetUserEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDisplayWarning(false)
    setUserEmail(e.target.value)
  }

  const handleSetUserPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDisplayWarning(false)
    setUserPassword(e.target.value)
  }

  const handleSetRememberUser = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDisplayWarning(false)
    setRememberUser(e.target.checked)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleLogin()
    }
  }

  const handleLogin = () => {
    if (userEmail && userPassword) {
      navToMainPage()
    } else {
      setDisplayWarning(true)
    }
    // TO DO Remember User in DB
  }

  const navToHomePage = () => {
    navigate('/home')
  }

  const navToMainPage = () => {
    navigate('/main')
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
        {/* Implement proper warning */}
        {displayWarning ? (
          <Alert severity="error" variant="filled">
            Missing Info
          </Alert>
        ) : (
          ''
        )}
        <Flex col>
          <InputField
            type="email"
            labelTextDisplayed={true}
            labelText="Email"
            id="user_email"
            ref={emailInputRef}
            handleChange={handleSetUserEmail}
            onKeyDown={handleKeyDown}
          ></InputField>
          <Flex justify="center">
            <FormControlLabel
              control={<Checkbox onChange={handleSetRememberUser} />}
              label="Remember Me"
            />
          </Flex>
        </Flex>
        <InputField
          type="password"
          labelTextDisplayed={true}
          labelText="Password"
          id="user_password"
          handleChange={handleSetUserPassword}
          onKeyDown={handleKeyDown}
        ></InputField>
        <Flex justify="center">
          <Button
            onClick={handleLogin}
            variant="contained"
            sx={{
              borderRadius: '2rem',
              width: '75%'
            }}
          >
            LOGIN
          </Button>
        </Flex>
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
