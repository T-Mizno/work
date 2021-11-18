
function newAgent(i) {
    let STOP_CONTENTS = [[7, 9, 8, 8, 0, 1, 9, 9, 8, 9, 8, 1, 6], [0, 1, 1, 1, 1, 7, 0, 0, 8, 0, 8, 1, 6], [7, 9, 8, 0, 1, 1, 3, 9, 6], [7, 7, 8, 8, 8, 8, 8, 8, 8, 1, 1, 1, 3, 3, 3, 6, 4, 6], [7, 7, 1, 1, 1, 1, 1, 1, 1, 8, 1, 6], [1, 8, 8, 7, 0, 2, 6], [7, 1, 8, 7, 7, 7, 7, 7, 7, 1, 3, 1, 9, 6], [8, 0, 9, 0, 8, 3, 1, 0, 8, 6], [7, 7, 7, 1, 9, 8, 1, 1, 7, 3, 6], [7, 7, 0, 8, 8, 1, 6], [7, 7, 1, 0, 0, 1, 8, 0, 1, 6], [8, 8, 0, 0, 0, 7, 7, 9, 8, 1, 1, 6], [8, 8, 0, 8, 8, 7, 7, 3, 6], [8, 9, 7, 7, 7, 9, 9, 8, 9, 1, 8, 3, 4, 6], [7, 7, 7, 8, 9, 0, 0, 8, 9, 9, 9, 1, 1, 1, 1, 1, 6, 4, 6], [1, 8, 8, 7, 1, 1, 3, 1, 1, 3, 1, 1, 8, 9, 9, 8, 0, 0, 1, 0, 8, 9, 7, 9, 1, 1, 3, 6], [1, 1, 0, 7, 7, 7, 9, 1, 9, 9, 0, 9, 9, 9, 2, 6], [1, 9, 8, 8, 7, 1, 6], [7, 0, 8, 1, 1, 8, 8, 3, 4, 6], [7, 7, 7, 0, 0, 9, 6, 4, 6], [7, 7, 0, 1, 8, 1, 6], [7, 7, 7, 7, 7, 0, 8, 9, 1, 9, 3, 8, 3, 6], [7, 7, 7, 8, 7, 0, 0, 0, 7, 7, 7, 1, 7, 8, 9, 0, 0, 8, 1, 2, 6], [8, 1, 1, 1, 1, 1, 1, 1, 1, 9, 7, 7, 1, 4, 6], [7, 9, 8, 0, 0, 7, 8, 9, 9, 9, 0, 1, 0, 3, 6], [7, 7, 7, 0, 8, 0, 9, 1, 7, 6], [0, 0, 7, 9, 0, 7, 7, 8, 3, 6], [7, 7, 7, 7, 8, 0, 0, 0, 9, 8, 8, 8, 8, 9, 8, 1, 1, 1, 3, 1, 9, 6], [1, 8, 1, 1, 3, 6], [7, 8, 1, 1, 8, 1, 1, 3, 6], [7, 7, 7, 7, 1, 0, 1, 9, 9, 9, 9, 1, 6], [7, 7, 1, 1, 0, 0, 0, 8, 1, 1, 1, 6], [7, 7, 8, 7, 7, 7, 0, 0, 8, 1, 1, 1, 2, 6], [8, 0, 0, 1, 7, 0, 0, 1, 1, 3, 1, 3, 8, 9, 6], [7, 8, 7, 1, 1, 8, 8, 1, 0, 1, 3, 4, 6], [7, 7, 0, 0, 1, 7, 2, 6], [7, 3, 8, 1, 1, 3, 6], [7, 7, 8, 8, 0, 1, 8, 6], [7, 7, 7, 9, 9, 8, 8, 1, 8, 4, 6], [7, 0, 1, 1, 1, 1, 4, 6], [8, 1, 1, 6], [7, 7, 1, 1, 6], [1, 1, 1, 3, 6], [1, 8, 8, 1, 0, 0, 7, 8, 7, 6], [7, 7, 1, 1, 8, 6], [7, 3, 3, 6], [7, 0, 1, 3, 6], [7, 8, 8, 6], [7, 8, 1, 1, 8, 9, 1, 8, 3, 2, 6], [7, 7, 0, 0, 0, 9, 9, 6], [8, 8, 8, 3, 6], [3, 6], [7, 7, 8, 0, 8, 8, 9, 8, 1, 3, 6], [1, 1, 4, 6], [7, 7, 7, 7, 8, 8, 1, 9, 6], [4, 8, 1, 0, 1, 7, 8, 1, 1, 4, 6], [7, 7, 0, 1, 8, 1, 6], [7, 7, 0, 8, 3, 6], [1, 0, 8, 1, 6], [3, 1, 1, 3, 6], [7, 9, 0, 1, 3, 6], [7, 7, 9, 1, 0, 3, 6], [7, 7, 7, 1, 1, 1, 6], [8, 1, 2, 6], [8, 7, 0, 8, 9, 3, 4, 6], [7, 7, 7, 7, 7, 0, 9, 9, 3, 6], [7, 7, 0, 9, 0, 8, 9, 8, 3, 6], [1, 8, 9, 9, 9, 0, 1, 6, 4, 6], [7, 7, 0, 1, 1, 0, 8, 2, 6], [7, 7, 7, 7, 8, 0, 1, 8, 3, 6], [8, 1, 1, 1, 1, 6], [7, 1, 1, 9, 1, 2, 6], [7, 8, 1, 6], [8, 9, 6], [0, 1, 1, 6], [1, 1, 9, 8, 9, 1, 1, 3, 6], [8, 8, 1, 8, 9, 9, 8, 9, 2, 6], [7, 7, 8, 1, 0, 1, 1, 3, 6], [7, 7, 1, 9, 8, 1, 6], [7, 1, 0, 0, 8, 2, 6], [6], [1, 4, 1, 3, 6], [7, 1, 7, 7, 8, 6], [7, 7, 8, 8, 8, 1, 1, 1, 6], [0, 1, 3, 3, 6], [7, 7, 0, 1, 8, 1, 3, 6], [7, 7, 7, 0, 0, 0, 6], [1, 1, 1, 3, 6], [8, 1, 1, 6], [0, 8, 8, 8, 8, 1, 1, 6, 4, 6], [9, 6], [7, 7, 9, 7, 8, 8, 1, 1, 1, 8, 9, 9, 9, 8, 2, 6], [7, 0, 9, 9, 1, 1, 1, 6], [1, 8, 3, 6], [9, 1, 1, 3, 6], [8, 2, 6], [9, 0, 0, 9, 9, 9, 3, 6], [1, 8, 1, 1, 4, 6], [8, 8, 8, 3, 6], [8, 1, 9, 9, 9, 9, 8, 1, 6], [7, 0, 1, 8, 6], [7, 8, 8, 0, 1, 3, 6], [7, 7, 0, 6], [7, 1, 0, 8, 9, 4, 6], [7, 1, 1, 1, 1, 9, 8, 1, 3, 6], [8, 8, 7, 6], [7, 7, 8, 1, 1, 1, 1, 9, 8, 8, 2, 6], [7, 7, 8, 1, 3, 6], [7, 7, 7, 9, 7, 8, 0, 1, 1, 8, 8, 1, 1, 6], [9, 0, 0, 0, 0, 8, 6], [7, 7, 0, 1, 8, 1, 6], [7, 8, 3, 1, 0, 3, 6], [7, 8, 8, 8, 8, 1, 6], [8, 0, 1, 3, 6], [9, 8, 6], [7, 0, 1, 1, 8, 9, 1, 3, 6], [8, 7, 0, 9, 9, 1, 6], [7, 1, 6, 8, 1, 4, 6], [8, 6], [7, 7, 7, 0, 1, 1, 1, 6], [0, 9, 0, 0, 1, 1, 9, 1, 3, 6], [7, 7, 1, 1, 8, 9, 8, 8, 1, 6], [7, 0, 1, 9, 9, 8, 1, 6], [7, 7, 8, 1, 8, 0, 1, 7, 9, 3, 6], [7, 1, 3, 2, 6], [7, 7, 7, 7, 9, 8, 2, 6], [1, 1, 8, 9, 8, 0, 0, 0, 8, 7, 7, 1, 1, 2, 6], [7, 8, 0, 8, 8, 8, 4, 1, 1, 1, 7, 7, 8, 2, 6], [7, 8, 0, 0, 8, 0, 9, 9, 1, 8, 1, 1, 0, 1, 1, 1, 6], [1, 9, 0, 1, 8, 8, 3, 2, 6], [7, 8, 8, 0, 1, 1, 0, 8, 1, 1, 6], [8, 8, 8, 1, 1, 1, 1, 6], [7, 0, 1, 8, 1, 3, 3, 6], [8, 3, 4, 6], [8, 1, 1, 3, 6], [7, 8, 0, 1, 8, 1, 3, 3, 6], [7, 0, 0, 0, 8, 9, 8, 8, 8, 6], [8, 2, 6], [7, 8, 0, 1, 2, 6], [7, 1, 1, 1, 3, 6], [8, 9, 9, 9, 1, 1, 1, 3, 3, 7, 1, 1, 6], [9, 7, 7, 0, 0, 0, 8, 1, 3, 2, 6], [7, 7, 8, 0, 1, 1, 1, 1, 0, 1, 6], [7, 7, 7, 8, 0, 1, 0, 8, 1, 3, 3, 6], [7, 0, 9, 1, 7, 1, 3, 6], [8, 1, 1, 1, 1, 9, 9, 9, 9, 8, 9, 8, 3, 6], [1, 8, 0, 1, 7, 7, 8, 7, 7, 9, 2, 6], [9, 3, 9, 8, 6, 4, 6], [8, 9, 1, 2, 6], [0, 1, 8, 1, 6], [7, 7, 0, 0, 0, 6], [7, 7, 0, 8, 8, 1, 8, 8, 6], [7, 9, 0, 0, 1, 1, 7, 7, 1, 6], [7, 7, 0, 1, 8, 9, 8, 6], [7, 1, 8, 6], [8, 7, 7, 7, 1, 4, 6], [7, 7, 7, 7, 1, 8, 1, 1, 1, 8, 1, 6], [7, 7, 7, 7, 7, 7, 8, 8, 1, 1, 8, 8, 8, 1, 3, 6], [7, 7, 7, 0, 0, 8, 0, 8, 1, 7, 1, 2, 6], [0, 0, 1, 8, 9, 8, 1, 1, 3, 6], [1, 0, 0, 7, 7, 8, 2, 6], [8, 1, 8, 1, 6], [7, 9, 1, 1, 7, 3, 2, 6], [7, 0, 1, 9, 8, 1, 4, 1, 6], [7, 0, 0, 3, 9, 9, 1, 1, 1, 1, 3, 1, 3, 6], [7, 7, 7, 7, 6, 4, 6], [7, 1, 1, 1, 8, 2, 6], [7, 7, 0, 8, 1, 7, 8, 1, 1, 6], [7, 0, 0, 8, 1, 7, 3, 6], [7, 1, 3, 6], [8, 0, 8, 9, 6], [4, 1, 9, 1, 0, 1, 4, 6], [1, 8, 9, 0, 1, 7, 1, 7, 2, 6], [8, 8, 0, 3, 6], [9, 1, 9, 3, 2, 6], [7, 7, 7, 8, 8, 8, 0, 8, 0, 9, 8, 3, 6], [7, 1, 8, 8, 1, 1, 9, 9, 8, 8, 2, 6], [8, 7, 1, 1, 6], [8, 0, 9, 1, 1, 1, 6], [8, 8, 4, 2, 6]];
    let START_POINTS = [{ "x": 841.0094536950421, "y": 596.0886730205278 }, { "x": 830.514561272217, "y": 592.2861070381232 }, { "x": 839.6975921421889, "y": 580.2446480938416 }, { "x": 839.6975921421889, "y": 599.8912390029326 }, { "x": 841.6653844714687, "y": 575.174560117302 }, { "x": 839.0416613657625, "y": 589.1173020527859 }, { "x": 841.0094536950421, "y": 594.1873900293256 }, { "x": 826.5789766136577, "y": 582.7796920821114 }, { "x": 818.7078072965388, "y": 585.3147360703813 }, { "x": 837.7297998129094, "y": 595.4549120234605 }, { "x": 841.6653844714687, "y": 596.7224340175953 }, { "x": 169.33633863423762, "y": 651.8596407624634 }, { "x": 844.9450383536016, "y": 579.6108870967743 }, { "x": 171.96006173994388, "y": 635.3818548387097 }, { "x": 815.4281534144061, "y": 584.0472140762463 }, { "x": 179.17530028063612, "y": 644.254508797654 }, { "x": 157.5295846585594, "y": 646.7895527859238 }, { "x": 217.87521608980356, "y": 644.8882697947214 }, { "x": 839.6975921421889, "y": 589.1173020527859 }, { "x": 841.6653844714687, "y": 572.6395161290322 }, { "x": 823.2993227315247, "y": 594.821151026393 }, { "x": 834.4501459307764, "y": 591.6523460410557 }, { "x": 837.0738690364827, "y": 584.0472140762463 }, { "x": 217.219285313377, "y": 646.7895527859238 }, { "x": 839.0416613657625, "y": 594.1873900293256 }, { "x": 827.2349073900842, "y": 579.6108870967743 }, { "x": 211.97183910196446, "y": 640.4519428152493 }, { "x": 838.3857305893358, "y": 597.9899560117302 }, { "x": 185.7346080449018, "y": 644.254508797654 }, { "x": 836.4179382600561, "y": 579.6108870967743 }, { "x": 845.600969130028, "y": 579.6108870967743 }, { "x": 833.7942151543499, "y": 590.3848240469208 }, { "x": 831.8264228250703, "y": 590.3848240469208 }, { "x": 177.86343872778298, "y": 651.8596407624634 }, { "x": 818.0518765201123, "y": 573.9070381231671 }, { "x": 836.4179382600561, "y": 575.8083211143695 }, { "x": 824.6111842843779, "y": 594.821151026393 }, { "x": 835.7620074836296, "y": 584.0472140762463 }, { "x": 842.3213152478952, "y": 588.4835410557185 }, { "x": 838.3857305893358, "y": 578.3433651026393 }, { "x": 837.0738690364827, "y": 589.7510630498533 }, { "x": 817.3959457436857, "y": 608.7638929618769 }, { "x": 834.4501459307764, "y": 589.1173020527859 }, { "x": 173.27192329279703, "y": 648.0570747800587 }, { "x": 835.106076707203, "y": 592.2861070381232 }, { "x": 829.2026997193639, "y": 601.7925219941349 }, { "x": 835.7620074836296, "y": 577.7096041055718 }, { "x": 842.3213152478952, "y": 589.1173020527859 }, { "x": 828.5467689429374, "y": 575.174560117302 }, { "x": 834.4501459307764, "y": 578.9771260997068 }, { "x": 210.00404677268477, "y": 647.4233137829912 }, { "x": 193.6057773620206, "y": 655.0284457478006 }, { "x": 839.6975921421889, "y": 591.0185850439883 }, { "x": 818.0518765201123, "y": 595.4549120234605 }, { "x": 835.7620074836296, "y": 584.0472140762463 }, { "x": 173.92785406922357, "y": 660.0985337243402 }, { "x": 837.0738690364827, "y": 578.3433651026393 }, { "x": 850.1924845650141, "y": 572.6395161290322 }, { "x": 831.1704920486436, "y": 591.6523460410557 }, { "x": 829.8586304957905, "y": 577.7096041055718 }, { "x": 814.7722226379794, "y": 571.3719941348974 }, { "x": 837.0738690364827, "y": 582.145931085044 }, { "x": 837.7297998129094, "y": 598.6237170087976 }, { "x": 845.600969130028, "y": 572.6395161290322 }, { "x": 843.6331768007484, "y": 593.5536290322581 }, { "x": 839.6975921421889, "y": 587.849780058651 }, { "x": 827.2349073900842, "y": 589.7510630498533 }, { "x": 165.4007539756782, "y": 637.9168988269795 }, { "x": 834.4501459307764, "y": 585.9484970674487 }, { "x": 834.4501459307764, "y": 591.0185850439883 }, { "x": 168.02447708138448, "y": 653.7609237536657 }, { "x": 851.5043461178672, "y": 576.442082111437 }, { "x": 835.106076707203, "y": 604.9613269794721 }, { "x": 830.514561272217, "y": 578.9771260997068 }, { "x": 848.8806230121609, "y": 578.3433651026393 }, { "x": 843.6331768007484, "y": 557.4292521994134 }, { "x": 830.514561272217, "y": 582.145931085044 }, { "x": 834.4501459307764, "y": 589.1173020527859 }, { "x": 837.0738690364827, "y": 594.1873900293256 }, { "x": 827.2349073900842, "y": 599.2574780058651 }, { "x": 179.8312310570627, "y": 639.8181818181819 }, { "x": 836.4179382600561, "y": 579.6108870967743 }, { "x": 835.106076707203, "y": 588.4835410557185 }, { "x": 841.6653844714687, "y": 584.6809750733138 }, { "x": 841.0094536950421, "y": 587.2160190615836 }, { "x": 810.1807072029934, "y": 585.3147360703813 }, { "x": 806.2451225444341, "y": 586.582258064516 }, { "x": 844.289107577175, "y": 566.3019061583577 }, { "x": 183.7668157156221, "y": 642.3532258064516 }, { "x": 835.106076707203, "y": 586.582258064516 }, { "x": 840.3535229186156, "y": 597.9899560117302 }, { "x": 810.1807072029934, "y": 565.034384164223 }, { "x": 841.6653844714687, "y": 603.6938049853372 }, { "x": 833.1382843779234, "y": 587.849780058651 }, { "x": 836.4179382600561, "y": 601.1587609970675 }, { "x": 178.51936950420955, "y": 643.6207478005865 }, { "x": 839.0416613657625, "y": 603.0600439882699 }, { "x": 841.6653844714687, "y": 588.4835410557185 }, { "x": 841.0094536950421, "y": 597.9899560117302 }, { "x": 841.6653844714687, "y": 573.2732771260997 }, { "x": 848.2246922357344, "y": 577.7096041055718 }, { "x": 840.3535229186156, "y": 588.4835410557185 }, { "x": 843.6331768007484, "y": 564.4006231671555 }, { "x": 825.9230458372311, "y": 582.7796920821114 }, { "x": 843.6331768007484, "y": 594.1873900293256 }, { "x": 836.4179382600561, "y": 594.1873900293256 }, { "x": 837.7297998129094, "y": 590.3848240469208 }, { "x": 842.3213152478952, "y": 592.2861070381232 }, { "x": 821.9874611786717, "y": 578.9771260997068 }, { "x": 825.9230458372311, "y": 583.4134530791789 }, { "x": 826.5789766136577, "y": 531.4450513196481 }, { "x": 841.0094536950421, "y": 587.849780058651 }, { "x": 834.4501459307764, "y": 580.2446480938416 }, { "x": 833.7942151543499, "y": 587.2160190615836 }, { "x": 821.3315304022451, "y": 596.7224340175953 }, { "x": 831.8264228250703, "y": 589.7510630498533 }, { "x": 840.3535229186156, "y": 594.1873900293256 }, { "x": 835.106076707203, "y": 597.9899560117302 }, { "x": 820.6755996258186, "y": 589.7510630498533 }, { "x": 821.3315304022451, "y": 585.3147360703813 }, { "x": 837.7297998129094, "y": 595.4549120234605 }, { "x": 832.4823536014967, "y": 596.7224340175953 }, { "x": 833.7942151543499, "y": 587.849780058651 }, { "x": 828.5467689429374, "y": 611.9326979472141 }, { "x": 842.9772460243219, "y": 572.6395161290322 }, { "x": 842.3213152478952, "y": 587.849780058651 }, { "x": 171.3041309635173, "y": 656.9297287390029 }, { "x": 831.1704920486436, "y": 592.2861070381232 }, { "x": 831.8264228250703, "y": 601.1587609970675 }, { "x": 168.02447708138448, "y": 643.6207478005865 }, { "x": 824.6111842843779, "y": 613.8339809384164 }, { "x": 171.96006173994388, "y": 640.4519428152493 }, { "x": 831.1704920486436, "y": 589.1173020527859 }, { "x": 199.5091543498597, "y": 649.958357771261 }, { "x": 843.6331768007484, "y": 564.4006231671555 }, { "x": 841.0094536950421, "y": 587.849780058651 }, { "x": 817.3959457436857, "y": 549.1903592375367 }, { "x": 833.7942151543499, "y": 590.3848240469208 }, { "x": 189.01426192703462, "y": 656.9297287390029 }, { "x": 841.6653844714687, "y": 578.3433651026393 }, { "x": 173.92785406922357, "y": 658.1972507331378 }, { "x": 848.2246922357344, "y": 578.3433651026393 }, { "x": 831.1704920486436, "y": 587.849780058651 }, { "x": 821.9874611786717, "y": 591.0185850439883 }, { "x": 835.106076707203, "y": 594.821151026393 }, { "x": 836.4179382600561, "y": 589.1173020527859 }, { "x": 179.8312310570627, "y": 656.9297287390029 }, { "x": 842.9772460243219, "y": 578.9771260997068 }, { "x": 842.3213152478952, "y": 573.2732771260997 }, { "x": 839.6975921421889, "y": 592.9198680351906 }, { "x": 841.6653844714687, "y": 587.849780058651 }, { "x": 825.2671150608045, "y": 585.9484970674487 }, { "x": 834.4501459307764, "y": 589.1173020527859 }, { "x": 835.7620074836296, "y": 589.7510630498533 }, { "x": 816.7400149672592, "y": 591.0185850439883 }, { "x": 175.23971562207674, "y": 659.4647727272727 }, { "x": 837.0738690364827, "y": 578.9771260997068 }, { "x": 841.6653844714687, "y": 587.2160190615836 }, { "x": 848.2246922357344, "y": 580.2446480938416 }, { "x": 838.3857305893358, "y": 596.0886730205278 }, { "x": 186.39053882132836, "y": 652.4934017595308 }, { "x": 218.53114686623013, "y": 653.7609237536657 }, { "x": 830.514561272217, "y": 585.9484970674487 }, { "x": 831.8264228250703, "y": 596.0886730205278 }, { "x": 831.8264228250703, "y": 587.2160190615836 }, { "x": 843.6331768007484, "y": 578.3433651026393 }, { "x": 831.1704920486436, "y": 582.7796920821114 }, { "x": 838.3857305893358, "y": 576.442082111437 }, { "x": 840.3535229186156, "y": 587.849780058651 }, { "x": 237.5531393826006, "y": 645.5220307917889 }, { "x": 840.3535229186156, "y": 598.6237170087976 }, { "x": 165.4007539756782, "y": 642.9869868035191 }, { "x": 169.33633863423762, "y": 652.4934017595308 }, { "x": 839.6975921421889, "y": 592.9198680351906 }, { "x": 835.7620074836296, "y": 533.3463343108505 }, { "x": 843.6331768007484, "y": 589.1173020527859 }, { "x": 841.6653844714687, "y": 578.9771260997068 }, { "x": 842.3213152478952, "y": 588.4835410557185 }, { "x": 840.3535229186156, "y": 591.6523460410557 }, { "x": 833.1382843779234, "y": 596.0886730205278 }];

    let a = {
        id: i,
        todo: STOP_CONTENTS[i % STOP_CONTENTS.length].slice(),
        currentGoalBox: null,
        open: [],
        close: [],
        path: [],
        pathCount: 0,
        start: START_POINTS[i % START_POINTS.length],
        seekDepth: 3000,
        dt: 10.0,
        dist: 0,
        reached: false
    };

    a.path.unshift({ x: a.start.x, y: a.start.y });


    a.open = [{ x: a.path[0].x, y: a.path[0].y, dist: 0, froms: [] }];
    a.close = [];


    return a;
}

