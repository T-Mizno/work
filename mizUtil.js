"use strict";

class CycArr {
    constructor(aMaxSize) {
        this.MaxSize = aMaxSize;
        this.data = new Array(this.MaxSize);
        this.currentNext = 0;
        this.currentSize = 0;
    }

    add(x) {
        if(this.currentSize < this.MaxSize) {
            this.currentSize ++;
        }
        this.data[this.currentNext] = x;
        this.currentNext = (this.currentNext+1) % this.MaxSize;
    }

    at(aI) {
        if(this.currentSize < this.MaxSize) {
            return this.data[aI];
        }
        let i = (this.currentNext+aI) % this.MaxSize;
        return this.data[i];
    }

    set(aI, x) {
        if(this.currentSize < this.MaxSize) {
            this.data[aI] = x;
            return;
        }
        let i = (this.currentNext+aI) % this.MaxSize;
        this.data[i] = x;
    }

    size() {
        return this.currentSize;
    }

    stdoutBear() {
        let str = "currentNext:"+this.currentNext+": bear: ";
        for(let i=0; i<this.data.length; i++) {
            str = str + " " + this.data[i];
        }
        console.log(str);
    }
}


let ar = new CycArr(5);

for(let i=11; i<20; i++) {
    ar.add(i);
    let str = "";
    for(let k=0; k<ar.size(); k++) {
        str = str + " " + ar.at(k);
    }
    console.log(str);
}

for(let i=0; i<ar.size(); i++) {
    ar.set(i, 0.1*i);
    let str = "";
    for(let k=0; k<ar.size(); k++) {
        str = str + " " + ar.at(k);
    }
    console.log(str);
}

for(let i=100; i<110; i++) {
    ar.add(i);
    let str = "";
    for(let k=0; k<ar.size(); k++) {
        str = str + " " + ar.at(k);
    }
    console.log(str);
}
