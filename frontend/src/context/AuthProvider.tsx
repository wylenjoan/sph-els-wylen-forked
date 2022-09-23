import { createContext, useState } from "react";
import User from "../interfaces/user";

const AuthContext = createContext<{
  user: User
  setUser: React.Dispatch<React.SetStateAction<User>>
}>({
  user: {
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    is_admin: false,
  },
  setUser: () => { }
});

export const AuthProvider = ({ children }: any) => {
  const [user, setUser] = useState<User>({
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    is_admin: false,
  });

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthContext;
