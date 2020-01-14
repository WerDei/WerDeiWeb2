package net.werdei.web.lab2;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Locale;

public class Point
{
    private double x, y, r;
    private boolean result, valuesValid;
    private String time;


    public Point(String rawX, String rawY, String rawR, String rawOffset)
    {
        validateData(rawX, rawY, rawR, rawOffset);
        calculateResult();
    }


    @Override
    public String toString() {
        return String.format(Locale.ROOT,
                "{\"x\":\"%s\", \"y\":\"%s\", \"r\":\"%s\", \"result\":%s, \"valid\":%s, \"time\":\"%s\"}",
                x, y, r, result, valuesValid, time);
    }

    public boolean isValid()
    {
        return valuesValid;
    }

    public double getX()
    {
        return x;
    }

    public double getY()
    {
        return y;
    }

    public double getR()
    {
        return r;
    }

    public boolean getResult()
    {
        return result;
    }

    public String getTime()
    {
        return time;
    }


    private void validateData(String rawX, String rawY, String rawR, String rawOffset)
    {
        try
        {
            x = Double.parseDouble(rawX.replace(",","."));
            y = Double.parseDouble(rawY.replace(",","."));
            r = Double.parseDouble(rawR.replace(",","."));

            int offset = Integer.parseInt(rawOffset);
            Date date = new Date(new Date().getTime()-3*1000*60*60-offset*1000*60);
            time = new SimpleDateFormat("HH:mm:ss").format(date);

            valuesValid = true;
        }
        catch (NumberFormatException e)
        {
            valuesValid = false;
        }
    }

    private void calculateResult()
    {
        double scaledX = x/r;
        double scaledY = y/r;

        //Quadrant I
        if (scaledX >= 0 && scaledY >= 0)
        {
            if (Math.pow(scaledX, 2) + Math.pow(scaledY, 2) <= 1)
                result = true;
            else
                result = false;
        }

        //Quadrant II
        else if (scaledX < 0 && scaledY >= 0)
        {
            if (scaledX >= -0.5 && scaledY <= 1)
                result = true;
            else
                result = false;
        }

        //Quadrant III
        else if (scaledX < 0 && scaledY < 0)
        {
            result = false;
        }

        //Quadrant IV
        else if (scaledX >= 0 && scaledY < 0)
        {
            scaledY = Math.abs(scaledY);
            if (scaledY <= (1 - scaledX))
                result = true;
            else
                result = false;
        }
    }

}
