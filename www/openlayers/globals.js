/* Globale variabelen die gebruikt worden in de webpagina*/
var map, info;
var stationSource;
var stationLayer;
var meldingSource;
var meldingLayer;
var heatmap;
var view = new ol.View({
    center: ol.proj.transform([5.2993672, 51.6964256], 'EPSG:4326', 'EPSG:3857'),
    zoom: 14
})