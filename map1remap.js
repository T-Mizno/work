function putBox(x0, y0, x1, y1, cont) {
    let centerX = (x1 + x0) / 2;
    let centerY = (y1 + y0) / 2;
    let w = Math.max(x1, x0) - Math.min(x1, x0);
    let h = Math.max(y1, y0) - Math.min(y1, y0);
    boxes.push({ x: centerX, y: centerY, w: w, h: h, tag: "" + cont, content: cont });
    return { xl: x0, yu: y0, xr: x1, yd: y1, w: w, h: h };
}

// 左上を揃えて置く
function putBoxLU(xl, yu, w, h, cont) {
    return putBox(xl, yu, xl + w, yu + h, cont);
}

// x 方向に divx 個、y方向に divy個に等幅に分割して配置する
function putBoxDiv(x0, y0, x1, y1, cont, divx, divy) {
    let w = (Math.max(x0, x1) - Math.min(x0, x1)) / divx;
    let h = (Math.max(y0, y1) - Math.min(y0, y1)) / divy;

    //let blu = putBoxLU(x0, y0, w, h, cont); // 左上のbox
    for (let i = 0; i < divx; i++) {
        for (let j = 0; j < divy; j++) {
            putBoxLU(x0 + w * i, y0 + h * j, w, h, cont);
        }
    }
}

