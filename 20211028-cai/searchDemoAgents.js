function newAgent() {
    let a = {
        id: 1,
        todo: [8],
        currentGoalBox: null,
        open: [],
        close: [],
        path: [],
        pathCount: 0,
        start: { x: 836, y: 560 },
        seekDepth: 30,
        dt: 10.0,
        dist: 0,
        reached: false
    };

    a.path.unshift({ x: a.start.x, y: a.start.y });


    a.open = [{ x: a.path[0].x, y: a.path[0].y, dist: 0, froms: [] }];
    a.close = [];


    return a;
}



function distXY(x0, y0, x1, y1) {
    return Math.sqrt(Math.pow(x0 - x1, 2) + Math.pow(y0 - y1, 2));
}

function distP(p, q) {
    return distXY(p.x, p.y, q.x, q.y);
}

function areNear(p, q) {
    return distP(p, q) < 5.0;
}

function areNearBox(b, p) {
    return distXY(b.x, b.y, p.x, p.y) < Math.max(b.w / 2, b.h / 2) + 5.0;
}

function existSamePoint(aP, aPs) {
    for (let q of aPs) {
        if (areNear(aP, q)) return true;
    }
    return false;
    //aPs.some(p => { return false; });
}

function pathCopy(ps) {
    let newPs = [];
    for (let i = 0; i < ps.length; i++) { newPs.push({ x: ps[i].x, y: ps[i].y }); }
    return newPs;
}

function heuristicCost(p) {
    let d = 0;
    for (let i = 0; i < p.froms.length - 1; i++) {
        d = distP(p.froms[i], p.froms[i + 1]);
    }
    return p;
}

function searchNearGoalBox(p, content, boxes) {
    let minD = 0;
    let box = boxes[0];
    boxes.forEach(b => {
        if (b.content == content) {
            let newDist = distXY(p.x, p.y, b.x, b.y);
            if (newDist > minD) {
                minD = newDist;
                box = b;
            }
        }
    });
    return box;
}

function agentGrowBranch(a, boxes) {
    if (a.open.length > 4000) {
        console.log("path is full");
        return;
    }

    let p = a.open.shift();
    a.close.unshift(p);

    let froms = pathCopy(p.froms);
    froms.unshift({ x: p.x, y: p.y, dist: p.dist });

    let cand = [];
    for (let rad = 0; rad <= 6.29; rad = rad + 3.141592 / 4.0) {
        let x = a.dt * Math.cos(rad) + p.x;
        let y = a.dt * Math.sin(rad) + p.y;
        //console.log(a.dt * Math.cos(rad), a.dt * Math.sin(rad));
        let newP = { x: x, y: y, froms: froms, dist: 0 };
        if (!existSamePoint(newP, a.open)
            && !existSamePoint(newP, a.close)
            && !onBoxes(newP, boxes)) {
            newP.dist = p.dist + distP(a.currentGoalBox, newP);
            cand.push(newP);

        }
    }

    cand.forEach(c => {
        a.open.unshift(c); // 深さ優先探索
        //a.open.push(c); // 幅優先探索
    });


    // A* search
    if (true) {
        if (a.open.length > 1) {
            let minI = 0;
            let minDist = 1000000;
            for (let i = 0; i < a.open.length; i++) {
                if (a.open[i].dist < minDist) {
                    minI = i;
                    minDist = a.open[i].dist;
                }
            }
            let minP = a.open.splice(minI, 1);
            a.open.unshift(minP[0]);
        }
    }

}

function agentNextGo(a, boxes) {

    //a.open = [{ x: a.path[0].x, y: a.path[0].y, dist: 0, froms: [] }];
    //a.close = [];

    if (a.todo.length < 1) {
        //a.close = [];
        //a.open = [];
        a.reached = true;
        console.log("DONE");
        return; // finished
    }

    if (a.currentGoalBox === null) {
        //if (true) {
        let g = a.todo[0];
        a.currentGoalBox = searchNearGoalBox(a.path[0], g, boxes);
        //a.seekDepth = 100;
    }

    for (let i = 0; i < a.seekDepth; i++) {
        if (a.open.length > 0) {

            if (areNearBox(a.currentGoalBox, a.open[0])) {
                console.log("REACH", i, a.currentGoalBox);
                a.todo.shift();
                break;
            }
            agentGrowBranch(a, boxes);
        }
    }
    /*
        for (let i = a.open[0].froms.length - 1; i >= 0; i--) {
            a.path.unshift({ x: a.open[0].froms[i].x, y: a.open[0].froms[i].y });
        }
    
        a.path.unshift({ x: a.open[0].x, y: a.open[0].y });
    
        if (areNearBox(a.currentGoalBox, a.path[0])) {
            let g = a.todo[0];//.shift();
            a.currentGoalBox = searchNearGoalBox(a.path[0], g, boxes);
            console.log(a.currentGoalBox);
        }
    
    */

}
