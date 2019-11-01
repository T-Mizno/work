from PIL import Image
import numpy as np


M = 80
N = M

# 元となる画像の読み込み
imgOrigin = Image.open('./gardenPlan1.jpg')

img = imgOrigin.resize((M, N), Image.LANCZOS)


img.save("out.jpg")

arr = np.array(img)

w, h, c = arr.shape

strs = []
for j in range(w):
    for i in range(h):
        chroma = '0x%02X%02X%02X' % (arr[i][j][0], arr[i][j][1], arr[i][j][2])
        chromaStr = ""+chroma
        # strs.append(chromaStr.lower())
        strs.append(chromaStr)


print('let imgDataStr="{', end="")
print('\\"m\\":', M, ',', end="")
print('\\"n\\":', N, ',', end="")
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
        row.push(imgData["data"][i * imgData["m"] + j]);
    }
    img.push(row);
}
''')
