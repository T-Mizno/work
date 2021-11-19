function newNetwork(aInputSize, aBatchSize, aStrOptimizer) {
    let newLayers = [];
    newLayers.push(inputLayer(aInputSize, aBatchSize));
    newLayers.strOptimizer = aStrOptimizer;
    return newLayers;
}

function net2JSON(aNet) {
    let objs = [];
    for (let n of aNet) {
        objs.push(n.toSaveObj(n));
    }
    return JSON.stringify(objs);
}

function loadNetFromJSON(aNet, aStr) {
    let objs = JSON.parse(aStr);
    for (let i = 0; i < aNet.length; i++) {
        aNet[i].loadObj(aNet[i], objs[i]);
    }
}

function addLayer(aLayers, aNewLayer) {
    let last = aLayers[aLayers.length - 1];
    last.to = aNewLayer;
    aNewLayer.from = last;
    aLayers.push(aNewLayer);
}

function forward(aLayers, aInputs) {
    matCopy(aInputs, aLayers[0].outs);
    for (let l = 0; l < aLayers.length; l++) {
        aLayers[l].forward(aLayers[l]);
    }
}

function error(aNet, aTeachers) {
    let last = aNet[aNet.length - 1];
    return last.error(last, aTeachers);
}

function backward(aNet, aTeachers) {
    let last = aNet[aNet.length - 1];
    last.backward(last, aTeachers);
    for (let l = aNet.length - 2; l >= 1; l--) {
        aNet[l].backward(aNet[l]);
    }
}

function updateWeights(aNet) {
    for (let l of aNet) {
        for (let w of l.varAndDelta(l)) {
            matUpdateWeights(w.var, w.delta, w.moment, aNet.strOptimizer);
        }
    }
}

function matUpdateWeights(W, dW, vW, aStrOptimier) {
    if (aStrOptimier == "momentum") {
        updateMomentum(W, dW, vW, 0.9, 0.01);
        return;
    }
    if (aStrOptimier == "AdaGrad") {
        updateAdaGrad(W, dW, vW, 0.1);
        return;
    }

    // "SDG"
    updateSDG(W, dW, 0.1);
}

function updateSDG(W, dW, eta) {
    matForeachSet(W, (i, j) => {
        return W[i][j] - eta * dW[i][j];
    });
}
function updateMomentum(W, dW, vW, alpha, eta) {
    matForeachSet(W, (i, j) => {
        vW[i][j] = alpha * vW[i][j] - eta * dW[i][j];
        return W[i][j] + vW[i][j];
    });
}
function updateAdaGrad(W, dW, vW, eta) {
    matForeachSet(W, (i, j) => {
        vW[i][j] += Math.pow(dW[i][j], 2);
        if (vW[i][j] <= 0.0) vW[i][j] = eta;
        return W[i][j] - eta / (Math.sqrt(vW[i][j])) * dW[i][j];
    });
}

function newLayer(aInputSize, aOutputSize, aBatchSize) {
    return {
        outs: newMatrix(aBatchSize, aOutputSize),
        dIns: newMatrix(aBatchSize, aInputSize),
        inSize: aInputSize,
        outSize: aOutputSize,
        batchSize: aBatchSize,
        from: null,
        to: null,
        forward: function (t) { },
        backward: function (t) { },
        varAndDelta: function (t) { return []; },
        toSaveObj: (l) => { return {}; },
        loadObj: (l, o) => { }
    };
}

function inputLayer(aSize, aBatchSize) {
    let l = newLayer(aSize, aSize, aBatchSize);
    return l;
}

