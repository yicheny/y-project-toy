import _ from "lodash";

export default function findShortestPath({grid,source,target}){
    console.log(grid);
    let path = null;
    const x_max_num = grid.length - 1;
    const y_max_num = grid[0].length - 1;
    const x_min_num = 0;
    const y_min_num = 0;
    let hasLeft,hasRight,hasTop,hasBottom;
    const [s_x,s_y] = source;
    const [t_x,t_y] = target;
    if(s_x > t_x) hasLeft = true;
    if(s_x < t_x) hasRight = true;
    if(s_y > t_y) hasTop = true;
    if(s_y < t_y) hasBottom = true;
    return findPath(s_x,s_y,[],true);

    function findPath(x,y,tempPath,isHead){
        if(path) return null;
        if(x===t_x && y===t_y) return path = tempPath;
        if(x<x_min_num || y<y_min_num || x>x_max_num || y>y_max_num) return null;
        const item = grid[y][x];
        if(!isHead && item) return null;
        tempPath.push([x,y]);
        if(hasLeft) findPath(x-1,y,_.clone(tempPath));
        if(hasRight) findPath(x+1,y,_.clone(tempPath));
        if(hasBottom) findPath(x,y+1,_.clone(tempPath));
        if(hasTop) findPath(x,y-1,_.clone(tempPath));

        return path;
    }
}
