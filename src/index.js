import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter, Route } from "react-router-dom";
import App from './App';
import * as serviceWorker from './serviceWorker';
import './index.scss';
import 'y-ui0/lib/style.css';
import {L2Dwidget} from "y-live2d-widget/entry/src";

//为L2Dwidget添加显示控制
L2Dwidget.display = function (status){
    const timeId = setInterval(()=>{
        const ele = document.getElementById('live2d-widget');
        if(!ele) return null;
        ele.style.display = status;
        clearInterval(timeId);
    },100)
}

L2Dwidget.init({
    // model:{
    //     jsonPath: getJsonPath('koharu'),
    //     scale:0.88
    // },

    //["不要动手动脚的！快把手拿开~~", "真…真的是不知羞耻！","Hentai！", "再摸的话我可要报警了！⌇●﹏●⌇", "110吗，这里有个变态一直在摸我(ó﹏ò｡)"]
    dialog: {
        enable: true,
        script: {
            'every idle 10s': '$hitokoto$', //显示动漫台词【使用一言语句】
            'tap body': '哎呀！别碰我！',
            'tap face': '人家已经不是小孩子了~'
        }
    }
});

// function getJsonPath(key){
//     return `https://unpkg.com/live2d-widget-model-${key}@1.0.5/assets/${key}.model.json`
// }

// L2Dwidget.display('none');

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
