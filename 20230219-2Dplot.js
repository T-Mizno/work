function assert(b) {
    if (b) return;
    console.info(false, "ASSERT FALUE!");
    let e = new Error();
    //e = e.stack.split("\n")[2].split(":");
    //e.pop();
    console.log(e);
}


function _newAxis(aEnd, aToEnd) {
    assert(Math.abs(aEnd - aToEnd) > 0.0001);

    let axis = {};
    axis.end = aEnd;
    axis.toEnd = aToEnd;
    axis.length = aToEnd - aEnd;

    axis.isInteger = false;

    return axis;
}


function real2Integer(aV) {
    return Math.trunc(aV);
}

function _newIntegerAxis(aEnd, aToEnd) {
    let axis = _newAxis(real2Integer(aEnd), real2Integer(aToEnd));
    axis.isInteger = true;
    return axis;
}

function _axisTransform(aFrom, aTo, aVinFrom) {
    let l = (aVinFrom - aFrom.end) / aFrom.length;
    let vinTo = l * aTo.length + aTo.end;

    if (aTo.isInteger) vinTo = real2Integer(vinTo);

    return vinTo;
}

function newAxes(aXend, aXtoEnd, aYend, aYtoEnd) {
    let axes = {};
    axes.xAxis = _newAxis(aXend, aXtoEnd);
    axes.yAxis = _newAxis(aYend, aYtoEnd);

    axes.W = Math.abs(axes.xAxis.length);
    axes.H = Math.abs(axes.yAxis.length);

    return axes;
}

function newIntegerAxes(aXend, aXtoEnd, aYend, aYtoEnd) {
    let axes = {};
    axes.xAxis = _newIntegerAxis(aXend, aXtoEnd);
    axes.yAxis = _newIntegerAxis(aYend, aYtoEnd);

    axes.W = Math.abs(axes.xAxis.length);
    axes.H = Math.abs(axes.yAxis.length);

    return axes;
}

function x2x(aFromAxes, aToAxes, aX) {
    return _axisTransform(aFromAxes.xAxis, aToAxes.xAxis, aX);
}

function y2y(aFromAxes, aToAxes, aY) {
    return _axisTransform(aFromAxes.yAxis, aToAxes.yAxis, aY);
}

function x2y(aFromAxes, aToAxes, aX) {
    return _axisTransform(aFromAxes.xAxis, aToAxes.yAxis, aX);
}

function y2x(aFromAxes, aToAxes, aY) {
    return _axisTransform(aFromAxes.yAxis, aToAxes.xAxis, aY);
}

function w2w(aFromAxes, aToAxes, aW) {
    let w = aW * aToAxes.W / aFromAxes.W;
    if (aToAxes.isInteger) w = real2Integer(w);
    return w;
}

function h2h(aFromAxes, aToAxes, aH) {
    let h = aH * aToAxes.H / aFromAxes.H;
    if (aToAxes.isInteger) h = real2Integer(h);
    return h;
}



/**************************************************************************************

for example:

in html code

<article id="linegraph"></article>

in script code

let str = svgLineGraph(800, 300, [xys1, xys2, ...]); // xys1, xys2 is array of [x, y]
let linegraph = document.getElementById('linegraph');
linegraph.innerHTML = str;

***************************************************************************************/
function svgLineGraph(aCanvasWidth, aCanvasHeight, aXYss) {

    let canvasAxes = newIntegerAxes(0, aCanvasWidth, aCanvasHeight, 0);

    let COLORS = ["red", "green", "blue", "gray"];

    let bounds = { xmin: -1, xmax: 1, ymin: -1, ymax: 1 };
    for (let aXYs of aXYss) {
        for (let xy of aXYs) {
            if (xy[0] < bounds.xmin) bounds.xmin = xy[0];
            if (xy[0] > bounds.xmax) bounds.xmax = xy[0];
            if (xy[1] < bounds.ymin) bounds.ymin = xy[1];
            if (xy[1] > bounds.ymax) bounds.ymax = xy[1];
        }
    }
    let xMargin = Math.abs(bounds.xmax - bounds.xmin) * 0.1;
    let yMargin = Math.abs(bounds.ymax - bounds.ymin) * 0.1;

    let xyAxes = newAxes(bounds.xmin - xMargin, bounds.xmax + xMargin, bounds.ymin - yMargin, bounds.ymax + yMargin);

    let cX = (aX) => { return x2x(xyAxes, canvasAxes, aX); };
    let cY = (aY) => { return y2y(xyAxes, canvasAxes, aY); };

    let path = (fromX, fromY, toX, toY, color, strokeWidth) => {
        return "<path d=\"M " + fromX + " " + fromY + " L " + toX + " " + toY + "\" stroke=\"" + color + "\" stroke-width=\"" + strokeWidth + "\" />";
    };
    let circle = (x, y, color, r) => { return "<circle cx=\"" + x + "\" cy=\"" + y + "\" r=\"" + r + "\" stroke =\"" + color + "\" fill=\"" + color + "\" />"; }

    let text = (x, y, color, size, str) => {
        return "<text x=\"" + x + "\" y=\"" + y + "\" style=\"font-family: Times New Roman; font-size: " + size + "; stroke:none; fill:" + color + ";\">" + str + "</text>";
    }

    let str = "<?xml version=\"1.0\"?><svg width=\"" + aCanvasWidth + "\" height=\"" + aCanvasHeight + "\" xmlns=\"http://www.w3.org/2000/svg\">";

    str += path(cX(xyAxes.xAxis.end), cY(0), cX(xyAxes.xAxis.toEnd), cY(0), "black", 3);
    str += path(cX(0), cY(xyAxes.yAxis.end), cX(0), cY(xyAxes.yAxis.toEnd), "black", 3);

    for (let i = 0; i < aXYss.length; i++) {
        //for (let aXYs of aXYss) {
        let aXYs = aXYss[i];
        let color = COLORS[i % COLORS.length];

        if (aXYs.length > 1) {
            let s = "<path d=\"M " + cX(aXYs[0][0]) + " " + cY(aXYs[0][1]);
            for (let i = 1; i < aXYs.length; i++) {
                s += " L " + cX(aXYs[i][0]) + " " + cY(aXYs[i][1]);
            }
            s += "\" stroke =\"" + color + "\" fill=\"transparent\" stroke-width=\"2\" />";
            str += s;
        }

        if (aXYs.length >= 1) {
            str += circle(cX(aXYs[aXYs.length - 1][0]), cY(aXYs[aXYs.length - 1][1]), color, 5);
            str += text(cX(aXYs[aXYs.length - 1][0]) + 6, cY(aXYs[aXYs.length - 1][1]), color, 20, "" + i);
        }

    }

    str += text(cX(0) - 20, cY(0) + 20, "black", 20, "O");
    str += text(cX(bounds.xmax), cY(0) + 20, "black", 20, "" + bounds.xmax);
    str += text(cX(0) - 20, cY(bounds.ymax), "black", 20, "" + bounds.ymax);

    str += "</svg>";

    return str;
}
