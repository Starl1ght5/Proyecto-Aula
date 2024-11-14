import { useState, useEffect } from "react";
import { StateContext } from "./StateContext";


const getInitialState = () => {
    const currentUser = localStorage.getItem("currentUser");
    return currentUser ? JSON.parse(currentUser) : null
  }


const StateComponent = ({ children }) => {

    const [ user, setUser ] = useState(getInitialState);


    useEffect(() => {
        localStorage.setItem("currentUser", JSON.stringify(user))
    }, [user])
    

    return (
        <StateContext.Provider
            value={{ user, setUser }}
        >
            { children }
        </StateContext.Provider>
        )
}

export default StateComponent;