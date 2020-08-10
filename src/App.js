import React from 'react';
import {Switch,Route} from 'react-router-dom';
import {Menu} from 'y-ui0';
import './App.scss';
import HtmlCssJs from "./view/HtmlCssJs/HtmlCssJs";
import Home from "./view/Home/Home";
import ViewResize from "./view/ViewResize/ViewResize";

const MENU_OPTION = {
  details:[
    {text:'首页'},
    {text:"HTML-CSS-JS切换",to:'HtmlCssJs'},
    {text:"视图尺寸调整",to:'ViewResize'}
  ]
}

function App(props) {
  return <div className="app">
    <Menu option={MENU_OPTION}/>
    <div className="app-content">
      <Switch>
        <Route path='/HtmlCssJs' component={HtmlCssJs}/>
        <Route path='/ViewResize' component={ViewResize}/>
        <Route component={Home}/>
      </Switch>
    </div>
  </div>
}

export default App;
