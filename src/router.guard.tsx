import {useAppSelector} from "./app/hooks";
import React, {useEffect} from "react";
import {Navigate} from "react-router-dom";

const RouterGuard = (props: any) => {
    const connectedUser = useAppSelector(state => state.user.connectedUser)

    useEffect(() => {
        console.log(connectedUser)
    }, []);


    if (connectedUser == null) {
        return <Navigate to={"/"} />
    } else {
        return <>{props.children}</>
    }
}

export default RouterGuard