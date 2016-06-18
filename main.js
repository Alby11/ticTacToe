//Global Variables
var cpuSymbol = 'X',
    humanSymbol = 'O',
    isFinished = false,
    isHuman = true,
    canvases = document.getElementsByClassName('theCanvas'),
    filledCanvases = [],
    cpuCanvases = [],
    winningCombinations = [
        [1, 2, 3],
        [4, 5, 6],
        [7, 8, 9],
        [1, 4, 7],
        [2, 5, 8],
        [3, 6, 9],
        [1, 5, 9],
        [3, 5, 7]
    ];
// End of Global Variables

function notifierStyle(htmlClass) {

    var  alertifyNotifiers = document.getElementsByClassName(htmlClass);
    for (var i = 0; i < alertifyNotifiers.length; i++) {
        alertifyNotifiers[i].style.position = 'absolute';
        alertifyNotifiers[i].style.left = '-275px';

        var mq = window.matchMedia( "(max-height: 740px)" );

        if (mq.matches) {
            alertifyNotifiers[i].style.top = '500px';
        } else {
            alertifyNotifiers[i].style.top = '650px';
        }
    }

}

function animateCanvases(canvases){

    document.getElementById('box').style.animation = 'rotateIt 2s';
    for (var i = 0; i < canvases.length; i++) {
        canvases[i].style.animation+='scaleInOut 2s, rotateIt 2s';
    }

}

var symbolDrawings = {

    drawX : function(id) {
        var X = document.getElementById(id);
        if (X.getContext) {
            var ctx = X.getContext('2d');

            var x = 150;
            var y = 150;

            ctx.beginPath();
            ctx.moveTo(x - 20, y - 20);
            ctx.lineTo(x - 130, y - 130);
            ctx.moveTo(x - 130, y - 20);
            ctx.lineTo(x - 20, y - 130);
            ctx.lineWidth = 5;
            ctx.strokeStyle = 'black';
            ctx.stroke();
        }

    },
    drawO : function(id) {
        var O = document.getElementById(id);
        if (O.getContext) {
            var ctx = O.getContext('2d');
            var centerX = O.width / 2;
            var centerY = O.height / 2;
            var radius = 50;

            ctx.beginPath();
            ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI, false);
            ctx.lineWidth = 5;
            ctx.strokeStyle = 'black';
            ctx.stroke();
        }
    }

};

function mainPlay(clickedCanvasId, symbol) {

    filledCanvases.push(clickedCanvasId);
    if (filledCanvases.length === 9) {
        isFinished = true;
        alertify.alert(
            "Game finished",
            "Game finished! There's not a winner!",
            function () {
                location.reload();
            }
        );
    }
    symbolDrawings['draw' + symbol](clickedCanvasId);
    document.getElementById(clickedCanvasId).className += " is" + symbol;
    for (var k = 0; k < winningCombinations.length; k++) {
        var j = 0;
        var comb1 = document.getElementById('canvas' + winningCombinations[k][j]).className,
            comb2 = document.getElementById('canvas' + winningCombinations[k][++j]).className,
            comb3 = document.getElementById('canvas' + winningCombinations[k][++j]).className;
        if (comb1.includes('is') && comb1 == comb2 && comb2 == comb3) {
            var j = 0;
            var comb1 = document.getElementById('canvas' + winningCombinations[k][j]),
                comb2 = document.getElementById('canvas' + winningCombinations[k][++j]),
                comb3 = document.getElementById('canvas' + winningCombinations[k][++j]);
            comb1.style.animation = 'rotateIt 2s';
            comb2.style.animation = 'rotateIt 2s';
            comb3.style.animation = 'rotateIt 2s';
            comb1.style.animationIterationCount = 'infinite';
            comb2.style.animationIterationCount = 'infinite';
            comb3.style.animationIterationCount = 'infinite';
            comb1.style.background = 'green';
            comb2.style.background = 'green';
            comb3.style.background = 'green';

            isFinished = true;

            alertify.alert(
                "Game finished",
                "Game finished! " + symbol + " wins!",
                function () {
                    location.reload();
                }
            );
        }
    }

}

function humanPlay(clickedCanvas) {

    var clickedCanvasId = clickedCanvas.target.id;
    if (filledCanvases.indexOf(clickedCanvasId) == -1) {
        mainPlay(clickedCanvasId, humanSymbol);
        isHuman = false;
    } else {
        document.getElementById(clickedCanvasId).style.background = 'red';
        setTimeout(function () {
            console.log(clickedCanvasId + ' Already Clicked!');
            document.getElementById(clickedCanvasId).style.background = 'white';
        }, 1000);
        theGame(canvases);
    }

}

function cpuPlay() {

    if (filledCanvases.indexOf('canvas5') === -1) {
        clickedCanvasId = 'canvas5';
    } else if (filledCanvases.indexOf('canvas1') === -1) {
        clickedCanvasId = 'canvas1';
    } else if (filledCanvases.indexOf('canvas3') === -1) {
        clickedCanvasId = 'canvas3';
    } else if (filledCanvases.indexOf('canvas7') === -1) {
        clickedCanvasId = 'canvas7';
    } else if (filledCanvases.indexOf('canvas9') === -1) {
        clickedCanvasId = 'canvas9';
    } else {
        var remainingCanvases = [2, 4, 6, 8];
        for (var i in remainingCanvases) {
            if (filledCanvases.indexOf('canvas' + remainingCanvases[i]) === -1) {
                clickedCanvasId = 'canvas' + remainingCanvases[i];
                break;
            }
        }
    }
    cpuCanvases.push(clickedCanvasId);
    mainPlay(clickedCanvasId, cpuSymbol);
    isHuman = true;

}

function theGame(canvases) {

    setInterval(function() {
        if ( ! isFinished) {
            if (isHuman) {
                for (var i = 0; i < canvases.length; i++) {
                    canvases[i].addEventListener('click', humanPlay);
                }
            } else {
                for (var i = 0; i < canvases.length; i++) {
                    canvases[i].removeEventListener('click', humanPlay);
                }
                cpuPlay();
            }
        }
    }, 1000);

}

function main() {

    alertify.confirm(
        "Choose your symbol",
        "Choose X or O:",
        function(){
            humanSymbol = 'X';
            cpuSymbol = 'O';
            alertify.success('Choice is: X');
            notifierStyle('alertify-notifier');
            animateCanvases(canvases);
            theGame(canvases);
        },
        function(){
            humanSymbol = 'O';
            cpuSymbol = 'X';
            alertify.success('Choice is: O');
            notifierStyle('alertify-notifier');
            animateCanvases(canvases);
            theGame(canvases);
        }
    ).set(
            'labels', {
                ok:'X',
                cancel:'O'
            }
    );

}

document.addEventListener("DOMContentLoaded", main(), false);