function affineLayer(aInSize, aOutSize, aBatchSize) {
    let l = newLayer(aInSize, aOutSize, aBatchSize);

    l.isAffine = true;
    l.w = newRandMatrix(aInSize, aOutSize, 0, Math.sqrt(2.0 / aInSize));
    l.b = newRandMatrix(1, aOutSize, 0, Math.sqrt(2.0 / aInSize));
    l.dw = newMatrix(aInSize, aOutSize);
    l.db = newMatrix(1, aOutSize);
    l.vw = newMatrixWithZero(aInSize, aOutSize);
    l.vb = newMatrixWithZero(1, aOutSize);

    l.forward = (t) => {
        //t : thisLayer
        setMatMulti(t.from.outs, t.w, t.outs);
        // bias
        matForeach(t.outs, (b, o) => { t.outs[b][o] += t.b[0][o]; });
    };
    l.backward = (t) => {
        //t: thisLayer
        setAAt(t.to.dIns, t.w, t.dIns);
        setAtA(t.from.outs, t.to.dIns, t.dw);
        setVal(t.db, 0.0);
        // bias
        setMatSumAlongAxis0(t.to.dIns, t.db);
        setMatMultiScalar(1.0 / t.batchSize, t.db, t.db);
    };

    l.varAndDelta = (t) => {
        return [
            { var: t.w, delta: t.dw, moment: t.vw },
            { var: t.b, delta: t.db, moment: t.vb }
        ];
    };

    l.toSaveObj = (t) => {
        return { wm: t.w.m, wn: t.w.n, w: t.w, bm: t.b.m, bn: t.b.n, b: t.b };
    }
    l.loadObj = (t, o) => {
        t.w = o['w'];
        t.w.m = o['wm'];
        t.w.n = o['wn'];
        t.b = o['b'];
        t.b.m = o['bm'];
        t.b.n = o['bn'];
    }

    return l;
}


// 参考: https://kratzert.github.io/2016/02/12/understanding-the-gradient-flow-through-the-batch-normalization-layer.html
// ######################### 途中
function batchNormLayer(aSize, aBatchSize, aEpsilon) {
    l = newLayer(aSize, aSize, aBatchSize);

    l.mu = newMatrixWithZero(1, aSize);
    l.dmu = newMatrixWithZero(1, aSize);
    l.dx1 = newMatrix(aBatchSize, aSize);
    l.dx2 = newMatrix(aBatchSize, aSize);
    l.xmu = newMatrix(aBatchSize, aSize);
    l.dxmu1 = newMatrix(aBatchSize, aSize);
    l.dxmu2 = newMatrix(aBatchSize, aSize);
    l.var = newMatrix(1, aSize);
    l.dvar = newMatrix(1, aSize);
    l.ivar = newMatrix(1, aSize);
    l.divar = newMatrix(1, aSize);
    l.xhat = newMatrix(aBatchSize, aSize);
    l.dxhat = newMatrix(aBatchSize, aSize);
    l.sqrtvar = newMatrix(1, aSize);
    l.dsqrtvar = newMatrix(1, aSize);
    l.dsq = newMatrix(aBatchSize, aSize);
    l.epsilon = aEpsilon;
    l.beta = newMatrixWithZero(1, aSize);
    l.dbeta = newMatrixWithZero(1, aSize);
    l.gamma = newMatrix(1, aSize);
    l.dgamma = newMatrix(1, aSize);

    // moment
    l.vgamma = newMatrix(1, aSize);
    l.vbeta = newMatrix(1, aSize);

    l.forward = (t) => {
        //t:this layer

        // mu
        setMatSumAlongAxis0(t.from.outs, t.mu);
        setMatMultiScalar(1.0 / t.batchSize, t.mu, t.mu);

        //xmu
        matForeach(t.xmu, (b, o) => { t.xmu[b][o] = t.from.outs[b][o] - t.mu[0][o]; });

        //var
        setVal(t.var, 0.0);
        matForeachAlongAxis0(t.xmu, (b) => {
            for (let o = 0; o < t.inSize; o++) t.sqrtvar[0][o] += Math.pow(t.xmu[b][o], 2) / t.batchSize;
        });

        //sqrtvar
        matForeach(t.var, (first, o) => { t.sqrtvar[first][o] = Math.sqrt(t.var[first][o] + t.epsilon) });


        //ivar
        matForeach(t.var, (first, o) => { t.ivar[first][o] = 1.0 / t.sqrtvar[first][o]; });

        // xhat
        matForeach(t.xhat, (b, o) => { t.xhat[b][o] = t.xmu[b][o] * t.ivar[0][o]; });

        // outs
        matForeach(t.outs, (b, o) => { t.outs[b][o] = t.gamma[0][o] * t.xhat[b][o] + t.beta[0][o]; });

    };

    l.backward = (t) => {
        //t: this layer
        // dbeta
        setMatSumAlongAxis0(t.to.dIns, t.dbeta);

        let dgammax = t.to.dIns;

        // dgmma
        setVal(t.dgamma, 0.0);
        matForeachAlongAxis0(dgammax, (b) => {
            for (let o = 0; o < t.outSize; o++) { t.dgamma[0][o] += dgammax[b][o] * t.xhat[b][o]; }
        });

        //dxhat
        matForeach(t.dxhat, (b, o) => { t.dxhat[b][o] = dgammax[b][o] * t.gamma[0][o]; });

        //divar
        setVal(t.divar, 0.0);
        matForeach(t.dxhat, (b, o) => { t.divar[0][o] += t.dxhat[b][o] * t.xmu[b][o]; });

        matForeach(t.dxmu1, (b, o) => { t.dxmu1[b][o] = t.dxhat[b][o] * t.ivar[0][o]; });

        matForeach(t.dsqrtvar, (first, o) => {
            t.dsqrtvar[first][o] = -1.0 / Math.sqrt(t.sqrtvar[first][o], 2) * t.divar[first][o];
        });

        matForeach(t.dvar, (first, o) => {
            t.dvar[first][o] = 0.5 * 1.0 / Math.sqrt(t.var[first][o] + t.epsilon) * t.dsqrtvar[first][o];
        });

        matForeach(t.dsq, (b, o) => { t.dsq[b][o] = t.dvar[0][o] / t.batchSize; });

        matForeach(t.dxmu2, (b, o) => { t.dxmu2[b][o] = 2.0 * t.xmu[b][o] * t.dsq[b][o]; });

        matForeach(t.dx1, (b, o) => { t.dx1[b][o] = t.dxmu1[b][o] + t.dxmu2[b][o]; });

        setVal(t.dmu, 0.0);
        matForeach(t.dxmu1, (b, o) => { t.dmu[0][o] += -1.0 * (t.dxmu1[b][o] + t.dxmu2[b][o]); });

        matForeach(t.dx2, (b, o) => { t.dx2[b][o] = t.dmu[0][o] / t.batchSize; });

        matForeach(t.dIns, (b, o) => { t.dIns[b][o] = t.dx1[b][o] + t.dx2[b][o]; });

    };

    l.varAndDelta = (t) => {
        return [
            { var: t.gamma, delta: t.dgamma, moment: t.vgamma },
            { var: t.beta, delta: t.dbeta, moment: t.vbeta }
        ];
    };
    return l;
}

