import _ from 'lodash'
import React from 'react'
import {
  useLocation,
  Location,
  useNavigate,
  useParams,
  NavigateFunction,
  Params
} from 'react-router-dom'
import PageMap, { BasePageProps, OpenPage } from '@renderer/pages/Internal'
import Box from '@mui/material/Box'
import CssBaseline from '@mui/material/CssBaseline'

type RouterProps = {
  location: Location
  navigate: NavigateFunction
  params: Readonly<Params>
}

interface GatewayProps extends RouterProps {}
export interface GatewayState {
  appHasError: boolean
  error: Error | null
  isLoading: boolean
  isLoggedIn: boolean
  openPage: OpenPage
}
export interface GatewayIndex {
  pageIndex: number
  tabIndex: number
}
interface GatewayUrlState {
  openPage: OpenPage
}

function withRouter<P>(Component: React.ComponentType<P & RouterProps>): React.FC<P> {
  const ComponentWithRouterProps = (props: P) => {
    const location = useLocation()
    const navigate = useNavigate()
    const params = useParams()
    return <Component {...props} location={location} navigate={navigate} params={params} />
  }
  return ComponentWithRouterProps
}

class MainPage extends React.Component<GatewayProps, GatewayState> {

  public static getDerivedStateFromError(error: Error) {
    console.warn(error)
    return { appHasError: true, error }
  }
  constructor(props: GatewayProps) {
    super(props)
    this.state = {
      appHasError: false,
      error: null,
      isLoading: true,
      isLoggedIn: false,
      openPage: this.getEntryRouteState().openPage
    }
  }
  private getEntryRouteState = (): GatewayUrlState => ({
    openPage: {
      route: 'Dashboard',
      routeData: {}
    }
  })
  private updateGatewayState = (payload: GatewayUrlState) => {
    this.setState(payload)
  }
  public openPage = (payload: OpenPage) => {
    this.updateGatewayState({ openPage: payload })
  }
  public render = () => {
    const Page: React.FC<BasePageProps> | React.ComponentClass<BasePageProps> =
      PageMap[this.state.openPage.route]
    return (
      <React.Suspense fallback={<div className="suspense-loading">Loading...</div>}>
        <div>
          <CssBaseline />
          {/* <AppHeader /> */}
          {/* <AppDrawer /> */}
          <Box
            component="main"
            sx={{
              display: 'flex',
              flexGrow: 1,
              position: 'absolute',
              left: 0, // this.state.drawerOpen ? drawerWidth : closedWidth,
              transition: 'left 0.25s ease',
              top: '68px',
              bottom: 0,
              right: 0,
              p: 3
            }}
          >
            <main
              style={{
                width: '100%',
                height: '100%',
                minWidth: 800
              }}
            >
              <Page
                route={this.state.openPage.route}
                routeData={this.state.openPage.routeData}
                openPage={this.openPage}
              />
            </main>
          </Box>
        </div>
      </React.Suspense>
    )
  }
}

export default withRouter(MainPage)
