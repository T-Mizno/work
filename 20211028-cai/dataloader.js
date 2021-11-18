function GlobalWidth() {
    return 1113;  // for iPad
}
function GlobalHeight() {
    return 765;  // for iPad
}

//
// walkdataset1.js を読み込むこと。
//
function loadWalkData1(i, aGlobalWidth, aGlobalHeight) {
    if (i < 0 || i >= WALK_DATA.length) return undefined; // error

    function adX(x) {
        return ((0.768 - 0.138) / (1172 - 103) * (x - 103) + 0.138) * aGlobalWidth;
    }
    function adY(y) {
        return ((0.785 - 0.220) / (710 - 28) * (y - 28) + 0.220) * aGlobalHeight;
    }

    let wd = [];
    WALK_DATA[i].data.forEach(d => {
        wd.push({ x: adX(d[4]), y: adY(d[5]) });
    });

    wd.no = i;

    return wd;
}

function getStopPoints(aWalkData) {

    function dist(x0, y0, x1, y1) { return Math.sqrt(Math.pow(x0 - x1, 2) + Math.pow(y0 - y1, 2)); }

    let sp = [];

    let stopCount = 0;
    let flgStopMark = false;

    for (let i = 0; i < aWalkData.length - 1; i++) {
        let d = aWalkData[i];
        let nextD = aWalkData[i + 1];

        let distance = dist(d.x, d.y, nextD.x, nextD.y);
        if (distance > 2) {
            stopCount = 0;
            flgStopMark = true;
        }
        else {
            stopCount++;
        }

        if (stopCount > 25 && flgStopMark) {

            if (sp.length == 0 || dist(d.x, d.y, sp[sp.length - 1].x, sp[sp.length - 1].y) > 50) {
                sp.push({ x: d.x, y: d.y });
                flgDrawStopMark = false;
            }
        }
    }
    return sp;
}

//
// mapPic1.png が同じディレクトリにあること。
//
function loadMapImg1() {
    let map = new Image();
    map.src = "./mapPic1.png";
    map.fromX = 140;
    map.fromY = 155;
    map.toX = 729;
    map.toY = 508;
    return map;
}

//
// map1.js と map2.js を読み込むこと。
//
function loadFloorMatrix(i) {
    let dataStr = "";
    if (i == 2) dataStr = mapDataStr2;
    else dataStr = mapDataStr1;

    let floorData = JSON.parse(dataStr);
    let floor = [];
    for (let i = 0; i < floorData["m"]; i++) {
        let row = [];
        for (let j = 0; j < floorData["n"]; j++) {
            row.push(floorData["data"][i * floorData["n"] + j]);
        }
        floor.push(row);
    }
    return floor;
}

const boxColors = {
    0: "rgb(171, 223, 234)",
    1: "rgb(248, 168, 153)",
    2: "rgb(233, 51, 56)",
    3: "rgb(192, 191, 192)",
    4: "rgb(101, 103, 173)",
    5: "rgb(149, 149, 201)",
    6: "rgb(0, 0, 255)",
    7: "rgb(167, 211, 139)",
    8: "rgb(249, 243, 154)",
    9: "rgb(195, 134, 73)",
    10: "rgb(0, 0, 0)",
    11: "rgb(255, 255, 255)"//上に何もない床
};

const contentNames = {
    0: "肉・魚",
    1: "ドリンク・菓子・調味料",
    2: "その他",
    3: "消耗品・雑貨",
    4: "その他",
    5: "その他",
    6: "レジ・その他",
    7: "野菜・果物",
    8: "加工肉・冷凍",
    9: "飯・惣菜",
    10: "壁・柱",
    11: "上に何もない床"
}

function contentCannotMove() { return 10; }
function contentNothing() { return 11; }

function contentColor(content) {
    if (boxColors[content]) return boxColors[content];
    return "rgb(0,0,0)";
}
function contentName(content) {
    if (contentNames[content]) return contentNames[content];
    return "No-Name";
}

function loadBoxes(aFloor, aGlobalWidth, aGlobalHeight) {
    let bw = aGlobalWidth / aFloor[0].length;
    let bh = aGlobalHeight / aFloor.length;

    function j2x(j) { return bw * j + bw / 2; }
    function i2y(i) { return bh * i + bh / 2; }

    bs = [];

    for (let i = 0; i < aFloor.length; i++) {
        for (let j = 0; j < aFloor[i].length; j++) {
            if (aFloor[i][j] == contentNothing()) continue;
            bs.push({ x: j2x(j), y: i2y(i), w: bw, h: bh, content: aFloor[i][j], tag: aFloor[i][j] })
        }
    }
    return bs;
}

function isFixedBox(b) { return b.content == contentCannotMove(); }
function isMovableBox(b) { return b.content != contentCannotMove(); }

function onBoxXY(x, y, b) {
    let d = 1;
    if ((b.x - b.w / 2 - d <= x)
        && (x <= b.x + b.w + d / 2)
        && (b.y - b.h / 2 - d <= y)
        && (y <= b.y + b.h / 2 + d)) {
        return true;
    }
    return false;
}

function onBox(p, b) {
    return onBoxXY(p.x, p.y, b);
}

function onBoxes(p, bs) {
    return bs.some(b => { return onBox(p, b); });
}

function onBoxesWithBox(p, bs) {
    for (let i = 0; i < bs.length; i++) {
        if (onBox(p, bs[i])) return { on: onBox(p, bs[i]), box: bs[i], index: i };
    }
    return { on: false, box: bs[0], index: 0 };
}

function areBoxesOverlaping(a, b) { // a:box, b:box
    let ax1 = a.x - a.w / 2;
    let ax2 = a.x + a.w / 2;
    let ay1 = a.y - a.h / 2;
    let ay2 = a.y + a.h / 2;
    let bx1 = b.x - b.w / 2;
    let bx2 = b.x + b.w / 2;
    let by1 = b.y - b.h / 2;
    let by2 = b.y + b.h / 2;
    return (Math.max(ax1, bx1) <= Math.min(ax2, bx2)) && (Math.max(ay1, by1) <= Math.min(ay2, by2));
}

function overlapingIndices(a, bs) { // a:box
    let indices = [];
    for (let i = 0; i < bs.length; i++) {
        if (areBoxesOverlaping(a, bs[i])) {
            indices.push(i);
        }
    }
    //console.log(indices);
    return indices;
}




function cert(ans) {

    function str2int(str) {
        let u = (new TextEncoder).encode(str);
        let t = (new TextEncoder).encode('サンプル');
        let flg = true;
        let sum = 0;
        u.forEach(w => {
            sum = sum + (flg ? w : (-w));
            flg = flg ? false : true;
        });
        t.forEach(w => {
            sum = sum + (flg ? w : (-w));
            flg = flg ? false : true;
        });
        return sum;
    }

    let queryString = window.location.search;
    let queryObject = new Object();

    if (queryString) {
        queryString = queryString.substring(1);
        let parameters = queryString.split('&');

        for (let i = 0; i < parameters.length; i++) {
            let element = parameters[i].split('=');

            let paramName = decodeURIComponent(element[0]);
            let paramValue = decodeURIComponent(element[1]);

            queryObject[paramName] = paramValue;
        }
    }

    if (queryObject['pw'] === undefined) return;

    if (str2int(queryObject['pw']) == ans) {
        console.log("ok");
    }
    else {
        console.log("ng");
        window.location.href = 'message.html';
    }
}
