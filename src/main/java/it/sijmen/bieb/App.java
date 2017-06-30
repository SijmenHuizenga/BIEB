package it.sijmen.bieb;

import static spark.Spark.*;

/**
 * Hello world!
 *
 */
public class App {
    public static void main(String[] args){
        port(80);
        webSocket("/api", WebsocketServer.class);
        get("/ping", (request, response) -> {
            System.out.println("PING");
            return "pong";
        });
        init();
    }
}
