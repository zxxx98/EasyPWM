import { createContext, useContext, useState, ReactNode } from 'react';
import { IUser } from '../interfaces';

interface UserContextType
{
  user: IUser;
  setUser: (user: IUser) => void;
  // 其他状态...
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: ReactNode })
{
  const [user, setUser] = useState<IUser>({
    id: '',
    name: '',
    password: '',
    tokens: [],
    role: "user",
    systemConfig: {
      language: "zh",
    }
  });

  const value = {
    user,
    setUser,
  };

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
}

// 自定义 hook 方便使用
export function useUser()
{
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
} 