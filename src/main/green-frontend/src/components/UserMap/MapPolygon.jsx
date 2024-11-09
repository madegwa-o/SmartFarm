import React, { useState, useCallback, useEffect } from 'react';
import { GoogleMap, LoadScript, Polygon, Marker } from '@react-google-maps/api';
import styles from './MapPolygon.module.css';

const center = {
    lat: -0.388548,
    lng: 37.143484,
};

const mapOptions = {
    mapTypeControl: true,
    streetViewControl: true,
    fullscreenControl: true,
    zoomControl: true,
    mapTypeId: "hybrid",  // Default to hybrid view with satellite and labels
    styles: null,          // Ensures default labels and POIs are shown
};

const MapPolygon = () => {
    const [polygonCoords, setPolygonCoords] = useState([]);
    const [markers, setMarkers] = useState([]);
    const [area, setArea] = useState(0);
    const [mapType, setMapType] = useState("satellite");  // State for map type

    // New state for spacing and productivity inputs
    const [rowSpacing, setRowSpacing] = useState(105);
    const [plantSpacing, setPlantSpacing] = useState(75);
    const [yieldPerTree, setYieldPerTree] = useState(1.55);
    const [productivity, setProductivity] = useState(0);
    const [totalTrees, setTotalTrees] = useState(0);

    const onMapClick = useCallback((e) => {
        const newPoint = { lat: e.latLng.lat(), lng: e.latLng.lng() };
        setPolygonCoords((currentCoords) => [...currentCoords, newPoint]);
        setMarkers((currentMarkers) => [...currentMarkers, newPoint]);
    }, []);

    useEffect(() => {
        if (polygonCoords.length > 2) {
            if (window.google && window.google.maps && window.google.maps.geometry) {
                const path = polygonCoords.map(({ lat, lng }) => new window.google.maps.LatLng(lat, lng));
                const calculatedArea = window.google.maps.geometry.spherical.computeArea(path);
                setArea(calculatedArea);
            }
        }
    }, [polygonCoords]);

    useEffect(() => {
        if (area > 0) {
            const rowSpacingMeters = rowSpacing / 100;
            const plantSpacingMeters = plantSpacing / 100;
            const treesPerRow = Math.floor(area / (rowSpacingMeters * plantSpacingMeters));
            const estimatedProductivity = treesPerRow * yieldPerTree;
            setTotalTrees(treesPerRow);
            setProductivity(estimatedProductivity);
        }
    }, [area, rowSpacing, plantSpacing, yieldPerTree]);

    const clearPolygon = () => {
        setPolygonCoords([]);
        setMarkers([]);
        setArea(0);
        setProductivity(0);
        setTotalTrees(0);
    };

    const toggleMapType = () => {
        setMapType((prevType) => (prevType === "roadmap" ? "satellite" : "roadmap"));
    };

    return (
        <div className={styles.container}>
            <LoadScript googleMapsApiKey={process.env.REACT_APP_GOOGLE_API_KEY} libraries={["geometry"]}>
                <GoogleMap
                    mapContainerClassName={styles.mapContainer}
                    center={center}
                    zoom={18}
                    mapTypeId={mapType}  // Set map type here
                    onClick={onMapClick}
                    options={mapOptions}
                >
                    {polygonCoords.length > 0 && (
                        <Polygon
                            paths={polygonCoords}
                            options={{
                                fillColor: '#FF0000',
                                fillOpacity: 0.35,
                                strokeColor: '#FF0000',
                                strokeOpacity: 0.8,
                                strokeWeight: 2,
                            }}
                        />
                    )}

                    {markers.map((marker, index) => (
                        <Marker key={index} position={marker} />
                    ))}
                </GoogleMap>
            </LoadScript>
            <div className={styles.farmDetails}>
                <button onClick={toggleMapType} className={styles.button}>
                    Toggle Satellite View
                </button>
                <button onClick={clearPolygon} className={styles.button}>
                    Clear Polygon
                </button>
                <p className={styles.areaDisplay}>
                    Area: {area > 0 ? `${area.toFixed(2)} square meters` : "Draw a polygon to calculate area"}
                </p>

                {/* Input fields for productivity calculation */}
                <div className={styles.inputs}>
                    <label>
                        Row Spacing (cm):
                        <input
                            type="number"
                            value={rowSpacing}
                            onChange={(e) => setRowSpacing(e.target.value)}
                        />
                    </label>
                    <label>
                        Plant Spacing (cm):
                        <input
                            type="number"
                            value={plantSpacing}
                            onChange={(e) => setPlantSpacing(e.target.value)}
                        />
                    </label>
                    <label>
                        Yield per Tree (kg):
                        <input
                            type="number"
                            value={yieldPerTree}
                            onChange={(e) => setYieldPerTree(e.target.value)}
                        />
                    </label>
                </div>

                <div className={styles.productivityDisplay}>
                    <p>Total Tea Trees: {totalTrees}</p>
                    <p>Estimated Productivity: {productivity.toFixed(2)} kg</p>
                </div>
            </div>
        </div>
    );
};

export default MapPolygon;
