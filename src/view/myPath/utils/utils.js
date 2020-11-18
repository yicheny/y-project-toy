import findShortestPath from "./findShortestPath";

export function getElementPath(o,grid){
    const {targetId,sourceId} = o || {};
    const source = document.getElementById(sourceId);
    const target = document.getElementById(targetId);
    if(!source || !target) throw new Error('ConnectionPath抛错：指定元素不存在！');
    const {x:s_x,y:s_y} = source.parentElement.dataset;
    const {x:t_x,y:t_y} = target.parentElement.dataset;
    const path = findShortestPath({
        grid,
        source:[Number(s_x),Number(s_y)],
        target:[Number(t_x),Number(t_y)],
    });
    if(!path) throw new Error('ConnectionPath抛错：不存在连接路径！');
    return path;
}
