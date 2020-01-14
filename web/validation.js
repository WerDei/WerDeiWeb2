var valueValidX = false;
var valueValidY = false;
var valueValidR = false;
var valueX;
var valueY;
var valueR;

function init()
{
    checkYValue();
    checkRValue(false);

    drawGraph();

    document.getElementById("pointCanvas").addEventListener("mousedown", sendPointFromGraph);
    sendPointsFromTable(!valueValidR);
}

function setXValue(newValue)
{
    valueX = newValue;

    var text = "You've picked " + newValue + ", nice choice!";
    document.getElementById("form_value_x_display").innerHTML = text;
    document.getElementById("form_value_x_display").classList.add("successmessage");

    valueValidX = true;
    AllowSendingIfValidInputs();
}

function checkYValue()
{
    var val = document.getElementById("form_value_y_input").value;
    val = val.replace(",", ".");
    var numValue = +val;

    var errorDisplay = document.getElementById("form_value_y_display");
    valueValidY = false;

    if (val == "")
    {
        errorDisplay.innerHTML = "";
    }
    else if (val == "pidor")
    {
        errorDisplay.innerHTML = "No, yo mama is!";
    }
    else if (isNaN(numValue))
    {
        errorDisplay.innerHTML = "No, enter a number! Come on, you can do it!";
    }
    else if (!(numValue >= -5 && numValue <= 5))
    {
        errorDisplay.innerHTML = "Please pick between -5 and 5, sweetie!";
    }
    else
    {
        errorDisplay.innerHTML = "Good job!";
        valueY = numValue;
        valueValidY = true;
    }

    AllowSendingIfValidInputs();
}

function checkRValue(tableSend)
{
    var checkboxes = document.getElementsByName("value_r");

    var checkedCount = 0;
    for (var i = 0; i < checkboxes.length; i++)
    {
        if (checkboxes[i].checked)
        {
            checkedCount++;
            valueR = checkboxes[i].value;
        }
    }

    if (checkedCount == 0)
    {
        valueValidR = false;
        valueR = null;
        document.getElementById("form_value_r_display").innerHTML = "";
    }
    else if (checkedCount > 1)
    {
        valueValidR = false;
        valueR = null;
        document.getElementById("form_value_r_display").innerHTML = "You're not supposed to do that...";
    }
    else
    {
        document.getElementById("form_value_r_display").innerHTML = "";
        valueValidR = true;
        drawHitArea(valueR);

        if(tableSend) sendPointsFromTable(false);
    }

    AllowSendingIfValidInputs();
}

function AllowSendingIfValidInputs()
{
    if (valueValidX && valueValidY && valueValidR)
    {
        document.getElementById("form_button_submit").disabled = false;
    }
    else
    {
        document.getElementById("form_button_submit").disabled = true;
    }
}


function sendPointFromForm()
{
    sendPointRequest(valueX, valueY, valueR, true)
}


function sendPointFromGraph(event)
{

    checkRValue(false);

    if(valueValidR){
        var canvas = document.getElementById("pointCanvas");
        var rect = canvas.getBoundingClientRect();

        var x = Number(((event.pageX - window.pageXOffset - rect.x - canvas.width/2)/pixelsPerUnit).toFixed(2));
        var y = Number((-(event.pageY - window.pageYOffset - rect.y - canvas.height/2)/pixelsPerUnit).toFixed(2));

        if(x>=-5 && x<=5 && y>=-5 && y<=3){
            sendPointRequest(x, y, valueR, true)
        }
    }
    else
    {
        document.getElementById("form_value_r_display").innerHTML = "Pick a correct R first, sweetheart!";
    }
}