import { createContext, useContext, useEffect, useMemo, useState } from 'react'

export type ID = string & { __brand: 'id' }

const CurrentUserContext = createContext({
  currentUser: {} as UserAccount,
  setCurrentUser: (_user: UserAccount) => {}
})

export interface UserAccount {
  id: ID
  email: string
  userName?: string
  password: string
}

export const useCurrentUser = () => {
  const [user, setUser] = useState({} as UserAccount)

  const contextValue = useMemo(() => ({ currentUser: user, setCurrentUser: setUser }), [user])

  const { currentUser, setCurrentUser } = useContext(CurrentUserContext)

  const getUserData = (token: string) => {}

  const refreshUserData = () => {}

  useEffect(() => {
    if (currentUser) {
      return
    }
    getUserData('')
  }, [])

  const UserContextProvider = ({ children }: { children: React.ReactNode }) => {
    return (
      <CurrentUserContext.Provider value={contextValue}>{children}</CurrentUserContext.Provider>
    )
  }

  return {
    currentUser,
    setCurrentUser,
    refreshUserData,
    UserContextProvider,
  } as const
}
