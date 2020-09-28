###
# http://whitewell.sakura.ne.jp/OpenCV/py_tutorials/py_video/py_lucas_kanade/py_lucas_kanade.html
###

import numpy as np
import cv2

cap = cv2.VideoCapture(0)

# ShiTomasiコーナー検出器のためのパラメータ
feature_params = dict(maxCorners=100,
                      qualityLevel=0.3,
                      minDistance=7,
                      blockSize=7)

# Lucas-Kanade法によるオプティカル・フローのためのパラメータ
lk_params = dict(winSize=(15, 15),
                 maxLevel=2,
                 criteria=(cv2.TERM_CRITERIA_EPS | cv2.TERM_CRITERIA_COUNT, 10, 0.03))

# ランダムな色の生成
color = np.random.randint(0, 255, (100, 3))

# 最初のフレームを取り出し、コーナーを求める
ret, old_frame = cap.read()
# 最初の数フレームは読み込みに失敗するので
for itr in range(5):
    ret, old_frame = cap.read()

old_gray = cv2.cvtColor(old_frame, cv2.COLOR_BGR2GRAY)
p0 = cv2.goodFeaturesToTrack(old_gray, mask=None, **feature_params)

# 描画のためマスク画像を生成
mask = np.zeros_like(old_frame)

while(1):
    ret, frame = cap.read()
    frame_gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)

    # オプティカル・フローを計算
    p1, st, err = cv2.calcOpticalFlowPyrLK(
        old_gray, frame_gray, p0, None, **lk_params)

    # 良い特徴点を選択
    good_new = p1[st == 1]
    good_old = p0[st == 1]

    # 物体追跡を描画
    for i, (new, old) in enumerate(zip(good_new, good_old)):
        a, b = new.ravel()
        c, d = old.ravel()
        mask = cv2.line(mask, (a, b), (c, d), color[i].tolist(), 2)
        frame = cv2.circle(frame, (a, b), 5, color[i].tolist(), -1)
    img = cv2.add(frame, mask)

    cv2.imshow('frame', img)
    k = cv2.waitKey(30) & 0xff
    if k == 27:
        break

    # ここで「前の」フレームと特徴点を更新
    old_gray = frame_gray.copy()
    p0 = good_new.reshape(-1, 1, 2)

cv2.destroyAllWindows()
cap.release()


exit()


####
# p.227
####


def dist0(aX1, aY1, aX2, aY2):
    return abs(aX1-aX2)+abs(aY1-aY2)


def draw_flow(aIm, aFlow, aStep=16):

    h, w = aIm.shape[:2]

    vis = cv2.cvtColor(aIm, cv2.COLOR_GRAY2BGR)

    for oi in [h/aStep*ii+h/aStep/2 for ii in range(aStep)]:
        for oj in [w/aStep*jj+w/aStep/2 for jj in range(aStep)]:
            i = np.int32(oi)
            j = np.int32(oj)
            newI = i+np.int32(aFlow[i][j][1])
            newJ = j+np.int32(aFlow[i][j][0])
            if dist0(i, j, newI, newJ) > 10:
                cv2.line(vis, (j, i), (newJ, newI), (0, 255, 0), 1)
                cv2.circle(vis, (newJ, newI), 3, (0, 255, 0), -1)

    return vis


cap = cv2.VideoCapture(0)

ret, im = cap.read()
prev_gray = cv2.cvtColor(im, cv2.COLOR_BGR2GRAY)

while True:
    ret, im = cap.read()
    gray = cv2.cvtColor(im, cv2.COLOR_BGR2GRAY)

    flow = cv2.calcOpticalFlowFarneback(
        prev_gray, gray, None, 0.5, 3, 15, 3, 5, 1.2, 0)
    prev_gray = gray

    cv2.imshow('Optical flow', draw_flow(gray, flow))

    key = cv2.waitKey(10)
    if key == 27:
        break


exit()


####
# p.224
####


cap = cv2.VideoCapture(0)

while True:
    ret, im = cap.read()
    print(type(im))
    print(im.shape)
    cv2.imshow('video test', im)

    key = cv2.waitKey(10)
    if key == 27:
        break
    if key == ' ':
        break
exit()

####
# p.223
####


im = cv2.imread('testimage.png')
im_lowres = cv2.pyrDown(im)
gray = cv2.cvtColor(im_lowres, cv2.COLOR_BGR2GRAY)


s = cv2.xfeatures2d.SIFT_create()
# mask = uint8(ones(gray.shape))
# mask = np.ndarray(gray.shape, dtype=np.uint8)
mask = np.ones(gray.shape, dtype=np.uint8)
# mask[:] = 1


keypoints = s.detect(gray, mask)

print(keypoints[0])

vis = cv2.cvtColor(gray, cv2.COLOR_GRAY2BGR)

for k in keypoints[::10]:
    cv2.circle(vis, (int(k.pt[0]), int(k.pt[1])), 2, (0, 255, 0), -1)
    cv2.circle(vis, (int(k.pt[0]), int(k.pt[1])), int(k.size), (0, 255, 0), 2)

cv2.imshow('local descriptors', vis)
cv2.waitKey()
