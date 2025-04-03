import styled from '@emotion/styled'
import React, { useState } from 'react'
import { Input, InputAdornment, IconButton } from '@mui/material'
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
      <InputContainer>
        {labelTextDisplayed ? <InputLabel htmlFor={id}>{labelText}</InputLabel> : ''}
        {type === 'password' ? (
          <Input id={id} ref={ref} type={showPassword ? type : 'text'}></Input>
        ) : (
          <Input
            id={id}
            ref={ref}
            type={type}
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
          ></Input>
        )}
      </InputContainer>
    )
  }
)

export default InputField