function reluLayer(aSize, aBatchSize) {
    let l = newLayer(aSize, aSize, aBatchSize);

    l.forward = (t) => {
        matForeachSet(t.outs, (b, o) => { return Math.max(0, t.from.outs[b][o]); });
    };
    l.backward = (t) => {
        matForeachSet(t.dIns, (b, j) => {
            if (t.outs[b][j] <= 0) return 0.0;
            //else return t.to.dIns[b][j];
            else return t.to.dIns[b][j] / t.batchSize;
        });
    };

    return l;
}

function simpleErrorLayer(aSize, aBatchSize) {
    let l = newLayer(aSize, aSize, aBatchSize);

    l.forward = (t) => { matCopy(t.from.outs, t.outs); };

    l.backward = (t, teachers) => {
        matForeachSet(t.dIns, (b, o) => { return 2 * (t.outs[b][o] - teachers[b][o]) / t.batchSize; });
    };

    l.error = (t, teachers) => {
        let er = matAccumulate(t.outs, 0.0, (acc, b, o) => { return acc + Math.pow(t.outs[b][o] - teachers[b][o], 2); });
        return er / t.batchSize;
    };

    return l;
}

function softMaxWithLossLayer(aSize, aBatchSize) {
    let l = newLayer(aSize, aSize, aBatchSize);

    l.forward = (t) => {
        //t: thisLayer
        matForeachAlongAxis0(t.outs, (b) => { // for each of batch
            let sum = rangeAccumulate(0, t.inSize, 0.0, (acc, o) => { return acc + Math.exp(t.from.outs[b][o]); });

            rangeForeach(0, t.inSize, (o) => { t.outs[b][o] = Math.exp(t.from.outs[b][o]) / sum; });
        });
    };

    l.backward = (t, teachers) => {
        //t: thisLayer
        matForeachSet(t.dIns, (b, o) => { return (t.outs[b][o] - teachers[b][o]) / t.batchSize; });
    };

    l.error = (t, teachers) => {
        //t: this layer
        let er = matAccumulate(t.outs, 0.0, (acc, b, o) => { return acc + teachers[b][o] * Math.log(t.outs[b][o]); });
        return -er / t.batchSize;
    }

    return l;
}

