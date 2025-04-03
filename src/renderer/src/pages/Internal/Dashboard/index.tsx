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

  return (
    <Flex col fullHeight fullWidth align='center'>
      <img alt="logo" className="logo" src={electronLogo} />
      <div style={{ color: "black"}} className="text">Dashboard Page</div>
      <Flex>
        <Flex col gap={20}>
          <Button variant='outlined' onClick={navToNotePage}>Note Page</Button>
          <Button variant='outlined' onClick={navToSettingsPage}>Settings Page</Button>
        </Flex>
      </Flex>
    </Flex>
  )
}

export default DashboardPage
