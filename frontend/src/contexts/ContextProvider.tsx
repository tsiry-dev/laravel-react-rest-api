import { createContext, useContext, useState, type ReactNode } from "react";

import { TOKEN_KEY } from "../types/localestorageType";
import { getToken } from "../utils/auth";

type UserType = {
    name: string;
    email: string;
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

    const [user, setUser] = useState<UserType | null>({
        name: 'John Doe',
        email: 'john@doe.com',
    });
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
