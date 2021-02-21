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
import EmptyLinks from "./view/myPath/EmptyLinks";
import ComponentRender from "./view/RenderTest/ComponentRender/ComponentRender";
import FunctionRender from "./view/RenderTest/FunctionRender/FunctionRender";
import ModeRender from "./view/RenderTest/ModeRender/ModeRender";

const MENU_OPTION = {
  details:[
    {text:'首页'},
    {
      text:'功能性测试',
      children:[
        {text:"拖拽换行",to:'/feature-test/event-drag-test'},
        {text:"拖拽列换行",to:'/feature-test/event-drag-row-test'},
        {text:'捕捉错误显示',to:'/feature-test/catch-error'},
        {text:'播放音频 PlayAudio',to:'/feature-test/play-audio'},
      ]
    },
    {
      text:'组件测试',
      children:[
        {text:"HTML-CSS-JS切换",to:'/component/html-css-js'},
        {text:"视图尺寸调整",to:'/component/view-resize'},
        {text:"列拖拽调整尺寸",to:'/component/columns-resize'},
        {text:'树形控件',to:'/component/tree-view'},
        {text:'跑马灯 Carousel',to:'/component/carousel'},
      ]
    },
    {
      text:"jsPlumb学习页面",
      children:[
        {text:'JsPlumbDemo1',to:'js-plumb/demo1'},
        {text:'JsPlumbDemo2',to:'js-plumb/demo2'},
        {text:'JsPlumbDemo3',to:'js-plumb/demo3'},
      ]
    },
    {
       text:'拓扑图相关',
       children:[
         {text:'拓扑图-echarts',to:'topo/echarts'},
         {text:'路径绘制 CanvasLine',to:'topo/line'},
         {text:'连接 CanvasConnection',to:'topo/connection'},
         // {text:'网格折线连接 GridView',to:'GridView'},
         {text:'网格拖动 GridDrag',to:'topo/grid-drag'},
         {text:'多节点网格 GridMuchNode',to:'topo/grid-much-node'},
         {text:'空白路径 EmptyLinks',to:'topo/empty-links'},
       ]
    },
    {
      text:"渲染测试",
      expanded:true,
      children:[
        {text:"渲染测试-高消耗计算",to:'/render-test/complex-compute'},
        {text:'组件渲染测试',to:'/render-test/component-render'},
        {text:'函数生成实例渲染测试',to:'/render-test/function-render'},
        {text:'函数生成实例渲染测试',to:'/render-test/mode-render'}
      ]
    }
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
        <Route path='/component/html-css-js' component={HtmlCssJs}/>
        <Route path='/component/view-resize' component={ViewResize}/>
        <Route path='/component/columns-resize' component={ColumnsResize}/>
        <Route path='/component/tree-view' component={TreeView}/>
        <Route path='/component/carousel' component={Carousel}/>

        <Route path='/feature-test/event-drag-test' component={EventDragTest}/>
        <Route path='/feature-test/event-drag-row-test' component={EventDragRowTest}/>
        <Route path='/feature-test/catch-error' component={CatchError}/>
        <Route path='/feature-test/play-audio' component={PlayAudio}/>

        <Route path='/js-plumb/demo1' component={JsPlumbDemo1}/>
        <Route path='/js-plumb/demo2' component={JsPlumbDemo2}/>
        <Route path='/js-plumb/demo3' component={JsPlumbDemo3}/>

        <Route path='/topo/echarts' component={GraphSimple}/>
        <Route path='/topo/line' component={CanvasLine}/>
        <Route path='/topo/connection' component={CanvasConnection}/>
        {/*<Route path='/GridView' component={GridView}/>*/}
        <Route path='/topo/grid-drag' component={GridDrag}/>
        <Route path='/topo/grid-much-node' component={GridMuchNode}/>
        <Route path='/topo/empty-links' component={EmptyLinks}/>

        <Route path='/game/CreateRole' component={CreateRole}/>

        <Route path='/render-test/complex-compute' component={FiberS1}/>
        <Route path='/render-test/component-render' component={ComponentRender}/>
        <Route path='/render-test/function-render' component={FunctionRender}/>
        <Route path='/render-test/mode-render' component={ModeRender}/>

        <Route component={Home}/>
      </Switch>
    </div>
  </div>
}

export default App;
