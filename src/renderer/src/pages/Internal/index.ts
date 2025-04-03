import Dashboard from './Dashboard'
import Note from './Note'
import Settings from './Settings'

const PageMap = {
  Dashboard,
  Note,
  Settings
}

export interface OpenPage {
  route: keyof typeof PageMap
  routeData: {
    id?: string
  }
}

export interface BasePageProps<T extends OpenPage = OpenPage> {
  route: OpenPage['route']
  routeData: T['routeData']
  openPage: (payload: OpenPage) => void
}

export default PageMap
