import {createBrowserRouter, RouterProvider} from "react-router-dom";
import MarketBuilding from "./components/market-building/market-building";
import React from "react";
import MarketBoard from "./components/market-board/market-board";
import DetailsBuilding from "./components/details-building/details-building";
import Profile from "./components/profile/profile";
import RouterGuard from "./router.guard";
import Admin from "./components/admin/admin";
import Home from "./components/home/home";
import DetailsBoard from "./components/details-board/details-board";


const Router = () => {
    return <RouterProvider router={router}/>;
}

const router = createBrowserRouter([
    {
        path: "/",
        element: <Home />,
    },
    {
        path: "/buildings",
        element: <RouterGuard children={<MarketBuilding />} />,
    },
    {
        path: "/building/:id",
        element: <RouterGuard children={<DetailsBuilding />} />,
    },
    {
        path: "/boards",
        element: <RouterGuard children={<MarketBoard />} />,
    },
    {
        path: "/profile/:address",
        element: <RouterGuard children={<Profile />} />,
    },
    {
        path: "/admin",
        element: <RouterGuard children={<Admin />} />,
    },
    {
        path: "/board/:id",
        element: <RouterGuard children={<DetailsBoard />} />,
    },
]);

export default Router