import React, {useEffect, useRef} from 'react';
import _ from 'lodash';
import {Card} from "y-ui0";
import './index.scss';
import clsx from "clsx";

const data = _.times(4,(num)=>_.repeat(num,10));

function Index(props) {
    return <div  className='Carousel-View'>
        <Card title='Carousel'>
            <div className="tips">
                <Carousel className="tipsContent">
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
function Carousel({className,style,children}){
    const ref = useRef();

    useEffect(()=>{
        // console.log('ref',ref.current.scrollWidth);
        setAnimation();

        function setAnimation(){
            const completeWidth = (ref.current.scrollWidth / 2) + 12;
            const animationName = `Carousel-`.concat(uniqKeyFor());

            const rule = getAnimationStyle(completeWidth,animationName);
            const style = document.createElement('style');
            style.type = 'text/css';
            style.innerHTML = '';
            document.getElementsByTagName('head')[0].appendChild(style);
            ref.current.stylesheet = document.styleSheets[document.styleSheets.length-1];
            ref.current.style.animation = `${5}s linear ${animationName} infinite`;
            try {
                ref.current.stylesheet.insertRule( rule , ref.current.stylesheet.rules.length);
            } catch (e) {
                console.error('Carousel报错：',e);
            }
        }

        function getAnimationStyle(value,animationName){
            return `
                @-webkit-keyframes ${animationName}{
                    0% {
                        transform:translateX(0);
                    }
                    100%{
                        transform:translateX(-${value}px);
                    }
                }
            `
        }
    },[])

    return <div ref={ref} className={clsx("Carousel",className)} style={style}>
        {children}
        {children}
    </div>
}

let uniqKeyFlag = 0;
function uniqKeyFor() {
    uniqKeyFlag++;
    return ''.concat('u-',(new Date()).getTime(), '-', uniqKeyFlag);
}
