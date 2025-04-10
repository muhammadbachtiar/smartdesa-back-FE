import { createContext, useState, ReactNode } from "react";

interface UserContextType {
  isLoging: boolean,
  setLoginStatus: (status: boolean) => void;
}

export const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [isLoging, setIsLogin] = useState<boolean>(false);

  const setLoginStatus = (status: boolean) => {
    setIsLogin(status);
  }

  return <UserContext.Provider value={{ isLoging, setLoginStatus }}>{children}</UserContext.Provider>;
};
