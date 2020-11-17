import _ from "lodash";

export default function findShortestPath({grid,source,target,maxStep}){
    let shortestPath = null;

    const x_max_num = grid.length - 1;
    const y_max_num = grid[0].length - 1;
    const x_min_num = 0;
    const y_min_num = 0;
    const max_num = _.defaultTo(maxStep,y_max_num*x_max_num);
    const [x,y] = source;
    const [t_x,t_y] = target;

    const res = findPath(x,y,[],0);
    if(res) res.push(target);
    return  res;

    function findPath(x,y,tempPath,offset){
        if(shortestPath && (tempPath.length >= shortestPath.length)) return;
        if(x===t_x && y===t_y) {
            if(shortestPath===null) return shortestPath = tempPath;
            if(tempPath.length < shortestPath.length) return shortestPath = tempPath;
        }
        if(x<x_min_num || y<y_min_num || x>x_max_num || y>y_max_num) return null;
        let mark = grid[y][x];
        if(offset!==0 && mark===-1) return ;
        if(mark!==-1) mark++;
        if(mark > max_num) return ;
        if(_.some(tempPath,o=>o[0]===x&&o[1]===y)) return ;
        tempPath.push([x,y]);
        const nextOffest = offset + mark;
        findPath(x-1,y,_.clone(tempPath),nextOffest);//左
        findPath(x+1,y,_.clone(tempPath),nextOffest);//右
        findPath(x,y-1,_.clone(tempPath),nextOffest);//上
        findPath(x,y+1,_.clone(tempPath),nextOffest);//下

        return shortestPath;
    }
}
