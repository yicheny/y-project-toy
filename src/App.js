import React from 'react';
import {Switch,Route} from 'react-router-dom';
import {Menu} from 'y-ui0';
import './App.scss';
import HtmlCssJs from "./view/HtmlCssJs/HtmlCssJs";
import Home from "./view/Home/Home";
import ViewResize from "./view/ViewResize/ViewResize";
import EventDragTest from "./view/EventDragTest/EventDragTest";
import FiberS1 from "./view/FiberStudy/FiberS1";
import ColumnsResize from "./view/TableResize/ColumnsResize";
import EventDragRowTest from "./view/EventDragTest/EventDragRowTest";
import CatchError from "./view/CatchError/CatchError";

const MENU_OPTION = {
  details:[
    {text:'首页'},
    {text:"HTML-CSS-JS切换",to:'HtmlCssJs'},
    {text:"视图尺寸调整",to:'ViewResize'},
    {text:"列拖拽调整尺寸",to:'columnsResize'},
    {text:"拖拽换行",to:'EventDragTest'},
    {text:"拖拽列换行",to:'EventDragRowTest'},
    // {text:"组件渲染测试",to:'FiberS1'},
    {text:'捕捉错误显示',to:'/CatchError'}
  ]
}

function App(props) {
  return <div className="app">
    <Menu option={MENU_OPTION}/>
    <div className="app-content">
      <Switch>
        <Route path='/HtmlCssJs' component={HtmlCssJs}/>
        <Route path='/ViewResize' component={ViewResize}/>
        <Route path='/EventDragTest' component={EventDragTest}/>
        <Route path='/EventDragRowTest' component={EventDragRowTest}/>
        <Route path='/FiberS1' component={FiberS1}/>
        <Route path='/columnsResize' component={ColumnsResize}/>
        <Route path='/CatchError' component={CatchError}/>
        <Route component={Home}/>
      </Switch>
    </div>
  </div>
}

export default App;
