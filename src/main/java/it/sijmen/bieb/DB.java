package it.sijmen.bieb;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;
import java.sql.Statement;

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
    

}
