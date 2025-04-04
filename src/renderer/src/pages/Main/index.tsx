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
import InternalRouter, { BasePageProps, OpenPage } from '@renderer/pages/Internal'
import ModalEngine, { ModalProps, ModalState, ModalsMap } from '@renderer/modals'
import Box from '@mui/material/Box'
import CssBaseline from '@mui/material/CssBaseline'

type InternalRouterProps = {
  location: Location
  navigate: NavigateFunction
  params: Readonly<Params>
}

export interface InternalRouterState {
  appHasError: boolean
  error: Error | null
  isLoading: boolean
  isLoggedIn: boolean
  openPage: OpenPage
  modal: ModalState<keyof ModalProps>
}

function withRouter<P>(Component: React.ComponentType<P & InternalRouterProps>): React.FC<P> {
  const ComponentWithRouterProps = (props: P) => {
    const location = useLocation()
    const navigate = useNavigate()
    const params = useParams()
    return <Component {...props} location={location} navigate={navigate} params={params} />
  }
  return ComponentWithRouterProps
}

class MainPage extends React.Component<InternalRouterProps, InternalRouterState> {
  public static getDerivedStateFromError(error: Error) {
    console.warn(error)
    return { appHasError: true, error }
  }
  constructor(props: InternalRouterProps) {
    super(props)
    this.state = {
      appHasError: false,
      error: null,
      isLoading: true,
      isLoggedIn: false,
      openPage: this.getEntryRouteState().openPage,
      modal: {
        open: false,
        name: undefined,
        props: undefined
      }
    }
  }
  private getEntryRouteState = (): Pick<InternalRouterState, "openPage"> => ({
    openPage: {
      route: 'Dashboard',
      routeData: {}
    }
  })
  private updateRouterState = (payload: Pick<InternalRouterState, "openPage">) => {
    this.setState(payload)
  }
  public openPage = (payload: OpenPage) => {
    this.updateRouterState({ openPage: payload })
  }
  public openModal = <T extends keyof typeof ModalsMap>(name: T, props?: ModalProps[T]) => {
    this.setState({
      modal: { open: true, name, props }
    })
  }
  public closeModal = () => {
    this.setState({
      modal: { open: false, name: undefined, props: undefined }
    })
  }
  private onModalConfirm = (data: any) => {
    if (
      this.state.modal.props?.onModalConfirm &&
      _.isFunction(this.state.modal.props.onModalConfirm)
    ) {
      this.state.modal.props.onModalConfirm(data)
    }
  }
  public render = () => {
    const Page: React.FC<BasePageProps> | React.ComponentClass<BasePageProps> =
      InternalRouter[this.state.openPage.route]
    return (
      <React.Suspense fallback={<div className="suspense-loading">Loading...</div>}>
        <div>
          <CssBaseline />
          <ModalEngine
            open={this.state.modal.open}
            name={this.state.modal.name}
            props={this.state.modal.props}
            payload={this.state.modal.props?.payload}
            onModalConfirm={this.onModalConfirm}
            close={this.closeModal}
          />
          {/* <AppHeader /> */}
          {/* <AppDrawer /> */}
          <Box
            component="main"
            sx={{
              display: 'flex',
              flexGrow: 1,
              position: 'absolute',
              left: 0, // closedDrawerWidth
              transition: 'left 0.25s ease',
              top: 0, // header height
              bottom: 0,
              right: 0,
              p: 3
            }}
          >
            <Page
              route={this.state.openPage.route}
              routeData={this.state.openPage.routeData}
              openPage={this.openPage}
              openModal={this.openModal}
            />
          </Box>
        </div>
      </React.Suspense>
    )
  }
}

export default withRouter(MainPage)
