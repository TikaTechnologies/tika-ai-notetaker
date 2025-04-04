import Dashboard from './Dashboard'
import Note from './Note'
import Settings from './Settings'
import { ModalProps, ModalsMap } from "@renderer/modals";

const InternalRouter = {
  Dashboard,
  Note,
  Settings
}

export interface OpenPage {
  route: keyof typeof InternalRouter
  routeData: {
    id?: string
  }
}

export interface BasePageProps<T extends OpenPage = OpenPage> {
  route: OpenPage['route']
  routeData: T['routeData']
  openPage: (payload: OpenPage) => void
  openModal: <T extends keyof typeof ModalsMap>(
    name: T,
    props?: ModalProps[T]
  ) => void;
}

export default InternalRouter
