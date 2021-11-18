function newArrangerXY(fromX, fromY, aLength, aContent) {
    return {
        isColumn: true,
        isRow: false,
        fromP: { x: fromX, y: fromY },
        length: aLength,
        content: aContent,
        throughCount: 0
    };
}

function newArranger(aFromP, aLength, aContent) {
    return newArrangerXY(aFromP.x, aFromP.y, aLength, aContent);
}

function boxLongerLength() {
    return 14;
}
function boxShorterLength() {
    return 7;
}

function defaultArrangers() {
    let forMap1ForColumn = [
        // 上段
        [367, 258, 150, 1],
        [414, 258, 150, 1],
        [452, 258, 40, 1],
        [452, 321, 85, 1],
        [492, 258, 150, 1],
        [532, 258, 40, 1],
        [532, 321, 85, 1],
        [577, 258, 150, 1],
        [619, 258, 150, 1],
        [655, 258, 150, 1],
        [690, 258, 150, 9],
        // 下段
        [368, 438, 95, 1],
        [414, 438, 95, 1],
        [452, 438, 95, 1],
        [492, 438, 95, 3],
        [526, 438, 95, 3],
        [553, 438, 14, 3],
        [553, 474, 61, 3],
        [585, 438, 14, 3],
        [618, 438, 95, 3],
        [654, 438, 95, 3],
        [691, 438, 95, 7]
    ];

    let forMap1ForRow = [
        [192, 440, 75, 1],
        [192, 476, 75, 1]
    ];


    let as = [];
    for (let f of forMap1ForColumn) {
        let a = newArrangerXY(f[0], f[1], f[2], f[3]);
        a.isColumn = true;
        a.isRow = false;
        as.push(a);
    }

    for (let f of forMap1ForRow) {
        let a = newArrangerXY(f[0], f[1], f[2], f[3]);
        a.isColumn = false;
        a.isRow = true;
        as.push(a);
    }

    for (let i = 0; i < 20; i++) {
        let a = newArrangerXY(0, 0, 0, 0);
        a.isColumn = false;
        a.isRow = true;
        as.push(a);

        a = newArrangerXY(0, 0, 0, 0);
        a.isColumn = true;
        a.isRow = false;
        as.push(a);
    }

    return as;
}

function rearrangeBoxes(as, aBs) { // as: arrangers, aBs:currentBoxes


    let bs = [];
    for (let a of as) {
        if (a.length < Math.max(boxLongerLength(), boxShorterLength())) continue;

        if (a.isColumn) {
            let w = boxLongerLength();
            let h = boxShorterLength();
            let c = a.content;

            bs.push({ x: a.fromP.x + w / 2, y: a.fromP.y + h / 2, w: w, h: h, content: c, tag: c + "" });
            let y = h;
            for (; y < a.length - w; y = y + w) {
                bs.push({ x: a.fromP.x + w / 4, y: a.fromP.y + y + w / 2, w: w / 2, h: w, content: c, tag: c + "" });
                bs.push({ x: a.fromP.x + 3 * w / 4, y: a.fromP.y + y + w / 2, w: w / 2, h: w, content: c, tag: c + "" });
            }
            bs.push({ x: a.fromP.x + w / 2, y: a.fromP.y + y + h / 2, w: w, h: h, content: c, tag: c + "" });
        }
        else if (a.isRow) {
            let l = boxLongerLength();
            let s = boxShorterLength();
            let c = a.content;
            bs.push({ x: a.fromP.x + s / 2, y: a.fromP.y + l / 2, w: s, h: l, content: c, tag: c + "" });
            let x = s;
            for (; x < a.length - s; x = x + l) {
                bs.push({ x: a.fromP.x + x + l / 2, y: a.fromP.y + l / 4, w: l, h: s, content: c, tag: c + "" });
                bs.push({ x: a.fromP.x + x + l / 2, y: a.fromP.y + 3 * l / 4, w: l, h: s, content: c, tag: c + "" });
            }
            bs.push({ x: a.fromP.x + x + s / 2, y: a.fromP.y + l / 2, w: s, h: l, content: c, tag: c + "" });
        }
    }

    for (let i = bs.length - 1; i >= 0; i--) {
        let ois = overlapingIndices(bs[i], aBs);
        if (ois.length < 1) continue; // not overlaping
        let flgOnFixedBox = false;
        ois.forEach(oi => { if (isFixedBox(aBs[oi])) flgOnFixedBox = true; });
        if (flgOnFixedBox) {
            bs.splice(i, 1);
            continue;
        }

        for (let oi = ois.length - 1; oi >= 0; oi--) {
            if (!isFixedBox(aBs[ois[oi]])) aBs.splice(ois[oi], 1);
            //aBs.splice(oi, 1);
            //aBs[ois[oi]].content = 10;
            //console.log("######", ois[ois[oi]], aBs.length);
        }
    }

    for (let i = aBs.length - 1; i >= 0; i--) {
        if (349 < aBs[i].x && aBs[i].x < 721 && 242 < aBs[i].y && aBs[i].y < 553) {
            if (isMovableBox(aBs[i])) aBs.splice(i, 1);
        }
    }

    /*
    for (let b of bs) {
        let ois = overlapingIndices(b, aBs);
        if (ois.length < 1) aBs.push(b);
    }
    */
    for (let b of bs) {
        aBs.push(b);
    }

}