function newAgents(n) {
    let as = [];
    for (let i = 0; i < n; i++) {
        let a = newAgent(i);
        as.push(a);
    }
    return as;
}

function distXY(x0, y0, x1, y1) {
    return Math.sqrt(Math.pow(x0 - x1, 2) + Math.pow(y0 - y1, 2));
}

function distP(p, q) {
    return distXY(p.x, p.y, q.x, q.y);
}

function areNear(p, q) {
    return distP(p, q) < 5.0;
}

function areNearBox(b, p) {
    return distXY(b.x, b.y, p.x, p.y) < Math.max(b.w / 2, b.h / 2) + 5.0;
}

function existSamePoint(aP, aPs) {
    for (let q of aPs) {
        if (areNear(aP, q)) return true;
    }
    return false;
    //aPs.some(p => { return false; });
}

function pathCopy(ps) {
    let newPs = [];
    for (let i = 0; i < ps.length; i++) { newPs.push({ x: ps[i].x, y: ps[i].y }); }
    return newPs;
}

function heuristicCost(p) {
    let d = 0;
    for (let i = 0; i < p.froms.length - 1; i++) {
        d = distP(p.froms[i], p.froms[i + 1]);
    }
    return p;
}

function searchNearGoalBox(p, content, boxes) {
    let minD = 10000000000;
    //let minD = 0; // for farest
    let box = boxes[0];
    let flgFound = false;
    boxes.forEach(b => {
        if (b.content == content) {
            let newDist = distXY(p.x, p.y, b.x, b.y);
            if (newDist < minD) {
                //if (newDist > minD) { // for farest
                minD = newDist;
                box = b;
                flgFound = true;
            }
        }
    });
    if (!flgFound) console.log("#####################", content);
    return box;
}

