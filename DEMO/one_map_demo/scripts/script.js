window.onload = function () {
    var map = new SpryMap({
        id: "worldMap",
        height: 400,
        width: 800,
        startX: 200,
        startY: 200,
        cssClass: "mappy"
    });
}
var mousePos,
    clientPos = {},
    zoomPos = {};

function zoom(zoomNum) {
    var mapWidth = parseInt(document.getElementById('worldMap').style.width);
    var offset_Left = 0;
    var offset_Top = 0;
//    switch (zoomType) {
//    case "zoomIn":
//        document.getElementById('worldMap').style.left = '-' + (zoomPos.x / 2) * (mapWidth / 100) + "px";
//        document.getElementById('worldMap').style.top = '-' + (zoomPos.y / 2) * (mapWidth / 100) + "px";
//        mapWidth += 50;
//        //                    console.log;
//        break;
//    case "zoomOut":
//        if (mapWidth > 100) {
//            mapWidth -= 50;
//            document.getElementById('worldMap').style.left = "0px";
//            document.getElementById('worldMap').style.top = "0px";
//        } else if (mapWidth > 150) {
//            mapWidth -= 50;
//            document.getElementById('worldMap').style.left = '-' + (mousePos.x / 2) + "px";
//            document.getElementById('worldMap').style.top = '-' + (mousePos.y / 2) + "px";
//        }
//        break;
//    }
    if(zoomNum > 1){
        mapWidth = mapWidth+(zoomNum*2);
    }else{
        mapWidth = mapWidth-(zoomNum*2);
    }
    console.log(mapWidth);
    document.getElementById('worldMap').style.width = mapWidth + "%";
}

window.$ = function (selector) {
    return document.querySelectorAll(selector);
};
var isMobile = true;
var shouldCatch = false;
var ifFirstPointerDown = function (event, action) {
    if (isMobile) {
        if (event.touches.length == 1) {
            action(event);
        }
    } else {
        action(event);
    }
};

var ifLastPointerUp = function (event, action) {
    if (isMobile) {
        if (event.touches.length == 0) {
            action(event);
        }
    } else {
        action(event);
    }
};

document.addEventListener("touchstart",
    function (event) {
        ifFirstPointerDown(event, function (event) {
            var found = false;
            var element = event.srcElement;
            while (element && (!found)) {
                //                if ($.containsClassName(element, "native-touches")) {
                //                    found = true;
                //                }
                element = element.parentNode;
            }
            if (!found) {
                moved = false;
                event.preventDefault();
                event.stopPropagation();
                shouldCatch = true;
            }
        });
    });

document.addEventListener("touchmove",
    function (event) {
        if (shouldCatch) {
            moved = true;
            event.preventDefault();
            event.stopPropagation();
        }
    });

document.addEventListener("touchend",
    function (event) {
        ifLastPointerUp(event, function (event) {
            if (shouldCatch) {
                if (!moved) {
                    var point = event.changedTouches[0];
                    var target = event.target;
                    while (target.nodeType != Node.ELEMENT_NODE) {
                        target = target.parentNode;
                    }
                    var mouseEvent = document.createEvent('MouseEvents');
                    mouseEvent.initMouseEvent("click", true, true, document.defaultView, 0,
                        point.screenX, point.screenY, point.clientX, point.clientY,
                        false, false, false, false, 0, null);
                    mouseEvent.preventDefault();
                    target.dispatchEvent(mouseEvent);
                }
                event.preventDefault();
                event.stopPropagation();
            }
            shouldCatch = false;
        });
    });

document.addEventListener("touchcancel",
    function (event) {
        ifLastPointerUp(event, function (event) {
            event.preventDefault();
            event.stopPropagation();
            shouldCatch = false;
        });
    });

var oldPos, nowPos, zoomDistant;

document.body.addEventListener('touchmove', function (event) {
    event.preventDefault();
}, false);

$('body')[0].addEventListener('touchstart', function (e) {
    showPos(e);
    if (e.targetTouches[1])
        oldPos = getDistant(e);
});

$('body')[0].addEventListener('touchmove', function (e) {
    showPos(e)
    if (e.targetTouches[1])
        nowPos = getDistant(e);
    if(oldPos){
        zoomDistant = nowPos / oldPos;
        $('#text')[0].value = zoomDistant;
        zoom(zoomDistant);
    }
});

function showPos(e) {
    var touchPos = mouseCoords(e.targetTouches[0]);
    $('#pointer0')[0].style.left = touchPos.x;
    $('#pointer0')[0].style.top = touchPos.y;
    if (e.targetTouches[1]) {
        var touchPos2 = mouseCoords(e.targetTouches[1]);
        $('#pointer1')[0].style.left = touchPos2.x;
        $('#pointer1')[0].style.top = touchPos2.y;
        
        var zoomPos={};
        if(touchPos.x > touchPos2.x){
            zoomPos.x = touchPos2.x+(touchPos.x - touchPos2.x)/2;
            $('#zoomPos')[0].style.left = zoomPos.x+'px';
        } else{
            zoomPos.x = touchPos.x+(touchPos2.x - touchPos.x)/2;
            $('#zoomPos')[0].style.left = zoomPos.x+'px';
        }
        if(touchPos.y > touchPos2.y){
            zoomPos.y = touchPos2.y+(touchPos.y - touchPos2.y)/2;
            $('#zoomPos')[0].style.top = zoomPos.y+'px';
        } else{
            zoomPos.y = touchPos.y+(touchPos2.y - touchPos.y)/2;
            $('#zoomPos')[0].style.top = zoomPos.y+'px';
        }
    }
    //    console.log(e.targetTouches);
}

function getDistant(e) {
    var touchPos = mouseCoords(e.targetTouches[0]);
    if (e.targetTouches[1]) {
        var touchPos2 = mouseCoords(e.targetTouches[1]);
        var zoomPos={};
        if(touchPos.x > touchPos2.x){
            zoomPos.x = touchPos.x - touchPos2.x;
        } else{
            zoomPos.x = touchPos2.x - touchPos.x;
        }
        if(touchPos.y > touchPos2.y){
            zoomPos.y = touchPos.y - touchPos2.y;
        } else{
            zoomPos.y = touchPos2.y - touchPos.y;
        }
        return Math.sqrt(zoomPos.y*zoomPos.y+zoomPos.x*zoomPos.x);
    }
    
}

function mouseCoords(ev) {
    if (ev.clientX || ev.clientY) {
        return {
            x: ev.clientX,
            y: ev.clientY
        };
    }
    return {
        x: ev.clientX + document.body.scrollLeft - document.body.clientLeft,
        y: ev.clientY + document.body.scrollTop - document.body.clientTop
    };
}