
function sendPointRequest(x, y, r, cacheResult)
{
    console.log("Sending a request...");
    console.log(x + " " + y + " " + r);

    var request = new XMLHttpRequest();
    request.open("GET", document.documentURI +
        `?action=check&X=${x}&Y=${y}&R=${r}&cache=${cacheResult}&offset=${new Date().getTimezoneOffset()}`, true);

    request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    request.onload = ()=>addNewPoint(request.responseText, cacheResult);

    request.send();
}


function addNewPoint(response, cacheResult)
{
    console.log("Got a response! Parsing...");
    console.log(response);
    var point = JSON.parse(response);

    if (point.valid == true)
    {
        console.log("Entered values were correct. Updating the page...");

        drawPoint(point.x, point.y, point.result);

        if (cacheResult) {
            addNewRowToResultTable(point);
            console.log("The page should be ready now");
        }
    }
    else
    {
        console.log("ERROR - Entered values were incorrect. Bummer.")
    }
}


function addNewRowToResultTable(point) {
    console.log("Adding a point to the table...");

    var newRow = document.createElement("tr");
    newRow.className = "resultrow";
    newRow.innerHTML =`
        <th>${point.x}</th>
        <th>${point.y}</th>
        <th>${point.r}</th>
        <th>${point.result ? "Yesss!" : "oh no"}</th> 
        <th>${point.time}</th>`;

    document.getElementById("resulttable").appendChild(newRow);
    document.getElementById("results").classList.remove("hidden");
}

function clearResultTable()
{
    console.log("Clearing the table...");
    var rows = document.getElementsByClassName("resultrow");

    while(rows[0]) {
        rows[0].parentNode.removeChild(rows[0]);
    }

    document.getElementById("results").classList.add("hidden");
}


function clearHistory()
{
    console.log("Clearing history...");

    clearResultTable();
    clearPoints();

    console.log("Sending a session history clear request...");


    var request = new XMLHttpRequest();
    request.open("GET", document.documentURI + "?action=clear", true);
    request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    request.onload = ()=>console.log("Received confirmation from server - history is clean!");
    request.send();

    console.log("All done, all those poor points are now forgotten!")
}