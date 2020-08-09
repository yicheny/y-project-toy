import React,{useState,useMemo} from 'react';
import _ from 'lodash';
import clsx from 'clsx';
import './HtmlCssJs.scss';

const TAB_OPTIONS = [
    {text:'HTML'},
    {text:'CSS'},
    {text:'JavaScript'},
].map(x=>({text:x.text,value:x.text}));


const MOCK_CONTENT = {
    HTML: 'HTML代码',
    CSS: 'CSS代码',
    JavaScript: 'JavaScript代码',
}

function HtmlCssJs(props) {
    const [tab,setTab] = useState(['HTML'])

    const Code = useMemo(()=>{
        return _.reduce(_.entries(MOCK_CONTENT),(acc,x)=>{
            const [key,value] = x;
            return tab.includes(key) ? acc.concat([value]) : acc;
        },[])
    },[tab])

    return (<div className='htmlCssJs'>
        <div className="codeMenu">
            <Tab options={TAB_OPTIONS} defaultActive={tab} onChange={setTab}/>
        </div>
        <div className="codeContent">
            <CodeBox data={Code}/>
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

function CodeBox(props){
    const {data} = props;
    return <div className="codeBox">
        {_.map(data,(x,i)=>{
            return <div key={i} className="codeBox-item">{x}</div>
        })}
    </div>
}
