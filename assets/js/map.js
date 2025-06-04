import 'ol/ol.css';
import 'ol-layerswitcher/dist/ol-layerswitcher.css';
import { Map, View, Overlay } from 'ol';
import { Tile, Image, Group, Vector } from 'ol/layer';
import { OSM, ImageWMS, BingMaps, StadiaMaps } from 'ol/source';
import VectorSource from 'ol/source/Vector';
import { GeoJSON } from 'ol/format';
import { fromLonLat } from 'ol/proj';
import { ScaleLine, FullScreen, MousePosition, ZoomSlider,  } from 'ol/control';
import LayerSwitcher from 'ol-layerswitcher';
import { createStringXY } from 'ol/coordinate';
import { Style, Stroke } from 'ol/style';
import VectorLayer from 'ol/layer/Vector';

let osm = new Tile({
    type: "base",
    title: "Open Street Maps",
    visible: true,
    source: new OSM()
});

let Study_area = new Image({
    title: "Study area",
    source: new ImageWMS({
        url: 'https://www.gis-geoserver.polimi.it/geoserver/wms',
        params: { 'LAYERS': 'gisgeoserver_13:Bulgaria_study_area'}
    })
});

let December_2022_backward_trajectory = new Image({
    title: "December 2022 backward trajectory",
    source: new ImageWMS({
        url: 'https://www.gis-geoserver.polimi.it/geoserver/wms',
        params: { 'LAYERS': 'gisgeoserver_13:202212'}
    }),
    visible: false
});

let LandCover_reclassified = new Image({
    title: "LandCover reclassified",
    source: new ImageWMS({
        url: 'https://www.gis-geoserver.polimi.it/geoserver/wms',
        params: { 'LAYERS': 'gisgeoserver_13:Bulgaria_LC_reclassified_2022'}
    }),
    visible: false
});

let Average_NO2_2022 = new Image({
    title: "Average NO2 2022",
    source: new ImageWMS({
        url: 'https://www.gis-geoserver.polimi.it/geoserver/wms',
        params: { 'LAYERS': 'gisgeoserver_13:Bulgaria_average_no2_2022'}
    }),
    visible: false
});

let Average_PM2p5_2022 = new Image({
    title: "Average PM2.5 2022",
    source: new ImageWMS({
        url: 'https://www.gis-geoserver.polimi.it/geoserver/wms',
        params: { 'LAYERS': 'gisgeoserver_13:Bulgaria_average_pm2p5_2022'}
    }),
    visible: false
});

let no = new Image({
    title: "NO2 2022-2017-2021 AAD",
    source: new ImageWMS({
        url: 'https://www.gis-geoserver.polimi.it/geoserver/wms',
        params: { 'LAYERS': 'gisgeoserver_13:Bulgaria_no2_2017-2021_AAD_map _2022'}
    }),
    visible: false
});

let NO2_concentration = new Image({
    title: "NO2 concentration",
    source: new ImageWMS({
        url: 'https://www.gis-geoserver.polimi.it/geoserver/wms',
        params: { 'LAYERS': 'gisgeoserver_13:Bulgaria_no2_concentration_map_2020'}
    }),
    visible: false
});

let PM2p5_2022_2017_2021_AAD = new Image({
    title: "PM2.5 2022-2017-2021 AAD",
    source: new ImageWMS({
        url: 'https://www.gis-geoserver.polimi.it/geoserver/wms',
        params: { 'LAYERS': 'gisgeoserver_13:Bulgaria_pm2p5_2017-2021_AAD_map_2022'}
    }),
    visible: false
});

let PM2p5_concentration = new Image({
    title: "PM2.5 concentration",
    source: new ImageWMS({
        url: 'https://www.gis-geoserver.polimi.it/geoserver/wms',
        params: { 'LAYERS': 'gisgeoserver_13:Bulgaria_pm2p5_concentration_map_2020'}
    }),
    visible: false
});

let NO2_bivariate = new Image({
    title: "NO2 bivariate",
    source: new ImageWMS({
        url: 'https://www.gis-geoserver.polimi.it/geoserver/wms',
        params: { 'LAYERS': 'gisgeoserver_13:a_zonal_statistics'}
    }),
    visible: false
});

let Angle_cluster_trajectory = new Image({
    title: "Angle cluster trajectory",
    source: new ImageWMS({
        url: 'https://www.gis-geoserver.polimi.it/geoserver/wms',
        params: { 'LAYERS': 'gisgeoserver_13:angle_cluster'}
    }),
    visible: false
});

let Administrative_subdivision = new Image({
    title: "Administrative subdivision",
    source: new ImageWMS({
        url: 'https://www.gis-geoserver.polimi.it/geoserver/wms',
        params: { 'LAYERS': 'gisgeoserver_13:bgr_gaul_l2__gaul_2024_l2'}
    }),
    visible: false
});

let PM2p5_bivariate = new Image({
    title: "PM2.5 bivariate",
    source: new ImageWMS({
        url: 'https://www.gis-geoserver.polimi.it/geoserver/wms',
        params: { 'LAYERS': 'gisgeoserver_13:pm2p5_bivariate'}
    }),
    visible: false
});

let Population_reclassification = new Image({
    title: "Population reclassification",
    source: new ImageWMS({
        url: 'https://www.gis-geoserver.polimi.it/geoserver/wms',
        params: { 'LAYERS': 'gisgeoserver_13:reclassify_bgr_ppp_2020'}
    }),
    visible: false
});

//Create the layer groups and add the layers to them
let basemapLayers = new Group({
    title: "Base Maps",
    layers: [osm]
})

let ResultLayers = new Group({
    title: "Results Layers",
    layers: [
        Angle_cluster_trajectory,December_2022_backward_trajectory,PM2p5_bivariate,NO2_bivariate
    ]
})

let FactorsLayers = new Group({
    title: "Factors Layers",
    layers: [
        PM2p5_2022_2017_2021_AAD, no, Average_PM2p5_2022, Average_NO2_2022, PM2p5_concentration, NO2_concentration,Population_reclassification,LandCover_reclassified, Administrative_subdivision,Study_area
    ]
})

// Map Initialization
let map = new Map({
    target: document.getElementById('map'),
    layers: [basemapLayers, ResultLayers,FactorsLayers],
    view: new View({
        center: fromLonLat([25.0, 42.7]),
        zoom: 8
    })
});

// Add the map controls:
map.addControl(new ScaleLine());
map.addControl(new FullScreen());
map.addControl(new MousePosition({
    coordinateFormat: createStringXY(4),
    projection: 'EPSG:4326',
    className: 'custom-control',
    placeholder: '0.0000, 0.0000'
}));

let layerSwitcher = new LayerSwitcher({});
map.addControl(layerSwitcher);

//OPTIONAL
//Add the Bing Maps layers
var BING_MAPS_KEY = "AqbDxABFot3cmpxfshRqLmg8UTuPv_bg69Ej3d5AkGmjaJy_w5eFSSbOzoHeN2_H";
var bingRoads = new Tile({
    title: 'Bing Maps—Roads',
    type: 'base',
    visible: false,
    source: new BingMaps({
        key: BING_MAPS_KEY,
        imagerySet: 'Road'
    })
});

var bingAerial = new Tile({
    title: 'Bing Maps—Aerial',
    type: 'base',
    visible: false,
    source: new BingMaps({
        key: BING_MAPS_KEY,
        imagerySet: 'Aerial'
    })
});
basemapLayers.getLayers().extend([bingRoads, bingAerial]);

