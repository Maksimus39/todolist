import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import './app/App.css'
import {store} from "./app/store/store";
import {Provider} from "react-redux";
import {AppHttpRequests} from "./app/AppHttpRequests";


const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);
root.render(
    <React.StrictMode>
        <Provider store={store}>
            <AppHttpRequests/>
        </Provider>
    </React.StrictMode>
);

