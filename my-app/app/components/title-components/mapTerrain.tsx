"use client";

import Map, { Source, Layer, NavigationControl } from "react-map-gl/maplibre";
import "maplibre-gl/dist/maplibre-gl.css";
import GeoJSON from "geojson";

const mapStyle = {
  version: 8,
  light: {
    anchor: "viewport",
    color: "#ffffff",
    intensity: 0.8,
    position: [1.5, 90, 40],
  },
  glyphs: "https://demotiles.maplibre.org/font/{fontstack}/{range}.pbf",
  sources: {
    "esri-satellite": {
      type: "raster",
      tiles: [
        "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
      ],
      tileSize: 256,
      attribution: "Esri",
    },
  },
  layers: [
    {
      id: "satellite-layer",
      type: "raster",
      source: "esri-satellite",
    },
  ],
};

const debugCubeGeoJSON: GeoJSON.FeatureCollection = {
  type: "FeatureCollection",
  features: [
    {
      type: "Feature",
      properties: {
        height: 50,
      },
      geometry: {
        type: "Polygon",
        coordinates: [
          [
            [-73.6791, 42.7291],
            [-73.6781, 42.7291],
            [-73.6781, 42.7298],
            [-73.6791, 42.7298],
            [-73.6791, 42.7291],
          ],
        ],
      },
    },
  ],
};

export default function LimitFreeAerialMap() {
  return (
    <div className="w-full h-screen">
      <Map
        initialViewState={{
          longitude: -73.6786389,
          latitude: 42.7295416,
          zoom: 16,
          pitch: 60,
          bearing: 140,
        }}
        maxPitch={85}
        style={{ width: "100%", height: "100%" }}
        mapStyle={mapStyle as any}
      >
        <Source id="debug-cube-src" type="geojson" data={debugCubeGeoJSON}>
          <Layer
            id="debug-cube-layer"
            type="fill-extrusion"
            paint={{
              "fill-extrusion-color": "#ff0055",
              "fill-extrusion-height": 50,
              "fill-extrusion-base": 0,
              "fill-extrusion-opacity": 0.9,
            }}
          />
        </Source>
        <NavigationControl position="top-right" />
      </Map>
    </div>
  );
}