import { createContext, useEffect, useReducer } from "react"

export const isAdmin = (user) => {
     
    const admin = user?.roles.some((role) => role.authority === 'ADMIN');
    return admin;
}


const INITIAL_STATE = {
    user: JSON.parse(localStorage.getItem("user")) || null,
    isFetching: false,
    error: false,
    jwt: JSON.parse(localStorage.getItem("jwt")) || null,
};


const LoginReducer = (state, action) => {
    switch (action.type) {
        case "LOGIN_START":
            return {
                user: null,
                isFetching: true,
                error: false,
                jwt: null,
            };

        case "LOGIN_SUCCESS":
            return {
                user: action.payload.user,
                isFetching: false,
                error: false,
                jwt: action.payload.jwt,
            };

        case "LOGIN_FAILURE":
            return {
                user: null,
                isFetching: false,
                error: true,
                jwt: null,
            };
        case "LOGOUT":
            return {
                user: null,
                isFetching: false,
                error: false,
                jwt: null,
            };

        default:
            return state;
    }

};

export const LoginContext = createContext(INITIAL_STATE);
export const LoginContextProvider = ({ children }) => {
        const [state, dispatch] = useReducer(LoginReducer, INITIAL_STATE);

        useEffect(() => {
            localStorage.setItem("user", JSON.stringify(state.user));
            localStorage.setItem("jwt", JSON.stringify(state.jwt));
        }, [state.user, state.jwt, state.isAdmin]);
        

        return <LoginContext.Provider
                    value={{user: state.user,
                            isFetching: state.isFetching,
                            error: state.error,
                            jwt: state.jwt, dispatch}}
                > {children} </LoginContext.Provider>
    }   

