var pixelsPerUnit = 29;
var marks = 4;

function drawGraph() {
    var canvas = document.getElementById("axisCanvas");
    var context = canvas.getContext('2d');

    var h = canvas.height;
    var w = canvas.width;
    context.strokeStyle = "black";
    context.lineWidth = 1;
    context.beginPath();
    context.moveTo(w/2, h);
    context.lineTo(w/2, 0);
    context.lineTo(w/2+6, 10);
    context.moveTo(w/2, 0);
    context.lineTo(w/2-6, 10);

    drawSeparatorsX(context, w, h);
    context.stroke();

    context.beginPath();
    context.moveTo(0, h/2);
    context.lineTo(w, h/2);
    context.lineTo(w-10, h/2+6);
    context.moveTo(w, h/2);
    context.lineTo(w-10, h/2-6);

    drawSeparatorsY(context, w, h);
    context.stroke();

}

function drawSeparatorsX(context, w, h) {
    var t=w/2;
    for (var j=0; j<marks; j++){
        t+=pixelsPerUnit;
        context.moveTo(t, h/2+3);
        context.lineTo(t, h/2-3)
    }
    t=w/2;
    for (var j=0; j<marks; j++){
        t-=pixelsPerUnit;
        context.moveTo(t, h/2+3);
        context.lineTo(t, h/2-3)
    }
}

function drawSeparatorsY(context, w, h) {
    var t=h/2;
    for (var j=0; j<marks; j++){
        t+=pixelsPerUnit;
        context.moveTo(w/2+3, t);
        context.lineTo(w/2-3, t);
    }
    t=h/2;
    for (var j=0; j<marks; j++){
        t-=pixelsPerUnit;
        context.moveTo(w/2+3, t);
        context.lineTo(w/2-3, t);
    }
}

function drawHitArea(r) {
    var canvas = document.getElementById("areaCanvas");
    var context = canvas.getContext('2d');

    var h = canvas.height;
    var w = canvas.width;

    context.fillStyle = "#869cff";
    context.strokeStyle = context.fillStyle;

    context.clearRect(0, 0, w, h);

    context.beginPath();
    context.arc(w/2,h/2,r*pixelsPerUnit,0,Math.PI/2*3,true);
    context.lineTo(w/2-r/2*pixelsPerUnit, h/2-r*pixelsPerUnit);
    context.lineTo(w/2-r/2*pixelsPerUnit, h/2);
    context.lineTo(w/2, h/2);
    context.lineTo(w/2, h/2 + r*pixelsPerUnit);
    context.lineTo(w/2 + r*pixelsPerUnit, h/2);
    context.fill();
}


function drawPoint(x, y, inside) {
    var canvas = document.getElementById("pointCanvas");
    var context = canvas.getContext('2d');


    context.fillStyle = inside ? "#93FF3C" : "#FF552F";
    context.strokeStyle = context.fillStyle;

    context.beginPath();
    context.arc(canvas.width/2+x*pixelsPerUnit,canvas.height/2-y*pixelsPerUnit,3,0,Math.PI*2, true);
    context.fill();
}

function clearPoints() {
    var canvas = document.getElementById("pointCanvas");
    var context = canvas.getContext('2d');

    context.clearRect(0, 0, canvas.width, canvas.height);
}


function sendPointsFromTable(assumeRZero)
{
    var table = document.getElementById("resulttable");
    for (var i = 1; i < table.children.length; i++) {
        var row = table.children[i];
        sendPointRequest(row.children[0].innerHTML, row.children[1].innerHTML, assumeRZero ? 0 : valueR, false)
    }
}