function newMatrix(aM, aN) {
    let mat = new Array(aM);
    for (let i = 0; i < aM; i++) {
        mat[i] = new Array(aN);
    }
    mat.m = aM;
    mat.n = aN;
    setRandVal0to1(mat);
    return mat;
}

function newMatrixWithVal(am, an, aval) {
    let mat = newMatrix(am, an);
    setVal(mat, aval);
    return mat;
}

function newMatrixWithZero(aM, aN) {
    return newMatrixWithVal(aM, aN, 0.0);
}


function newRandMatrix(aM, aN, mu, s) {
    // mu: 平均, s: 標準偏差
    let mat = newMatrix(aM, aN);
    setRandValMuSigma(mat, mu, s);
    //setRandVal0to1(mat);

    return mat;
}

function setMatMulti(aA, aB, aC) {
    // C = A*B
    matForeachSet(aC, (i, j) => {
        return rangeAccumulate(0, aA.n, 0.0, (sum, k) => { return sum + aA[i][k] * aB[k][j]; });
    })
}

function matMulti(aA, aB) {
    let matC = newMatrix(aA.m, aB.n);
    setMatMulti(aA, aB, matC);
    return matC;
}

function setAAt(aA, aB, aC) {
    // C := A Bt
    matForeachSet(aC, (i, j) => {
        return rangeAccumulate(0, aA.n, 0.0, (sum, k) => { return sum + aA[i][k] * aB[j][k]; });
    });
}

function setAtA(aA, aB, aC) {
    // C := At B
    matForeachSet(aC, (i, j) => {
        return rangeAccumulate(0, aA.m, 0.0, (sum, k) => { return sum + aA[k][i] * aB[k][j]; });
    });
}

function setMatAdd(aA, aB, aC) {
    // C = A + B
    matForeach(aA, (i, j) => { aC[i][j] = aA[i][j] + aB[i][j]; });
}

function setMatSumAlongAxis0(aA, aC) {
    // aC must be 1 x aA.n matrix.
    setVal(aC, 0.0);
    matForeachAlongAxis0(aA, (i) => {
        for (let j = 0; j < aA.n; j++) aC[0][j] += aA[i][j];
    });
}
function setMatAverageAlongAxis0(aA, aC) {
    // aC must be 1 x aA.n matrix.
    setMatSumAlongAxis0(aA, aC);
    for (let j = 0; j < aC.n; j++) { aC[0][j] = aC[0][j] / aA.m; }
}


function matForeach(aA, f) {
    // f is a function f(i, j)
    for (let i = 0; i < aA.m; i++) {
        for (let j = 0; j < aA.n; j++) {
            f(i, j);
        }
    }
}
function matForeachSet(aA, f) {
    // f is a function f(i,j)
    matForeach(aA, (i, j) => { aA[i][j] = f(i, j); });
}

function matSetFromArray(aA, aArray) {
    matForeach(aA, (i, j) => { aA[i][j] = aArray[i][j]; });
}

function matForeachAlongAxis0(aA, f) {
    // f is a function f(i).
    for (let i = 0; i < aA.m; i++) {
        f(i);
    }
}

function setMatMultiScalar(aVal, aA, aC) {
    matForeach(aA, (i, j) => { aC[i][j] = aVal * aA[i][j]; })
}

function setVal(aA, aVal) {
    matForeachSet(aA, (i, j) => { return aVal; });
}

function setRandVal0to1(aA) {
    matForeachSet(aA, (i, j) => { return Math.random(); });
}

function setRandValMuSigma(aA, mu, s) {
    matForeachSet(aA, (i, j) => { return normRand(mu, s); });
}

//正規分布に従う乱数 N(mu, s2)
// 参考: Javascriptで正規分布の実装まとめ（乱数、累積分布関数など）
// 参考url: https://www.marketechlabo.com/normal-distribution-javascript/
function normRand(mu, s) {
    // mu:平均, s:標準偏差
    let x = Math.sqrt(-2 * Math.log(1 - Math.random())) * Math.cos(2 * Math.PI * Math.random());
    return x * s + mu;
}

