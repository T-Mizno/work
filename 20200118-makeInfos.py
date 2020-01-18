# coding: utf-8
import sys
import os
import glob

dirs = ['2019-07-28-Sun-てんや側入口', '2019-07-28-Sun-メイン入口',
        '2019-07-29-Mon-てんや側入口', '2019-07-29-Mon-メイン入口']

for d in dirs:
    fs = glob.glob(d+'/*.tdr')
    for f in fs:
        print(", '"+os.path.basename(f)+"'"+":" + "'"+d+"'", end="")
