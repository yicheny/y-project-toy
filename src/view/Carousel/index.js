import React, { useEffect, useRef, useState } from 'react';
import _ from 'lodash';
import {Card} from "y-ui0";
import './index.scss';
import clsx from "clsx";

const data = _.times(3,(num)=>_.repeat(num,10));

function Index(props) {
    return <div  className='Carousel-View'>
        <Card title='Carousel'>
            <div className="tips">
                <Carousel className="tipsContent" speed={100} offset={12}>
                    {
                        _.map(data,(x,i)=>{
                            return <div key={i} className='tip'>第{i+1}项：{x}</div>
                        })
                    }
                </Carousel>
            </div>
        </Card>
    </div>
}

export default Index;

//
function Carousel({className,style,children,speed,offset}){
    const ref = useRef();
    const [copyChildren,setCopyChildren] = useState(true);

    useEffect(()=>{
        // console.log('ref',ref.current.scrollWidth);
        setAnimation();

        function setAnimation(){
            const viewWidth = ref.current.clientWidth;
            const completeWidth = (ref.current.scrollWidth / 2) + offset;
            if(completeWidth < viewWidth) return setCopyChildren(false);
            const animationName = `Carousel-`.concat(uniqKeyFor());
            const time = completeWidth / speed;

            const rule = getAnimationStyle(completeWidth,animationName);
            const style = document.createElement('style');
            style.type = 'text/css';
            style.innerHTML = '';
            document.getElementsByTagName('head')[0].appendChild(style);
            ref.current.stylesheet = document.styleSheets[document.styleSheets.length-1];
            ref.current.style.animation = `${time}s linear ${animationName} infinite`;
            try {
                ref.current.stylesheet.insertRule( rule , ref.current.stylesheet.rules.length);
            } catch (e) {
                console.error('Carousel报错：',e);
            }
        }

        function getAnimationStyle(value,animationName){
            return `
                @keyframes ${animationName}{
                    0% {
                        transform:translateX(0);
                    }
                    100%{
                        transform:translateX(-${value}px);
                    }
                }
            `
        }
    },[speed,offset])

    return <div ref={ref} className={clsx("Carousel",className)} style={style}>
        {children}
        {copyChildren && children}
    </div>
}
Carousel.defaultProps = {
    speed:120,
    offset:0
}

let uniqKeyFlag = 0;
function uniqKeyFor() {
    uniqKeyFlag++;
    return ''.concat('u-',(new Date()).getTime(), '-', uniqKeyFlag);
}