function agentGrowBranch(a, boxes) {
    if (a.open.length > 200) {
        console.log("path is full");
        return;
    }

    let p = a.open.shift();
    a.close.unshift(p);

    let froms = pathCopy(p.froms);
    froms.unshift({ x: p.x, y: p.y, dist: p.dist });

    let cand = [];
    for (let rad = 0; rad <= 6.29; rad = rad + 3.141592 / 4.0) {
        let x = a.dt * Math.cos(rad) + p.x;
        let y = a.dt * Math.sin(rad) + p.y;
        let newP = { x: x, y: y, froms: froms, dist: 0 };
        if (!existSamePoint(newP, a.open)
            && !existSamePoint(newP, a.close)
            && !onBoxes(newP, boxes)) {
            newP.dist = p.dist + distP(a.currentGoalBox, newP);
            cand.push(newP);

        }
    }

    cand.forEach(c => {
        a.open.unshift(c); // 深さ優先探索
        //a.open.push(c); // 幅優先探索
    });

    // A* search
    if (a.open.length > 1) {
        let minI = 0;
        let minDist = 1000000;
        for (let i = 0; i < a.open.length; i++) {
            if (a.open[i].dist < minDist) {
                minI = i;
                minDist = a.open[i].dist;
            }
        }
        let minP = a.open.splice(minI, 1);
        a.open.unshift(minP[0]);
    }
}

