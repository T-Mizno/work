// walkdataset1.js を読み込むこと。
// dataloader.js を読み込むこと。
// map1.js
// map1remap.js

let currentFloorMatrix = loadFloorMatrix(1);
let currentBoxes = loadBoxes(currentFloorMatrix, GlobalWidth(), GlobalHeight());
enhanceMap1(currentBoxes);


function distXY(x0, y0, x1, y1) {
    return Math.sqrt(Math.pow(x0 - x1, 2) + Math.pow(y0 - y1, 2));
}

function distP(p, q) {
    return distXY(p.x, p.y, q.x, q.y);
}

function nearestBox(p, bs) {
    let ansB = bs[0];
    let minD = 1000000;
    bs.forEach(b => {
        let d = distP(p, b);
        if (d < minD) {
            minD = d;
            ansB = b;
        }
    });
    return ansB;
}

function makeStopPoints() {
    let ALL_CS = [];
    for (let i = 0; i < WALK_DATA.length; i++) {
        let wd = loadWalkData1(i, GlobalWidth(), GlobalHeight());
        let ss = getStopPoints(wd);
        let cs = [];
        ss.forEach(s => {
            let b = nearestBox(s, currentBoxes);
            if (isMovableBox(b)) cs.push(b.content);
        });
        if (cs[cs.length - 1] != 6) cs.push(6);
        ALL_CS.push(cs);
    }
    console.log(ALL_CS.length);

    console.log(JSON.stringify(ALL_CS));
}

function makeStartPoints() {
    let ALL_SS = [];
    for (let i = 0; i < WALK_DATA.length; i++) {
        let wd = loadWalkData1(i, GlobalWidth(), GlobalHeight());
        ALL_SS.push(wd[0]);
    }
    console.log(JSON.stringify(ALL_SS));
}

makeStartPoints();
