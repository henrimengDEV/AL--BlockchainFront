import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import Menu from "./components/menu/menu";
import Router from "./router";
import {Provider} from "react-redux";
import {persistor, store} from "./store/store";
import {PersistGate} from 'redux-persist/integration/react';
import {ConfirmDialog} from "primereact/confirmdialog";

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <Menu />
                <Router />
                <ConfirmDialog style={{backgroundColor: 'red'}} />
            </PersistGate>
        </Provider>
    </React.StrictMode>,
)

// ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
//     <Provider store={store}>
//         <Menu />
//         <Router />
//     </Provider>
// )