function nearArranger(p, arranger) {
    let epsillon = 10;
    if (arranger.isColumn) {
        return arranger.fromP.x - epsillon <= p.x && p.x <= arranger.fromP.x + boxLongerLength() + epsillon
            && arranger.fromP.y - epsillon <= p.y && p.y <= arranger.fromP.y + arranger.length + epsillon;
    }
    // is Row
    return arranger.fromP.x - epsillon <= p.x && p.x <= arranger.fromP.x + arranger.length + epsillon
        && arranger.fromP.y - epsillon <= p.y && p.y <= arranger.fromP.y + boxLongerLength() + epsillon;
}

function updateThrougCount(arranger, agents) {
    let c = 0;
    agents.forEach(agent => agent.path.forEach(p => { if (nearArranger(p, arranger)) c = c + 1; }));
    arranger.throughCount = c;
}

function regionCanPutWithArrangeBox(a, aBs) { // a: arranger
    if (a.isRow && a.fromP.x + a.length > 720) return false;
    if (a.isColumn && a.fromP.y + a.length > 540) return false;

    let tmpB;
    let dt = 30;
    if (a.isColumn) {
        tmpB = { x: a.fromP.x + (boxLongerLength() + dt) / 2, y: a.fromP.y + (a.length + dt) / 2, w: boxLongerLength() + dt, h: a.length + dt };
    }
    else {
        tmpB = { x: a.fromP.x + (a.length + dt) / 2, y: a.fromP.y + (boxLongerLength() + dt) / 2, w: a.length + dt, h: boxLongerLength() + dt };
    }
    let ois = overlapingIndices(tmpB, aBs);

    return { canPut: ois < 1, box: tmpB };
}

function respawnArrangers(as, aBs) {
    let tmpBs = [];
    as.forEach(a => {
        if (a.length > Math.max(boxShorterLength(), boxLongerLength())) return;
        let fromX = Math.floor(Math.random() * (720 - 350 + 1)) + 350;
        let fromY = Math.floor(Math.random() * (540 - 240 + 1)) + 240;
        a.fromP = { x: fromX, y: fromY };
        a.length = Math.floor(Math.random() * (150 - 40 + 1)) + 40;
        a.content = fromY < 420 ? (fromX > 640 ? 9 : 1) : 3;

        let fb = regionCanPutWithArrangeBox(a, aBs);
        if (!fb.canPut) {
            a.length = 0;
            return;
        }
        let ois = overlapingIndices(fb.box, tmpBs);
        if (ois.length > 0) {
            a.length = 0;
            return;
        }
        tmpBs.push(fb.box);
    });
}

function updateArrangers(arrangers, agents, aBs) {
    arrangers.forEach(a => { updateThrougCount(a, agents); });
    let maxCount = 0;
    arrangers.forEach(a => { if (a.throughCount > maxCount) maxCount = a.throughCount; });
    console.log(maxCount);
    arrangers.forEach(a => {
        if (a.throughCount > 10) {
            a.length = a.length * (1 - 0.5 * (1 + a.throughCount) / (1 + maxCount));
        }
    });
    respawnArrangers(arrangers, aBs);
}