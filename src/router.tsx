import {createBrowserRouter, RouterProvider} from "react-router-dom";
import App from "./App";
import MarketBuilding from "./components/market-building/market-building";
import React from "react";
import MarketBoard from "./components/market-board/market-board";
import DetailsBuilding from "./components/details-building/details-building";
import Profile from "./components/profile/profile";
import RouterGuard from "./router.guard";


const Router = () => <RouterProvider router={router} />

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
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
]);

export default Router