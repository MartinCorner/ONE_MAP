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


document.body.addEventListener('touchmove', function (event) {
    event.preventDefault();
}, false);

$('body')[0].addEventListener('touchstart', function (e) {
    showPos(e)
});

$('body')[0].addEventListener('touchmove', function (e) {
    showPos(e)
});

function showPos(e){
    for(var i=0;i<e.targetTouches.length;i++){
        var touchPos = mouseCoords(e.targetTouches[i]);
        $('#pointer'+i)[0].style.left = touchPos.x;
        $('#pointer'+i)[0].style.top = touchPos.y;
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