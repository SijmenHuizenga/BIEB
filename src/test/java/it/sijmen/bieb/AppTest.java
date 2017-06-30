package it.sijmen.bieb;

import junit.framework.TestCase;

import java.sql.SQLException;
import java.util.ArrayList;

/**
 * Unit test for simple App.
 */
public class AppTest extends TestCase {
    
    public void testApp() throws SQLException {
        ArrayList<Melding> meldingen = DB.getMeldingen();

        System.out.println(meldingen);
    }
}
