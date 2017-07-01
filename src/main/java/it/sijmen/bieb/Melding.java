package it.sijmen.bieb;

/**
 * Created by Sijmen on 30-6-2017.
 */
public class Melding {
    public String lat, lng, opmerking, sterkte, tijdstip;

    public Melding(String lat, String lng, String opmerking, String sterkte, String tijdstip) {
        this.lat = lat;
        this.lng = lng;
        this.opmerking = opmerking;
        this.sterkte = sterkte;
        this.tijdstip = tijdstip;
    }

    @Override
    public String toString() {
        return "Melding{" +
                "lat='" + lat + '\'' +
                ", lng='" + lng + '\'' +
                ", opmerking='" + opmerking + '\'' +
                ", sterkte='" + sterkte + '\'' +
                ", tijdstip='" + tijdstip + '\'' +
                '}';
    }
}
