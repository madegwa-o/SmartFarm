import React, { useState, useCallback, useEffect } from 'react';
import { GoogleMap, LoadScript, Polygon, Marker } from '@react-google-maps/api';

const containerStyle = {
    width: '100%',
    height: '500px',
};

const center = {
    lat: -0.388548,
    lng: 37.143484,
};

const MapPolygon = ({ onAreaCalculated }) => {
    const [polygonCoords, setPolygonCoords] = useState([]);
    const [markers, setMarkers] = useState([]);
    const [area, setArea] = useState(0);

    const onMapClick = useCallback((e) => {
        const newPoint = { lat: e.latLng.lat(), lng: e.latLng.lng() };
        setPolygonCoords((currentCoords) => [...currentCoords, newPoint]);
        setMarkers((currentMarkers) => [...currentMarkers, newPoint]);
    }, []);

    useEffect(() => {
        if (polygonCoords.length > 2) {
            // Ensure that Google Maps library is loaded
            if (window.google && window.google.maps && window.google.maps.geometry) {
                const path = polygonCoords.map(({ lat, lng }) => new window.google.maps.LatLng(lat, lng));
                const calculatedArea = window.google.maps.geometry.spherical.computeArea(path); // in square meters
                setArea(calculatedArea);
                onAreaCalculated(calculatedArea); // Pass area back to the Dashboard
            }
        }
    }, [polygonCoords, onAreaCalculated]);

    const clearPolygon = () => {
        setPolygonCoords([]);
        setMarkers([]);
        setArea(0);
        onAreaCalculated(0); // Reset area in the Dashboard
    };

    return (
        <div>
            <h1>Draw a Polygon on Google Maps</h1>
            <LoadScript googleMapsApiKey={import.meta.env.VITE_GOOGLE_API_KEY} libraries={["geometry"]}>
                <GoogleMap
                    mapContainerStyle={containerStyle}
                    center={center}
                    zoom={18}
                    onClick={onMapClick}
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
            <button onClick={clearPolygon} style={buttonStyle}>
                Clear Polygon
            </button>
            <p>Area: {area > 0 ? `${area.toFixed(2)} square meters` : "Draw a polygon to calculate area"}</p>
        </div>
    );
};

const buttonStyle = {
    padding: '10px 20px',
    fontSize: '16px',
    cursor: 'pointer',
    backgroundColor: '#007BFF',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    marginTop: '10px',
};

export default MapPolygon;