function remap1() {
    /*
    x,y
    w,h
    tag: content(i,j)
    content:
        0: "肉・魚",
        1: "ドリンク・菓子・調味料",
        2: "レジ・その他",
        3: "消耗品・雑貨",
        4: "レジ・その他",
        5: "レジ・その他",
        6: "レジ・その他",
        7: "野菜・果物",
        8: "加工肉・冷凍",
        9: "飯・惣菜",
        10: "壁・柱",
        11: "上に何もない床"
    */

    for (let i = boxes.length - 1; i >= 0; i--) {
        if (boxes[i].content != contentCannotMove()) {
            boxes.splice(i, 1);
        }
    }

    for (let i = boxes.length - 1; i >= 0; i--) {
        if (215 < boxes[i].x && boxes[i].x < 820 && 250 < boxes[i].y && boxes[i].y < 566) {
            boxes.splice(i, 1);
        }
    }


    for (let i = boxes.length - 1; i >= 0; i--) {
        if (225 < boxes[i].x && boxes[i].x < 728 && 600 < boxes[i].y && boxes[i].y < 631) {
            boxes.splice(i, 1);
        }
    }

    let s;

    //柱
    s = putBox(240, 265, 253, 278, 10);
    for (let i = 0; i < 4; i++)s = putBoxLU(s.xl + 126.5, s.yu, s.w, s.h, 10);
    s = putBoxLU(240, 389, s.w, s.h, 10);
    for (let i = 0; i < 4; i++)s = putBoxLU(s.xl + 126.5, s.yu, s.w, s.h, 10);
    s = putBoxLU(240, 510, s.w, s.h, 10);
    for (let i = 0; i < 3; i++)s = putBoxLU(s.xl + 126.5, s.yu, s.w, s.h, 10);
    s = putBoxLU(551, 510, s.w, s.h, 10);
    s = putBoxLU(739, 510, s.w, s.h, 10);
    s = putBoxLU(240, 612, s.w, s.h, 10);
    for (let i = 0; i < 3; i++)s = putBoxLU(s.xl + 126.5, s.yu, s.w, s.h, 10);
    s = putBoxLU(705, 612, s.w, s.h, 10);

    putBox(154, 158, 187, 172, 9);
    putBox(187, 158, 203, 172, 9);
    s = putBox(140, 172, 152, 199, 9);
    s = putBoxLU(s.xl, s.yd, s.w, s.h, 9);
    s = putBoxLU(s.xl, s.yd, s.w, s.h, 9);
    s = putBoxLU(s.xl, s.yd, s.w, s.h, 9);
    s = putBoxLU(140, 326, s.w, s.h - 2, 9);
    s = putBoxLU(s.xl, s.yd, s.w, s.h, 9);
    s = putBoxLU(s.xl, s.yd, s.w, s.h, 9);
    putBox(139, 309, 152, 325, 9);
    putBox(153, 309, 147, 292, 9);

    putBox(141, 419, 151, 460, 4);
    putBox(140, 470, 153, 522, 4);

    putBox(203, 158, 212, 171, 7);

    s = putBox(243, 158, 276, 171, 8);
    s = putBoxLU(s.xr, s.yu, s.w, s.h, 8);
    s = putBox(s.xr, s.yu, 327, s.yd, 8);

    s = putBox(s.xr, s.yu, 344, s.yd, 0);
    s = putBox(s.xr, s.yu, 395, s.yd, 0);
    for (let i = 0; i < 3; i++) s = putBoxLU(s.xr, s.yu, s.w, s.h, 0);

    s = putBox(581, 158, 607, 171, 0);
    s = putBox(s.xr, s.yu, 641, 171, 0);
    s = putBoxLU(s.xr, s.yu, s.w, s.h, 0);

    putBoxDiv(675, 158, 778, 171, 0, 2, 1);
    putBoxDiv(778, 158, 828, 171, 0, 2, 1);
    putBox(828, 158, 845, 171, 0);

    putBox(853, 181, 869, 206, 8);
    putBoxDiv(853, 206, 869, 273, 8, 1, 2);
    putBox(853, 273, 869, 321, 8);
    putBoxDiv(853, 321, 869, 372, 8, 1, 2);

    putBoxDiv(853, 372, 869, 503, 7, 1, 2);
    putBox(853, 503, 869, 528, 7);

    putBox(852, 533, 864, 551, 7);

    putBox(190, 204, 210, 215, 9);
    putBox(185, 215, 210, 228, 9);
    putBox(210, 204, 234, 224, 9);
    putBoxDiv(256, 205, 305, 224, 9, 2, 1);

    putBoxDiv(326, 206, 376, 221, 8, 2, 1);
    putBoxDiv(402, 207, 452, 221, 8, 2, 1);

    putBox(452, 207, 477, 221, 1);

    putBoxDiv(502, 206, 568, 220, 0, 2, 1);
    putBoxDiv(502, 220, 568, 227, 1, 2, 1);
    putBox(568, 206, 592, 220, 0);
    putBox(568, 220, 592, 227, 1);

    putBox(614, 207, 647, 221, 0);
    putBox(614, 221, 647, 227, 1);

    putBox(647, 207, 674, 221, 0);
    putBox(647, 221, 674, 227, 1);

    putBox(674, 207, 706, 221, 0);
    putBox(674, 221, 706, 227, 1);

    putBoxDiv(731, 207, 796, 221, 0, 2, 1);
    putBoxDiv(731, 221, 796, 227, 1, 2, 1);

    putBox(796, 202, 812, 227, 0);

    putBox(193, 259, 206, 290, 8);
    putBox(206, 259, 231, 270, 8);
    putBox(231, 259, 239, 270, 8);
    putBox(239, 259, 256, 265, 1);
    putBox(206, 279, 239, 290, 8);
    putBox(239, 279, 256, 290, 8);
    putBox(257, 259, 269, 290, 8);

    s = putBox(193, 319, 206, 346, 8);
    s = putBoxLU(256, 319, s.w, s.h, 8);
    putBoxDiv(206, 319, 256, 331, 8, 2, 1);
    putBoxDiv(206, 334, 256, 346, 8, 2, 1);

    s = putBox(193, 375, 207, 407, 8);
    s = putBoxLU(255, 375, s.w, s.h, 8);
    putBoxDiv(207, 375, 255, 387, 8, 2, 1);
    putBox(207, 395, 230, 407, 8);
    putBox(230, 395, 239, 407, 8);
    putBox(239, 402, 255, 407, 1);

    putBox(302, 258, 334, 270, 1);
    putBoxDiv(321, 270, 334, 394, 1, 1, 5);

    putBoxDiv(302, 270, 316, 393, 8, 1, 4);
    putBox(302, 393, 334, 406, 8);

    putBox(367, 258, 386, 263, 1);
    putBoxDiv(367, 278, 378, 341, 1, 1, 2);
    putBoxDiv(367, 341, 374, 377, 1, 1, 3);
    putBox(367, 377, 374, 387, 1);

    putBox(380, 263, 386, 279, 1);
    putBoxDiv(380, 279, 386, 402, 1, 1, 10);

    putBox(367, 402, 386, 407, 1);

    putBox(414, 258, 426, 279, 1);
    putBoxDiv(414, 279, 426, 401, 1, 2, 10);
    putBox(414, 401, 426, 407, 1);

    putBoxDiv(453, 258, 465, 281, 1, 1, 2);
    putBox(453, 281, 465, 298, 1);
    putBox(453, 321, 465, 327, 1);
    putBoxDiv(453, 327, 465, 400, 1, 2, 6);
    putBox(453, 400, 465, 407, 1);

    putBox(493, 258, 506, 263, 1);
    putBoxDiv(493, 278, 506, 387, 1, 2, 9);
    putBox(493, 403, 506, 407, 1);

    putBoxDiv(534, 258, 546, 281, 1, 1, 2);
    putBox(534, 281, 546, 298, 1);
    putBox(534, 321, 546, 327, 1);
    putBoxDiv(534, 327, 546, 400, 1, 2, 6);
    putBox(534, 400, 546, 407, 1);


    putBox(578, 258, 590, 279, 1);
    putBoxDiv(578, 279, 590, 401, 1, 2, 10);
    putBox(578, 401, 590, 407, 1);

    putBox(619, 259, 632, 264, 1);
    putBoxDiv(619, 279, 632, 386, 1, 2, 9);
    putBox(619, 403, 632, 407, 1);

    putBox(655, 259, 666, 280, 1);
    putBoxDiv(655, 280, 666, 401, 1, 2, 10);
    putBox(655, 401, 666, 407, 1);

    putBox(689, 258, 709, 269, 9);
    putBoxDiv(697, 269, 709, 369, 9, 1, 2);
    putBox(697, 369, 709, 393, 9);
    putBox(689, 393, 709, 407, 9);
    putBoxDiv(689, 269, 695, 393, 1, 1, 10);

    putBox(745, 279, 763, 290, 1);
    putBoxDiv(764, 261, 787, 290, 8, 1, 2);
    putBox(787, 264, 803, 287, 8);

    putBox(740, 327, 753, 352, 7);
    putBoxDiv(753, 327, 799, 352, 7, 2, 2);
    putBox(799, 327, 812, 352, 7);

    putBox(758, 388, 767, 399, 7);
    putBox(767, 388, 778, 399, 7)
    putBox(778, 388, 799, 399, 7);
    putBox(745, 402, 753, 412, 7);
    putBoxDiv(753, 402, 799, 412, 7, 2, 1);
    putBox(799, 388, 812, 412, 7);

    putBox(193, 440, 199, 453, 1);
    putBoxDiv(199, 440, 262, 453, 1, 5, 2);
    putBox(262, 440, 268, 453, 1);

    putBox(193, 477, 199, 490, 1);
    putBoxDiv(199, 477, 262, 490, 1, 5, 2);
    putBox(262, 477, 268, 490, 1);

    putBoxDiv(187, 511, 199, 535, 1, 1, 2);

    putBoxDiv(227, 512, 239, 535, 1, 1, 2);
    putBox(239, 524, 253, 535, 1);
    putBoxDiv(254, 512, 266, 535, 1, 1, 2);

    putBox(302, 443, 334, 457, 8);
    putBoxDiv(302, 457, 316, 523, 8, 1, 2);
    putBoxDiv(321, 457, 334, 523, 1, 1, 2);
    putBox(302, 523, 334, 535, 1);

    putBox(363, 440, 385, 460, 1);
    putBoxDiv(363, 460, 375, 508, 1, 1, 2);
    putBoxDiv(377, 460, 385, 508, 1, 1, 4);
    putBox(379, 508, 385, 523, 1);
    putBox(363, 523, 385, 535, 1);

    putBox(413, 440, 428, 456, 1);
    putBoxDiv(413, 456, 428, 516, 1, 2, 5);
    putBox(413, 516, 428, 537, 1);

    putBox(456, 441, 469, 446, 1);
    putBoxDiv(456, 446, 469, 517, 1, 2, 6);
    putBox(456, 517, 469, 535, 1);

    putBox(492, 440, 505, 447, 3);
    putBoxDiv(492, 447, 498.5, 510, 1, 1, 6);
    putBoxDiv(498.5, 447, 505, 510, 3, 1, 6);
    putBox(492, 523, 505, 535, 3);

    putBox(524, 442, 536, 447, 3);
    putBoxDiv(524, 447, 536, 519, 3, 2, 6);
    putBox(524, 519, 536, 535, 3);

    putBox(553, 438, 569, 454, 3);

    putBox(586, 438, 597, 454, 3);

    putBoxDiv(551, 473, 565, 509, 3, 2, 3);
    putBox(551, 523, 565, 535, 3);

    putBox(586, 475, 597, 480, 3);
    putBox(586, 530, 597, 535, 3);
    putBoxDiv(586, 480, 597, 530, 3, 2, 4);

    putBox(619, 440, 632, 449, 3);
    putBoxDiv(619, 449, 632, 509, 3, 2, 5);
    putBox(619, 524, 632, 535, 3);

    putBox(654, 440, 666, 447, 3);
    putBox(654, 529, 666, 535, 3);
    putBoxDiv(654, 447, 666, 529, 3, 2, 7);

    putBox(688, 440, 710, 453, 7);
    putBox(688, 523, 710, 535, 7);
    putBoxDiv(698, 453, 710, 523, 7, 1, 2);
    putBox(688, 453, 695, 462, 3);
    putBoxDiv(688, 462, 695, 523, 3, 1, 5);

    putBox(740, 444, 753, 467, 7);
    putBoxDiv(753, 444, 773, 467, 7, 1, 2);
    putBoxDiv(773, 444, 799, 467, 7, 1, 2);
    putBox(799, 444, 811, 467, 7);

    putBox(740, 497, 753, 508, 7);
    putBox(753, 497, 778, 508, 7);
    putBox(778, 497, 799, 508, 7);
    putBox(753, 512, 778, 523, 7);
    putBox(778, 512, 799, 523, 7);
    putBox(799, 499, 811, 521, 7);
    putBox(738, 524, 753, 531, 7);

    putBoxDiv(234, 566, 258, 574, 4, 2, 1);
    putBoxDiv(234, 574, 241, 610, 4, 1, 3);

    putBox(273, 577, 281, 583, 2);
    putBox(273, 583, 281, 604, 2);

    putBox(325, 572, 340, 579, 1);

    putBox(363, 571, 374, 580, 1);
    putBox(374, 571, 387, 578, 1);

    putBox(426, 572, 439, 579, 3);

    putBox(476, 573, 489, 580, 3);
    putBox(489, 574, 502, 580, 3);

    putBox(319, 579, 325, 600, 6);
    putBox(319, 600, 325, 605, 3);
    putBox(319, 605, 327, 610, 4);
    putBox(319, 610, 325, 615, 3);
    putBox(319, 615, 327, 620, 4);

    putBox(348, 579, 354, 600, 6);
    putBox(348, 600, 354, 605, 3);
    putBox(348, 605, 356, 610, 4);
    putBox(348, 610, 354, 615, 3);
    putBox(348, 615, 356, 620, 4);

    putBox(390, 579, 396, 600, 6);
    putBox(390, 600, 396, 605, 3);
    putBox(388, 605, 396, 610, 4);
    putBox(390, 610, 396, 615, 3);
    putBox(388, 615, 396, 620, 4);

    putBox(419, 579, 425, 600, 6);
    putBox(419, 600, 425, 605, 3);
    putBox(419, 605, 427, 610, 4);
    putBox(419, 610, 425, 615, 3);
    putBox(419, 615, 427, 620, 4);

    putBox(442, 579, 448, 600, 6);
    putBox(442, 600, 448, 605, 3);
    putBox(440, 605, 448, 610, 4);
    putBox(442, 610, 448, 615, 3);
    putBox(440, 615, 448, 620, 4);

    putBox(470, 581, 478, 608, 2);
    putBox(501, 581, 509, 608, 2);
    putBox(478, 600, 485, 608, 2);
    putBox(494, 600, 501, 608, 2);

    putBox(507, 611, 513, 622, 3);
}