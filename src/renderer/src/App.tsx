import { HashRouter as Router, Routes, Route } from 'react-router-dom'
import HomePage from './pages/Home'
import LoginPage from './pages/Login'
import MainPage from './pages/Main'
import RegisterPage from './pages/Register'
import { useCurrentUser } from './context/CurrentUser'

const App: React.FC = (): JSX.Element => {
  const { UserContextProvider } = useCurrentUser()
  return (
    <UserContextProvider>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/main" element={<MainPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Routes>
      </Router>
    </UserContextProvider>
  )
}

export default App
