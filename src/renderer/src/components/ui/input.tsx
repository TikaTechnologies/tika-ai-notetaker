import styled from '@emotion/styled'

const InputContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`

const Input = () => {
  return (
    <InputContainer>
      <input type="text" />
    </InputContainer>
  )
}

export default Input
