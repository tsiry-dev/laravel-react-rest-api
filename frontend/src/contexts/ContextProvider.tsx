import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

import { TOKEN_KEY } from "../types/localestorageType";
import { getToken } from "../utils/auth";
import axiosClient from "../services/apiClient";

export type UserType = {
    id: number;
    name: string;
    email: string;
    role: string;
}

interface StateContextType {
    user: UserType | null;
    token: string | null;
    setToken: (token: string | null) => void;
    setUser: (user: UserType | null) => void;
}

const initialState: StateContextType = {
    user: null,
    token: null,
    setToken: () => {},
    setUser: () => {},
}

type PropsContextProvider = {
  children: ReactNode;
};

const StateContext = createContext(initialState);


export const ContextProvider = ({ children }: PropsContextProvider) => {

    const [user, setUser] = useState<UserType | null>(null);
    const [token, _setToken] = useState<string | null>(
        getToken()
    );

    const setToken = (token: string | null) => {
         _setToken(token);

         if(token) {
            localStorage.setItem(TOKEN_KEY, token);
         }else {
            localStorage.removeItem(TOKEN_KEY);
         }
    }

      useEffect(() => {
         let isMounted = true;

        if (token && !user) {
            axiosClient.get("/user")
                .then(({ data }) =>  {
                    if (isMounted) {
                        setUser(data.data);
                    }
                })
        }

        return () => {
           isMounted = false;
        };
      }, [token, user]);

    return (
        <StateContext.Provider value={{
             user,
             token,
             setToken,
             setUser,
        }}>
            {children}
        </StateContext.Provider>
    )
}

export const useStateContext = () => useContext(StateContext);
