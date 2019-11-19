from PIL import Image
import numpy as np
import math
import csv

import sys

colorSamples = [[171,223,234],#0
[248,168,153],#1
[233,51,56],#3
[192,191,192],#4
[101,103,173],#5
[149,149,201],#6
[0,0,255],#7
[167,211,139],#8
[249,243,154],#9
[195,134,73],#10
[0,0,0],#black
[255,255,255]#white
]

def colorDiff(a,b):
    dif = 0
    for i in range(3):
        dif = dif + abs(a[i]-b[i])
    return dif

def resetColor(c):
    minIndex = 0
    minDiff = 255*255*255
    for i in range(len(colorSamples)):
        dif = colorDiff(c,colorSamples[i])
        if dif<minDiff:
            minIndex = i
            minDiff = dif
    for i in range(3):
        c[i] = colorSamples[minIndex][i]
    return minIndex

M = 160
N = M

args = sys.argv
if len(args) < 2:
    print("Usage: python3 script.py imgfile")
    exit()

# 元となる画像の読み込み
imgOrigin = Image.open(args[1])
widthOrign, heightOrigin = imgOrigin.size
N = round(M/widthOrign*heightOrigin)

#img = imgOrigin.resize((M, N), Image.LANCZOS)
img = imgOrigin.resize((M, N), Image.NEAREST)


img.save("out.png")

arr = np.array(img)

m, n, c = arr.shape

strs = []
for i in range(m):
    for j in range(n):
        #resetColor(arr[i][j])
        chroma = '0x%02X%02X%02X' % (arr[i][j][0], arr[i][j][1], arr[i][j][2])
        chromaStr = ""+chroma
        # strs.append(chromaStr.lower())
        strs.append(chromaStr)


print('let imgDataStr="{', end="")
print('\\"m\\":', m, ',', end="")
print('\\"n\\":', n, ',', end="")
print('\\"data\\":[', '\\"'+strs[0]+'\\"', end="")
for i in range(1, len(strs)):
    print(',', '\\"'+strs[i]+'\\"', end="")
print(']}";')

print('''
let imgData = JSON.parse(imgDataStr);
let img = [];
for (let i = 0; i < imgData["m"]; i++) {
    let row = [];
    for (let j = 0; j < imgData["n"]; j++) {
        row.push(imgData["data"][i * imgData["n"] + j]);
    }
    img.push(row);
}
''')

#exit()

outs = []
for i in range(m):
    row = []
    for j in range(n):
        chroma = '0x%02X%02X%02X' % (arr[i][j][0], arr[i][j][1], arr[i][j][2])
        chromaStr = ""+chroma
        #row.append(chromaStr+','+'--')
        row.append(resetColor(arr[i][j]))
    outs.append(row)

with open('out.csv', 'w') as f:
    writer = csv.writer(f, lineterminator='\n') # 改行コード（\n）を指定しておく
    writer.writerows(outs) # 2次元配列も書き込める


#print(m,n)
