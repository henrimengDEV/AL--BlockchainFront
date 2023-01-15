import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import {Provider} from "react-redux";
import {persistor, store} from "./store/store";
import {PersistGate} from 'redux-persist/integration/react';
import App from "./app";

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.Fragment>
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <App/>
            </PersistGate>
        </Provider>
    </React.Fragment>,
)