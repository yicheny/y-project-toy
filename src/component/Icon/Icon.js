import React from 'react';
import cls from 'clsx';
import './Icon.scss';

function Icon({name,style,className,onClick}) {

    return <i className={cls('iconfont',`icon-${name}`,className)}
              onClick={onClick}
              style={style}>
    </i>;
}
Icon.defaultProps={
    name:'',
    style:{},
    className:'',
};

export default Icon;
