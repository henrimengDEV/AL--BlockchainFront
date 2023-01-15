import "./home.css";
import {useAppSelector} from "../../app/hooks";
import bitCoin from "../../assets/undraw_bitcoin.png";
import React from "react";

const Home = () => {
    const connectedUser = useAppSelector(state => state.user.connectedUser)

    return (
        <div className="Home">
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

export default Home