import React from 'react';
import './index.css';
import store, {subscribe} from "./redux/redux-store";
import ReactDOM from "react-dom/client";
import App from "./App";
import {Provider} from "react-redux";
import {BrowserRouter} from "react-router-dom";


const root = ReactDOM.createRoot(document.getElementById('root')); // ВОТ ЭТА СТРОКА

root.render(
    <BrowserRouter>
        <Provider store={store}>
            <App/>
        </Provider>
    </BrowserRouter>
);