function matCopy(aFrom, aTo) {
    matForeach(aFrom, (i, j) => { aTo[i][j] = aFrom[i][j]; });
}

function list2matrix(aM, aN, al) {
    let mat = newMatrix(aM, aN);
    matForeachSet(mat, (i, j) => {
        let k = i * mat.n + j;
        if (k >= al.length) return 0.0;
        else return al[k];
    });
    return mat;
}

function matDiff(aA, aB) {
    return matAccumulate(aA, 0.0, (acc, i, j) => { return acc + Math.abs(aA[i][j] - aB[i][j]); });
}

function matAccumulate(aA, init, f) {
    // newAcc = f(acc, i,j)
    let acc = init;
    matForeach(aA, (i, j) => { acc = f(acc, i, j); });
    return acc;
}

function rangeAccumulate(numBegin, numEnd, init, f) {
    // newAcc = f(acc, i)
    let acc = init;
    for (let i = numBegin; i < numEnd; i++) {
        acc = f(acc, i);
    }
    return acc;
}

function rangeForeach(numBegin, numEnd, f) {
    // f(i,j)
    for (let i = numBegin; i < numEnd; i++) { f(i); }
}
/////////////////////////////////////////////////////////////////////////////
// for test
/////////////////////////////////////////////////////////////////////////////

function testMatMulti() {
    let a = list2matrix(2, 3, [1, -2, 3, 4, 5, 6]);
    let b = list2matrix(3, 3, [1, 1, -1, 2, 3, -3, 4, -5, 2]);
    let ab = matMulti(a, b);
    let ans = list2matrix(2, 3, [9, -20, 11, 38, -11, -7]);
    console.log("test:matMulti", matDiff(ab, ans));
}

function testSetAAt() {
    let a = list2matrix(3, 2, [2, 3, 1, 3, 4, 1]);
    let b = list2matrix(3, 2, [0, 1, 2, 3, 1, 0]);
    let ab = newMatrix(3, 3);
    setAAt(a, b, ab);
    let ans = list2matrix(3, 3, [3, 13, 2, 3, 11, 1, 1, 11, 4]);
    console.log("test:setAAt", matDiff(ab, ans));
}

function testSetAtA() {
    let a = list2matrix(3, 2, [1, 4, -2, 5, 3, 6]);
    let b = list2matrix(3, 3, [1, 1, -1, 2, 3, -3, 4, -5, 2]);
    let ab = newMatrix(2, 3);
    setAtA(a, b, ab);
    let ans = list2matrix(2, 3, [9, -20, 11, 38, -11, -7]);
    console.log("test:setAtA", matDiff(ab, ans));
}

function testMultiScalar() {
    let a = list2matrix(3, 2, [1, 4, -2, 5, 3, 6]);
    let b = newMatrix(a.m, a.n);
    setMatMultiScalar(-0.5, a, b);
    let ans = list2matrix(3, 2, [-0.5, -2, 1, -2.5, -1.5, -3]);
    console.log("test: multiScalar", matDiff(b, ans));
}

function testMatSumAlongAxis0() {
    let a = list2matrix(3, 2, [1, 4, -2, 5, 3, 6]);
    let s = newMatrix(1, 2);
    setMatSumAlongAxis0(a, s);
    console.log(a);
    console.log(s);

    let ans = list2matrix(1, 2, [2, 15]);
    console.log("test: sumAlongAxis0", matDiff(s, ans));
}

//testMatMulti();
//testSetAAt();
//testSetAtA();
//testMultiScalar();
//testMatSumAlongAxis0();
//return;

function testFuncXOR(x, y) {
    if ((x[0] >= 0.5 && x[1] >= 0.5) || (x[0] < 0.5 && x[1] < 0.5)) {
        y[0] = 0.0;
        y[1] = 1.0;
        return;
    }
    y[0] = 1.0;
    y[1] = 0.0;
}

function testFuncNAND(x, y) {
    if (x[0] < 0.5 && x[1] < 0.5) {
        y[0] = 1.0;
        y[1] = 0.0;
        return;
    }
    y[0] = 0.0;
    y[1] = 1.0;
}

function searchMaxIndex(x) {
    let maxI = 0;
    let max = x[0];
    for (let i = 0; i < x.length; i++) {
        if (x[i] > max) {
            maxI = i;
            max = x[i];
        }
    }
    return maxI;
}

