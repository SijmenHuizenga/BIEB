function initMap() {
    var map = new ol.Map({
        target: 'map',
        layers: [
            new ol.layer.Group({
                'title': 'Basemaps',
                layers: [
                    new ol.layer.Tile({
                        title: 'DigitalGlobe Maps API: Recent Imagery',
                        type: 'base',
                        visible: false,
                        source: new ol.source.XYZ({
                            url: 'http://api.tiles.mapbox.com/v4/digitalglobe.nal0g75k/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoiZGlnaXRhbGdsb2JlIiwiYSI6ImNpcGg5dHkzYTAxM290bG1kemJraHU5bmoifQ.CHhq1DFgZPSQQC-DYWpzaQ', // You will need to replace the 'access_token' and 'Map ID' values with your own. http://developer.digitalglobe.com/docs/maps-api
                            attribution: "© DigitalGlobe, Inc"
                        })
                    })
                    , new ol.layer.Tile({
                        title: 'OSM',
                        type: 'base',
                        visible: true,
                        source: new ol.source.OSM()
                    })
                ]
            })
            , new ol.layer.Group({
                title: 'Specifieke lagen',
                layers: [
                    stationLayer = new ol.layer.Tile({
                        title: 'Sensordata Den Bosch',
                        source: stationSource = new ol.source.TileWMS({
                            url: 'http://35.157.253.195:8080/geoserver/BIEB/wms',
                            params: {
                                'LAYERS': 'BIEB:meetstationdata',
                                'TILED': true
                            },
                            serverType: 'geoserver'
                        }),
                    }),
                    meldingLayer = new ol.layer.Tile({
                        title: 'Geluidsoverlast meldingen',
                        source: meldingSource = new ol.source.TileWMS({
                            url: 'http://35.157.253.195:8080/geoserver/BIEB/wms',
                            params: {
                                'LAYERS': 'BIEB:meldingdata',
                                'TILED': true
                            },
                            serverType: 'geoserver'
                        }),
                    }),
                    planningLayer = new ol.layer.Tile({
                        title: 'Geplande evenementen',
                        source: planningSource = new ol.source.TileWMS({
                            url: 'http://35.157.253.195:8080/geoserver/BIEB/wms',
                            params: {
                                'LAYERS': 'BIEB:planningsdata',
                                'TILED': true
                            },
                            serverType: 'geoserver'
                        }),
                    })
                ]
            })
        ],
        view: view
    });

    map.on('singleclick', function (evt) {
        document.getElementById('info1').innerHTML = '';
        var viewResolution = /** @type {number} */ (view.getResolution());
        var url = stationSource.getGetFeatureInfoUrl(evt.coordinate, viewResolution, 'EPSG:3857', {
            'INFO_FORMAT': 'text/html'
        });
        if (url) {
            document.getElementById('info1').innerHTML = '<iframe seamless src="' + url + '"></iframe>';
        }
    });
    map.on('singleclick', function (evt) {
        document.getElementById('info2').innerHTML = '';
        var viewResolution = /** @type {number} */ (view.getResolution());
        var url = meldingSource.getGetFeatureInfoUrl(evt.coordinate, viewResolution, 'EPSG:3857', {
            'INFO_FORMAT': 'text/html'
        });
        if (url) {
            document.getElementById('info2').innerHTML = '<iframe seamless src="' + url + '"></iframe>';
        }
    });
    map.on('singleclick', function (evt) {
        document.getElementById('info3').innerHTML = '';
        var viewResolution = /** @type {number} */ (view.getResolution());
        var url = planningSource.getGetFeatureInfoUrl(evt.coordinate, viewResolution, 'EPSG:3857', {
            'INFO_FORMAT': 'text/html'
        });
        if (url) {
            document.getElementById('info3').innerHTML = '<iframe seamless src="' + url + '"></iframe>';
        }
    });
    var layerSwitcher = new ol.control.LayerSwitcher({
        tipLabel: 'Lagen' // Optional label for button
    });
    map.addControl(layerSwitcher);
}