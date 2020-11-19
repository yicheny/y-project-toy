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
import CreateRole from "./view/Game/CreateRole";
import GraphSimple from "./view/Echarts/graphSimple";
import TreeView from './view/Tree/TreeView';
import JsPlumbDemo1 from "./view/jsPlumb/jsPlumb-demo1";
import JsPlumbDemo2 from "./view/jsPlumb/jsPlumb-demo2";
import JsPlumbDemo3 from "./view/jsPlumb/jsPlumb-demo3";
import PlayAudio from "./view/Audio/PlayAudio";
import Carousel from './view/Carousel';
import CanvasLine from "./view/myPath/canvasLine";
import CanvasConnection from "./view/myPath/canvasConnection";
// import GridView from "./view/myPath/GridView";
import GridDrag from "./view/myPath/GridDrag";
import GridMuchNode from "./view/myPath/GridMuchNode";

const MENU_OPTION = {
  details:[
    {text:'首页'},
    {text:"HTML-CSS-JS切换",to:'HtmlCssJs'},
    {text:"视图尺寸调整",to:'ViewResize'},
    {text:"列拖拽调整尺寸",to:'columnsResize'},
    {text:"拖拽换行",to:'EventDragTest'},
    {text:"拖拽列换行",to:'EventDragRowTest'},
    // {text:"组件渲染测试",to:'FiberS1'},
    {text:'捕捉错误显示',to:'CatchError'},
    {text:'拓扑图-简单',to:'GraphSimple'},
    {text:'树形控件',to:'TreeView'},
    {text:'JsPlumbDemo1',to:'JsPlumbDemo1'},
    {text:'JsPlumbDemo2',to:'JsPlumbDemo2'},
    {text:'JsPlumbDemo3',to:'JsPlumbDemo3'},
    {text:'PlayAudio',to:'PlayAudio'},
    {text:'跑马灯 Carousel',to:'Carousel'},
    {text:'路径绘制 CanvasLine',to:'CanvasLine'},
    {text:'连接 CanvasConnection',to:'CanvasConnection'},
    // {text:'网格折线连接 GridView',to:'GridView'},
    {text:'网格拖动 GridDrag',to:'GridDrag'},
    {text:'多节点网格 GridMuchNode',to:'GridMuchNode'},
    /*{
      text:'G',
      expanded:true,
      children:[
        {text:'创建角色',to:'game/CreateRole'}
      ]
    }*/
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
        <Route path='/GraphSimple' component={GraphSimple}/>
        <Route path='/TreeView' component={TreeView}/>
        <Route path='/JsPlumbDemo1' component={JsPlumbDemo1}/>
        <Route path='/JsPlumbDemo2' component={JsPlumbDemo2}/>
        <Route path='/JsPlumbDemo3' component={JsPlumbDemo3}/>
        <Route path='/PlayAudio' component={PlayAudio}/>
        <Route path='/Carousel' component={Carousel}/>
        <Route path='/CanvasLine' component={CanvasLine}/>
        <Route path='/CanvasConnection' component={CanvasConnection}/>
        {/*<Route path='/GridView' component={GridView}/>*/}
        <Route path='/GridDrag' component={GridDrag}/>
        <Route path='/GridMuchNode' component={GridMuchNode}/>
        <Route path='/game/CreateRole' component={CreateRole}/>
        <Route component={Home}/>
      </Switch>
    </div>
  </div>
}

export default App;
