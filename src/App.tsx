import "./app.css";
import React from "react";
import bitCoin from "./assets/undraw_bitcoin.png";
import {useAppSelector} from "./app/hooks";

const App = () => {
    const connectedUser = useAppSelector(state => state.user.connectedUser)

    return (
        <div className="App">
            {connectedUser != null
                ? <div>
                    Welcome <strong>{connectedUser.username}</strong> !
                    (<small>{connectedUser.address}</small>)
                </div>
                : ''}
            <img src={bitCoin} alt="" />
        </div>
    )
}

export default App