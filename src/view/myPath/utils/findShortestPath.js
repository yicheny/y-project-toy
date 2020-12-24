import _ from "lodash";

export default function findShortestPath({grid,source,target}){
    let shortestPath = null;

    const max_x = grid[0].length - 1;
    const max_y = grid.length - 1;
    const min_x = 0;
    const min_y = 0;
    const [t_x,t_y] = target;

    const nodes = [source,target];
    const stack = [];
    const queen = [source];
    bsf(queen,true,0);
    return shortestPath;

    function bsf(queen,isLast,offset){
        const l = _.last(queen);
        const [x,y] = l;
        if(shortestPath) return null;

        const list = [
            [x-1,y],[x+1,y],[x,y-1],[x,y+1]
        ];
        const validList = findPath(list,queen);

        if(!stack[offset]) stack[offset] = [...validList];
        else stack[offset].push(...validList);

        if(isLast){
            const len = stack[offset].length-1;
            const nextOffset = offset+1;
            stack[offset].forEach((q,i)=>{
                bsf(q,i===len,nextOffset);
            });
            stack[offset] = null;
        }
    }

    function findPath(list,queen){
        if(shortestPath) return [];
        const validList = [];

        while(list.length){
            const l = list.pop()
            const [l_x,l_y] = l;
            if(l_x === t_x && l_y === t_y) {
                queen.push(l);
                shortestPath = queen;
                return [];
            }
            if(_.some(nodes,o=> (o[0] === l_x && o[1]===l_y))) continue;//已到达
            if(l_x<min_x || l_x>max_x || l_y<min_y || l_y>max_y) continue;//边界
            if(grid[l_y][l_x] === -1) continue;//墙
            const q = _.clone(queen);
            q.push(l);
            nodes.push(l);
            validList.push(q);
        }

        return validList;
    }
}
