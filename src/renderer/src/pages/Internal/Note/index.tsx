import electronLogo from '@renderer/assets/electron.svg'
import { BasePageProps } from '..'
import Flex from '@renderer/components/ui/Flex'
import { Button } from '@mui/material'

const NotePage: React.FC<BasePageProps> = (props): JSX.Element => {

  const navToDashboardPage = () => {
    props.openPage({ route: "Dashboard", routeData: {} })
  }

  const navToSettingsPage = () => {
    props.openPage({ route: "Settings", routeData: {} })
  }

  return (
    <Flex col fullHeight fullWidth align='center'>
      <img alt="logo" className="logo" src={electronLogo} />
      <div style={{ color: "black"}} className="text">Note Page</div>
      <Flex>
        <Flex col gap={20}>
          <Button variant='outlined' onClick={navToDashboardPage}>Dashboard Page</Button>
          <Button variant='outlined' onClick={navToSettingsPage}>Settings Page</Button>
        </Flex>
      </Flex>
    </Flex>
  )
}

export default NotePage
