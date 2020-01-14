package net.werdei.web.lab2;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.ArrayList;

public class AreaCheckServlet extends HttpServlet
{
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException
    {
        String action = request.getParameter("action");

        // If the request is to check a new point
        if (action.equals("check"))
        {
            Point point = new Point(request.getParameter("X"),
                    request.getParameter("Y"),
                    request.getParameter("R"),
                    request.getParameter("offset"));

            String cache = request.getParameter("cache");
            if (point.isValid() && cache != null && cache.equals("true")) {
                HttpSession session = request.getSession();
                session.setMaxInactiveInterval(60 * 30); //30 minutes
                addPointToSession(point, session);
            }

            response.setContentType("text/json");
            PrintWriter writer = response.getWriter();
            writer.println(point);
            writer.close();
        }

        // If the request is to clear the point history
        else if (action.equals("clear"))
        {
            clearSessionPointHistory(request.getSession());
        }
    }

    private void addPointToSession(Point point, HttpSession session)
    {
        ArrayList<Point> points = null;
        try
        {
            points = (ArrayList<Point>) session.getAttribute("pointsArray");
        }
        catch (Exception ignored) {}

        if (points == null)
            points = new ArrayList<Point>();

        points.add(point);

        session.setAttribute("pointsArray", points);
    }

    private void clearSessionPointHistory(HttpSession session)
    {
        session.removeAttribute("pointsArray");
    }

}