function testFuncMax(x, y) {
    for (let i = 0; i < y.length; i++) { y[i] = 0.0; }
    y[searchMaxIndex(x)] = 1.0;
}

function testFuncLinear(x, y) {
    y[0] = 1 * Math.pow(x[0], 2) + 0.5 * x[1] + 0.5;
    y[1] = 0.5 * x[0] + 2.0 * Math.sqrt(x[1]);
}

function testFunc(x, y) {
    testFuncXOR(x, y);
    //testFuncNAND(x, y);
    //testFuncMax(x, y);
    //testFuncLinear(x, y);
}

let b = 10; // size of one batch
let batchNum = 100;
let inputSize = 2;
let allTrains = newMatrix(b * batchNum, inputSize);
setRandVal0to1(allTrains);

function setNextBatch(aBatchCount, aAllTrains, batch, teacher) {
    matForeach(batch, (i, j) => { batch[i][j] = aAllTrains[aBatchCount * batch.m + i][j]; });
    matForeachAlongAxis0(batch, (i) => { testFunc(batch[i], teacher[i]); });
}

let trainInputs = newMatrix(b, inputSize);
let trainOutputs = newMatrix(b, inputSize);

let testInputs = newMatrix(b, inputSize);
let testOutputs = newMatrix(b, inputSize);
setRandVal0to1(testInputs);
matForeach(testInputs, (b) => { testFunc(testInputs[b], testOutputs[b]); });

//let bl = batchNormLayer(5, b, 0.1);

function testClassfyNet(aInSize, aOutSize, aBatchSize, aOptimizer) {
    let _net = newNetwork(aInSize, aBatchSize, aOptimizer);
    addLayer(_net, affineLayer(aInSize, 10, aBatchSize));
    addLayer(_net, reluLayer(10, aBatchSize));
    addLayer(_net, affineLayer(10, 10, aBatchSize));
    addLayer(_net, reluLayer(10, aBatchSize));
    addLayer(_net, affineLayer(10, aOutSize, aBatchSize));
    addLayer(_net, softMaxWithLossLayer(aOutSize, aBatchSize));
    return _net;
}

let net = testClassfyNet(inputSize, inputSize, b, "SDG");
let netM = testClassfyNet(inputSize, inputSize, b, "momentum");
let netA = testClassfyNet(inputSize, inputSize, b, "AdaGrad");

function repeat(itrMax, f) {
    // f must be a function f(itr).
    rangeForeach(0, itrMax, (itr) => { f(itr); });
}

repeat(100, (itr) => {
    let trainError = 0.0;
    let trainErrorM = 0.0;
    let trainErrorA = 0.0;

    repeat(batchNum, (bcount) => {
        setNextBatch(bcount, allTrains, trainInputs, trainOutputs);

        forward(net, trainInputs);
        forward(netM, trainInputs);
        forward(netA, trainInputs);

        trainError += error(net, trainOutputs);
        trainErrorM += error(netM, trainOutputs);
        trainErrorA += error(netA, trainOutputs);

        backward(net, trainOutputs);
        backward(netM, trainOutputs);
        backward(netA, trainOutputs);

        updateWeights(net);
        updateWeights(netM);
        updateWeights(netA);
    });

    // record errors
    console.log("train error", trainError / batchNum, trainErrorM / batchNum, trainErrorA / batchNum);

    //forward(net, testInputs);
    //console.log("test  error", error(net, testOutputs));
});
//console.log(bl.gamma, bl.beta);
//return;
//forward(net, testInputs);
//console.log("error", error(net, testOutputs));
//console.log("outs", net[net.length - 2].outs);
//console.log("train  in", trainInputs);
forward(net, trainInputs);
console.log("outs", net[net.length - 1].outs);
//backward(net, trainOutputs);
//console.log("outs dIns", net[net.length - 1].dIns);
console.log("train out", trainOutputs);

forward(net, testInputs);
console.log("outs", net[net.length - 1].outs);
//backward(net, trainOutputs);
//console.log("outs dIns", net[net.length - 1].dIns);
console.log("test input", testInputs);
console.log("test out    ", testOutputs);


str = "let VAR0='" + net2JSON(net) + "';"
console.log(str)


