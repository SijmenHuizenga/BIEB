package it.sijmen.bieb;

import com.google.gson.Gson;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import org.eclipse.jetty.websocket.api.Session;
import org.eclipse.jetty.websocket.api.annotations.OnWebSocketClose;
import org.eclipse.jetty.websocket.api.annotations.OnWebSocketConnect;
import org.eclipse.jetty.websocket.api.annotations.OnWebSocketMessage;
import org.eclipse.jetty.websocket.api.annotations.WebSocket;

import java.io.IOException;
import java.util.Queue;
import java.util.concurrent.ConcurrentLinkedQueue;

/**
 * Created by Sijmen on 30-6-2017.
 */
@WebSocket
public class WebsocketServer {

    private static final Queue<Session> sessions = new ConcurrentLinkedQueue<>();
    private Gson gson = new Gson();
    
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

        JsonParser parser = new JsonParser();
        JsonObject o = parser.parse(message).getAsJsonObject();
        
        String type = o.get("type").getAsString();
        switch(type){
            case "MELDING": melding(o); break;
            case "GETMELDINGEN": getMeldingen(session); break;
            case "PLANNING": planning(o, session); break;
        }
        
    }

    private void planning(JsonObject o, Session session) {
        Planning planning = new Planning(
                o.get("categorie").getAsString(),
                o.get("lat").getAsString(),
                o.get("lng").getAsString(),
                o.get("sterkte").getAsString(),
                o.get("startstamp").getAsString(),
                o.get("eindstamp").getAsString()
        );
        try {
            DB.savePlanning(planning);
        } catch (Exception e) {
            System.err.println("Niet gelukt melding op te slaan in database.");
            e.printStackTrace();
        }
        
        for(Session s : sessions){
            if(s.equals(session))
                continue;
            try {
                s.getRemote().sendString("Let op! Er komt een "+ planning.categorie +" event aan!\n" + 
                    "Van " + planning.startstamp + " tot " + planning.eindstamp);
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
    }


    private void getMeldingen(Session session) {
        try {
            session.getRemote().sendString(
                gson.toJson(DB.getMeldingen())
            );
        } catch (Exception e) {
            System.err.println("Niet geulukt trips op te halen.");
            e.printStackTrace();
        }
    }

    private void melding(JsonObject o) {
        String lat = o.get("lat").getAsString();
        String lng = o.get("lng").getAsString();
        String opmerking = o.get("opmerking").getAsString();
        String sterkte = o.get("sterkte").getAsString();

        try {
            DB.saveMelding(
                new Melding(lat, lng, opmerking, sterkte)
            );
        } catch (Exception e) {
            System.err.println("Niet gelukt melding op te slaan in database.");
            e.printStackTrace();
        }
    }

}