function agentNextGo(a, boxes) {

    if (a.reached) return;

    a.open = [{ x: a.path[0].x, y: a.path[0].y, dist: 0, froms: [] }];
    a.close = [];

    if (a.todo.length < 1) {
        a.close = [];
        a.open = [];
        a.reached = true;
        console.log("DONE");
        return; // finished
    }

    if (a.currentGoalBox === null) {
        //if (true) {
        let g = a.todo[0];
        a.currentGoalBox = searchNearGoalBox(a.path[0], g, boxes);
        //a.seekDepth = 100;
    }

    for (let i = 0; i < a.seekDepth; i++) {
        if (a.open.length > 0) {

            if (areNearBox(a.currentGoalBox, a.open[0])) {
                console.log("Get Content", i, contentNames[a.currentGoalBox.content], a.currentGoalBox);
                a.todo.shift();
                break;
            }
            agentGrowBranch(a, boxes);
        }
    }

    for (let i = a.open[0].froms.length - 1; i >= 0; i--) {
        a.path.unshift({ x: a.open[0].froms[i].x, y: a.open[0].froms[i].y });
    }

    a.path.unshift({ x: a.open[0].x, y: a.open[0].y });

    if (areNearBox(a.currentGoalBox, a.path[0]) && a.todo.length > 0) {
        let g = a.todo[0];//.shift();
        a.currentGoalBox = searchNearGoalBox(a.path[0], g, boxes);
        console.log(a.currentGoalBox);
    }
}



