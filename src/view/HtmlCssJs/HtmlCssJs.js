import React,{useState} from 'react';
import _ from 'lodash';
import clsx from 'clsx';
import './HtmlCssJs.scss';

const TAB_OPTIONS = [
    {text:'HTML'},
    {text:'CSS'},
    {text:'JavaScript'},
].map(x=>({text:x.text,value:x.text}));

const TAB_ACTIVE = 'HTML'

function HtmlCssJs(props) {
    return (<div className='htmlCssJs'>
        <div className="codeMenu">
            <Tab options={TAB_OPTIONS} defaultActive={TAB_ACTIVE}/>
        </div>
        <div className="codeContent">

        </div>
    </div>);
}

export default HtmlCssJs;

function Tab(props){
    const {options,onChange} = props;
    const [active,setActive] = useState(setInitActive(props.defaultActive));

    return <div className="tab">
        {
            _.map(options,(x,i)=>{
                return <span key={i}
                             className={clsx("tab-item",{active:active.includes(x.value)})}
                             onClick={()=>itemClick(x)}>
                    {x.text}
                </span>
            })
        }
    </div>

    function itemClick(x){
        _.includes(active,x.value) ? removeItem() : active.push(x.value);
        const nextActive = _.clone(active);
        setActive(nextActive);
        if(_.isFunction(onChange)) onChange(nextActive);

        function removeItem(){
            active.length>1 &&_.pull(active,x.value)
        }
    }
}
function setInitActive(active){
    if(active === undefined) return [];
    return _.isArray(active) ? active : [active];
}
