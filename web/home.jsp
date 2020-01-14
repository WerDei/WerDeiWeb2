<%@ page import="net.werdei.web.lab2.Point" %>
<%@ page import="java.util.ArrayList" %>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%
    ArrayList<Point> points = null;
    try
    {
        points = (ArrayList<Point>) session.getAttribute("pointsArray");
    }
    catch (Exception ignored) {}

    boolean drawSessionCache = points != null;
%>
<%
    String resultTableClass = drawSessionCache ? "" : "class=\"hidden\"";
%>
<%
    String additionalTableRows = "";
    if (drawSessionCache)
    {
        for (Point point : points) {
            String newRow = "<tr class=\"resultrow\">" +
                "<th>" + point.getX() + "</th>" +
                "<th>" + point.getY() + "</th>" +
                "<th>" + point.getR() + "</th>" +
                "<th>" + (point.getResult() ? "Yesss!" : "oh no") + "</th>" +
                "<th>" + point.getTime() + "</th> </tr>";

            additionalTableRows += newRow;
        }
    }
%>
<html>

<link href="home.css" rel="stylesheet" type="text/css">


<script src="validation.js"></script>
<script src="ajax.js"></script>
<script src="graph.js"></script>


<head>
    <title>It's a beautiful day outside</title>
</head>


<body onload="init()">


<div id="tophat">
    ОЛЕГ ОСИПОВ, P3214 <br>
    <span>Вариант 13139</span>
</div>


<div id="main">
    <div class="formholder">
            Choose an X value! <br>
            <span class="buttons">
                    <span> <button class="genericbutton" type="button" onclick="setXValue(-2)">-2</button> </span>
                    <span> <button class="genericbutton" type="button" onclick="setXValue(-1.5)">-1.5</button> </span>
                    <span> <button class="genericbutton" type="button" onclick="setXValue(-1)">-1</button> </span>
                    <span> <button class="genericbutton" type="button" onclick="setXValue(-0.5)">-0.5</button> </span>
                    <span> <button class="genericbutton" type="button" onclick="setXValue(0)">0</button> </span>
                    <span> <button class="genericbutton" type="button" onclick="setXValue(0.5)">0.5</button> </span>
                    <span> <button class="genericbutton" type="button" onclick="setXValue(1)">1</button> </span>
                    <span> <button class="genericbutton" type="button" onclick="setXValue(1.5)">1.5</button> </span>
                    <span> <button class="genericbutton" type="button" onclick="setXValue(2)">2</button> </span>
                </span>
            <span id="form_value_x_display">Go ahead, click a button!</span>

            <br><br>

            Enter the Y: <br>
            <input type="text" id="form_value_y_input" placeholder="-5 to 5, please!" maxlength="15"
                   oninput="checkYValue()">
            <span class="errormessage" id="form_value_y_display"></span>

            <br><br>

            And now, pick any R you like!<br>
            <span class="checkboxes">
                    <span>
                        1<br>
                        <input type="radio" name="value_r" value="1" onclick="checkRValue(true)">
                    </span>
                    <span>
                        1.5<br>
                        <input type="radio" name="value_r" value="1.5" onclick="checkRValue(true)">
                    </span>
                    <span>
                        2<br>
                        <input type="radio" name="value_r" value="2" onclick="checkRValue(true)">
                    </span>
                    <span>
                        2.5<br>
                        <input type="radio" name="value_r" value="2.5" onclick="checkRValue(true)">
                    </span>
                    <span>
                        3<br>
                        <input type="radio" name="value_r" value="3" onclick="checkRValue(true)">
                    </span>
            </span>
            <span class="errormessage" id="form_value_r_display"></span> <br>

            <button id="form_button_submit" onclick="sendPointFromForm()" disabled>I'm ready!</button>

    </div>

    <div class="graphics">
        <canvas id="areaCanvas" height="300px" width="300px"></canvas>
        <canvas id="axisCanvas" height="300px" width="300px"></canvas>
        <canvas id="pointCanvas" height="300px" width="300px"></canvas>
    </div>
</div>

<div id="results" <%=resultTableClass%>>

    <div>
        Here are all the cool requests you've made earlier:
        <button onclick="clearHistory()">Carefully remove them</button>
    </div>

    <table class="results">
        <tbody id="resulttable">
            <tr class="toprow">
                <th>X</th>
                <th>Y</th>
                <th>R</th>
                <th class="resultcell">Is it in?</th>
                <th>Checked at</th>
            </tr>
            <%=additionalTableRows%>
        </tbody>
    </table>

</div>

</body>
</html>