let VAR0 = '[{},{"wm":2,"wn":10,"w":[[-0.3704727605434812,-0.2985321492247155,-2.1967701382860296,-0.31385514145835613,0.5707176997979165,0.6434481088844047,-2.1160380755863692,0.14130157634713345,-1.2296704223491313,0.3643392470223404],[-1.5271096866375677,-0.3223664338229139,-0.7746830277986102,2.568851229500636,-0.3054011918081761,2.0069660978665413,1.6825788434519207,1.709739239231851,0.7797407946974326,0.6248682839846078]],"bm":1,"bn":10,"b":[[-0.8407082551697302,0.9964697925870013,0.5248101329923868,-2.145880441730053,-0.11544471515707751,0.35033684927500386,0.9933296412330751,-0.540535103995746,-0.9546382629523666,0.8483445945127631]]},{},{"wm":10,"wn":10,"w":[[0.18520840860481394,-0.14856884612998367,-0.5371747109557452,0.4317435599094318,-0.4169756553383245,-0.4112541075920737,0.17604416389020083,-0.5890983060697503,-0.4358699355090713,0.5059988479131556],[-1.2258427356710444,1.0795161095748167,-1.1399298905720747,0.29927811112464214,-0.38002780225391264,-0.21696164811580107,0.6986957035577543,1.0018625977759448,-0.18024856424018648,0.20440670707087008],[-0.08314752723006465,0.5613000626215829,-0.4414241064057823,-0.4047201012886535,0.12432578633244938,0.07897968412124123,0.11621346845021693,0.38295428797936465,-0.15361612983903855,0.15027801560833984],[0.27758909790334035,-0.4047359534254959,-0.1839367716564683,0.3684993282069659,-0.35548436927221555,-0.45320481036349347,-0.22199552914688434,0.08322897359793774,-0.19447544869986474,0.4907737270261946],[-0.021762957256720977,-0.013999500930226677,-0.575157443514612,0.037467497835564974,-0.36653798318531083,0.5217507299689128,0.47454000428517346,-1.1212477050115102,0.24428390367353298,-0.17845880746866224],[1.5567180097413489,-0.8849853020756712,0.06848149032194895,0.08235180403706963,0.03307673210958705,0.3994321163175165,-0.29854750955444403,-0.1614674776730828,0.03961808142997368,0.43820844106719903],[-1.35808009141553,0.4885761491268085,1.4167452642167955,-0.23312919025637024,-0.28129852007424017,-1.9312363296402444,-1.2244937930441815,-0.35285626100845163,0.1427211206529791,0.06985056214207949],[1.4774744624681466,-0.4491805155880795,0.28820964161405366,-0.3905334734697626,-0.3050572973007388,-1.0436970809351251,-0.1970309780821054,-0.42826709108141686,0.2876582471649435,0.6841926341289571],[0.18077655391144004,-0.40275889794895514,-0.6574302617092458,-0.3755522216806292,-0.14089265655285654,0.4656448078356103,-0.1064336873439339,-0.05402709252402829,0.5165789924714773,-0.37626642327781296],[-1.0812295081300658,-0.4196130158651768,-0.325977400034349,1.1031149666548166,-0.33638990517239525,0.8871454408075623,-0.7900540421840652,0.45182081620693665,-0.21691492068353338,0.026016468909969892]],"bm":1,"bn":10,"b":[[0.06972851607509249,1.1207266577966861,0.2773688487901374,0.5686745848248766,0.05350114258597618,0.256010071127452,-0.05849776868200635,0.29246807196775515,-0.3149378649858812,-0.3402377115806289]]},{},{"wm":10,"wn":2,"w":[[-6.038154319394349,5.206262913771506],[-3.7537662054178194,3.680121943459979],[2.9091493125401513,-2.7755645920295726],[0.21552336534716116,0.2010638356715614],[0.7893630009304434,-0.041649056378230805],[4.777664766164366,-5.077242382452399],[-0.4231069664347643,0.3403872211919185],[-2.5849355520840653,3.0535927563269856],[0.15926778356089072,0.4293753969859721],[1.002575984454833,-1.1687365723371423]],"bm":1,"bn":2,"b":[[-0.5159133548361359,-0.6470802647298994]]},{}]';
let sNet = testClassfyNet(inputSize, inputSize, b, "SDG");
loadNetFromJSON(sNet, VAR0);
forward(sNet, testInputs);
console.log("outs", sNet[sNet.length - 1].outs);