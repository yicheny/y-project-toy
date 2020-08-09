import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter, Route } from "react-router-dom";
import App from './App';
import * as serviceWorker from './serviceWorker';
import './index.scss';
import 'y-ui0/lib/style.css';
import {L2Dwidget} from "y-live2d-widget/entry/src";

L2Dwidget.init({
    dialog: {
        enable: true,
        script: {
            'every idle 10s': '$hitokoto$！', //显示动漫台词【使用一言语句】
            'tap body': '哎呀！别碰我！',
            'tap face': '人家已经不是小孩子了~'
        }
    }
});

ReactDOM.render(
  <React.StrictMode>
    <HashRouter>
        <Route component={App}/>
    </HashRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
