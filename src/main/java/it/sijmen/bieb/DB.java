package it.sijmen.bieb;

import java.sql.*;
import java.util.ArrayList;

/**
 * Created by Sijmen on 30-6-2017.
 */
public class DB {
    
    private static Connection connection;

    public static Connection openConn() throws SQLException {
        if(connection != null && !connection.isClosed())
            return connection;
        try {
            Class.forName("org.postgresql.Driver");
            return connection = DriverManager.getConnection("jdbc:postgresql://35.157.253.195:25432/BIEB", "docker", "docker");
        } catch (Exception e) {
            e.printStackTrace();
            System.err.println(e.getClass().getName()+": "+e.getMessage());
            throw new SQLException(e.getMessage());
        }
    }
    
    public static void create(String query) throws SQLException {
        Connection connection = openConn();
        Statement statement = connection.createStatement();
        statement.execute(query);
    }


    public static ResultSet select(String query) throws SQLException {
        Connection connection = openConn();
        Statement statement = connection.createStatement();
        boolean execute = statement.execute(query);
        if(!execute)
            throw new SQLException("Does not exist");
        return statement.getResultSet();
    }
    
    public static ArrayList<Melding> getMeldingen() throws SQLException {
        ArrayList<Melding> meldingen = new ArrayList<>();
        ResultSet select = DB.select("SELECT melding_opmerking, waarde_meting, lat, lon, tijdstip FROM meldingdata");
        while(select.next()){
            meldingen.add(
                    new Melding(
                            select.getString("lat"),
                            select.getString("lon"),
                            select.getString("melding_opmerking"),
                            select.getString("waarde_meting"),
                            select.getString("tijdstip")
                    )
            );
        }
        return meldingen;
    }
    
    public static void saveMelding(Melding melding) throws SQLException {
        DB.create("INSERT INTO meldingdata (melding_opmerking, waarde_meting, lat, lon) " +
                "VALUES ('"+melding.opmerking+"', '"+melding.sterkte+"', '"+melding.lat+"', '"+melding.lng+"')");
    }

    public static void savePlanning(Planning planning) throws SQLException {
        DB.create("INSERT INTO planningsdata (categorie, lat, lon, sterkte, startstamp, eindstamp) " +
                "VALUES ('"+planning.categorie+"', '"+planning.lat+"', '"+planning.lng+"', '"+planning.sterkte+"', '"+planning.startstamp+"', '"+planning.eindstamp+"')");

    }
}
