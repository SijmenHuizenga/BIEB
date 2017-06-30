package it.sijmen.bieb;

import static spark.Spark.init;
import static spark.Spark.webSocket;

/**
 * Hello world!
 *
 */
public class App {
    public static void main( String[] args ) {
        webSocket("/api", WebsocketServer.class);
        init();
    }
}
