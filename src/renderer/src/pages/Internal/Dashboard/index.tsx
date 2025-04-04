import electronLogo from '@renderer/assets/electron.svg'
import { BasePageProps } from '..'
import Flex from '@renderer/components/ui/Flex'
import { Button } from '@mui/material'

const DashboardPage: React.FC<BasePageProps> = (props): JSX.Element => {

  const navToNotePage = () => {
    props.openPage({ route: "Note", routeData: {} })
  }

  const navToSettingsPage = () => {
    props.openPage({ route: "Settings", routeData: {} })
  }

  const testModal = () => {
    props.openModal("ConfirmModal", {
        payload: {
            message: "Test message for confirmaton modal"
        }
    })
  }

  return (
    <Flex col fullHeight fullWidth align='center'>
      <img alt="logo" className="logo" src={electronLogo} />
      <div style={{ color: "black"}} className="text">Dashboard Page</div>
      <Flex>
        <Flex col gap={20}>
          <Button variant='outlined' onClick={navToNotePage}>Note Page</Button>
          <Button variant='outlined' onClick={navToSettingsPage}>Settings Page</Button>
          <Button onClick={testModal}>Test modal</Button>
        </Flex>
      </Flex>
    </Flex>
  )
}

export default DashboardPage
