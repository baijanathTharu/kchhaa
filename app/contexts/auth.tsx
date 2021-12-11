import { createContext, ReactNode, useContext } from 'react';

interface IAuth {
  user: {
    sub: string;
    email: string;
  };
}
const AuthContext = createContext<IAuth | null>(null);

export const AuthProvider = ({
  children,
  auth,
}: {
  children: ReactNode;
  auth: IAuth;
}) => {
  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
};

export const useAuth = () => ({ data: useContext(AuthContext) });
