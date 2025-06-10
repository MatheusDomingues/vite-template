import { IAuth } from "@/providers/AuthProvider";
import React, { useContext } from "react";

export const AuthContext = React.createContext<IAuth>({} as IAuth);

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth deve ser usado por volta das rotas.");
  }

  return context;
};
