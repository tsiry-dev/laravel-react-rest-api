export const TOKEN_KEY: string = "ACCESS_TOKEN";


export const getToken = (): string | null => {
   return localStorage.getItem(TOKEN_KEY);
}

export const clearToken = (): void => {
    localStorage.removeItem(TOKEN_KEY);
}
