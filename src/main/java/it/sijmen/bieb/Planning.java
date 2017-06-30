package it.sijmen.bieb;

/**
 * Created by Sijmen on 30-6-2017.
 */
public class Planning {
    
    String categorie, lat, lng, sterkte, startstamp, eindstamp;

    public Planning(String categorie, String lat, String lng, String sterkte, 
                    String startstamp, String eindstamp) {
        this.categorie = categorie;
        this.lat = lat;
        this.lng = lng;
        this.sterkte = sterkte;
        this.startstamp = startstamp;
        this.eindstamp = eindstamp;
    }

    @Override
    public String toString() {
        return "Planning{" +
                "categorie='" + categorie + '\'' +
                ", lat='" + lat + '\'' +
                ", lng='" + lng + '\'' +
                ", sterkte='" + sterkte + '\'' +
                ", startstamp='" + startstamp + '\'' +
                ", eindstamp='" + eindstamp + '\'' +
                '}';
    }
}
