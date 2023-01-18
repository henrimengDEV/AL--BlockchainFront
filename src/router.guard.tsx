import {useAppSelector} from "./app/hooks";
import React from "react";
import {Navigate} from "react-router-dom";

const RouterGuard = (props: any) => {
    const connectedUser = useAppSelector(state => state.user.connectedUser)

    if (connectedUser == null) {
        return <Navigate to={"/"} />
    } else {
        return <>{props.children}</>
    }
}

export default RouterGuard