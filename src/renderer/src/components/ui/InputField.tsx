import styled from '@emotion/styled'
import React, { useState } from 'react'
import { Input, InputAdornment, IconButton, OutlinedInput } from '@mui/material'
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`
const InputLabel = styled.label`
  font-weight: 700;
`

interface InputProps {
  type: 'text' | 'email' | 'password'
  labelTextDisplayed: boolean
  labelText: string
  id: string
}

const InputField = React.forwardRef<HTMLInputElement, InputProps>(
  ({ type, labelTextDisplayed, labelText, id }, ref) => {
    const [showPassword, setShowPassword] = useState(false)

    const handleClickShowPassword = () => setShowPassword((show) => !show)

    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
      event.preventDefault()
    }

    const handleMouseUpPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
      event.preventDefault()
    }
    return (
      <InputContainer className="w-screen">
        {labelTextDisplayed ? <InputLabel htmlFor={id}>{labelText}</InputLabel> : ''}
        {type === 'password' ? (
          <OutlinedInput
            sx={{
              height: '2rem',
              width: '75%'
            }}
            id={id}
            type={showPassword ? 'text' : type}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label={showPassword ? 'hide the password' : 'display the password'}
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  onMouseUp={handleMouseUpPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
          ></OutlinedInput>
        ) : (
          <OutlinedInput
            id={id}
            inputRef={ref}
            type={type}
            sx={{
              height: '2rem',
              width: '75%'
            }}
          ></OutlinedInput>
        )}
      </InputContainer>
    )
  }
)

export default InputField
