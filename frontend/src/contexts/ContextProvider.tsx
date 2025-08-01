import { createContext, useContext, useState } from "react";

const TOKEN_KEY: string = "ACCESS_TOKEN";

type UserType = {
    name: string;
    email: string;
}

interface StateContextType {
    user: UserType | null;
    token: string | null;
    setToken: (token: string) => void;
    setUser: (user: UserType) => void;
}

const initialState: StateContextType = {
    user: null,
    token: null,
    setToken: () => {},
    setUser: () => {},
}

const StateContext = createContext(initialState);


export const ContextProvider = ({ children }: any) => {

    const [user, setUser] = useState<UserType | null>({
        name: 'John Doe',
        email: 'john@doe.com',
    });
    const [token, _setToken] = useState<string | null>(
        localStorage.getItem(TOKEN_KEY)
    );

    const setToken = (token: string) => {
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
