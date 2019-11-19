import csv

data = []
M = 112
N = 160

with open('160-1.csv') as f:
    reader = csv.reader(f)

    for row in reader:
        for col in row:
            data.append(col)

if len(data) < 1:
    exit()

print('let mapDataStr="{', end="")
print('\\"m\\":',M,',', end="")
print('\\"n\\":', N, ',', end="")
print('\\"data\\":[', data[0], end="")
for i in range(1, len(data)):
    print(',', data[i], end="")
print(']}";')

print('''
let floorData = JSON.parse(mapDataStr);
let floor = [];
for (let i = 0; i < floorData["m"]; i++) {
    let row = [];
    for (let j = 0; j < floorData["n"]; j++) {
        row.push(floorData["data"][i * floorData["n"] + j]);
    }
    floor.push(row);
}
''')

exit()

print('''
let str = "";
for (let i = 0; i < floor.length; i++) {
    for (let j = 0; j < floor[i].length; j++) {
        str += floor[i][j];
    }
    str += "\\n";
}
console.log(str);
''')