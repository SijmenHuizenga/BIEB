package it.sijmen.bieb;

import org.eclipse.jetty.websocket.api.*;
import org.eclipse.jetty.websocket.api.annotations.*;
import java.io.*;
import java.util.*;
import java.util.concurrent.*;

/**
 * Created by Sijmen on 30-6-2017.
 */
@WebSocket
public class WebsocketServer {

    private static final Queue<Session> sessions = new ConcurrentLinkedQueue<>();

    @OnWebSocketConnect
    public void connected(Session session) {
        System.out.println("CONNECTED: " + session.getRemoteAddress());
        sessions.add(session);
    }

    @OnWebSocketClose
    public void closed(Session session, int statusCode, String reason) {
        System.out.println("CLOSED: " + session.getRemoteAddress());
        sessions.remove(session);
    }

    @OnWebSocketMessage
    public void message(Session session, String message) throws IOException {
        System.out.println("RECEIVED: " + message);
        session.getRemote().sendString(message);
    }
    
}
