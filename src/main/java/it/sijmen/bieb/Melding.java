package it.sijmen.bieb;

/**
 * Created by Sijmen on 30-6-2017.
 */
public class Melding{
    public String lat, lng, opmerking, sterkte;

    public Melding(String lat, String lng, String opmerking, String sterkte) {
        this.lat = lat;
        this.lng = lng;
        this.opmerking = opmerking;
        this.sterkte = sterkte;
    }

    @Override
    public String toString() {
        return "Melding{" +
                "lat='" + lat + '\'' +
                ", lng='" + lng + '\'' +
                ", opmerking='" + opmerking + '\'' +
                ", sterkte='" + sterkte + '\'' +
                '}';
    }
}
