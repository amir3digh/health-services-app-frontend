import { MapContainer, TileLayer, Marker, Popup, useMapEvents, } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import "leaflet-defaulticon-compatibility";
import { useState } from 'react'


export default function Map(props) {
    const position = props.position;
    const setLocation = props.setLocation;

    function LocationMarker() {
        const map = useMapEvents({
            move() {
                const center = map.getCenter();
            },
        })

        return position === null ? null : (
            <Marker position={position}>
                <Popup>موقعیت مکانی شما</Popup>
            </Marker>
        )
    }

    return (
        <MapContainer
            center={[35.6892, 51.3890]}
            zoom={14}
            scrollWheelZoom={false}
            style={{ height: "100%", width: "100%" }}
        >
            <TileLayer
                url={`https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1IjoiYW1pcjNkaWdoIiwiYSI6ImNrem9ocXBhejBqaHIyeHFzc2lna3FyZWMifQ.jIbbftTazBt6mE2Ws1AzAg`}
                attribution='Map data &copy; <a href=&quot;https://www.openstreetmap.org/&quot;>OpenStreetMap</a> contributors, <a href=&quot;https://creativecommons.org/licenses/by-sa/2.0/&quot;>CC-BY-SA</a>, Imagery &copy; <a href=&quot;https://www.mapbox.com/&quot;>Mapbox</a>'
            />
            <LocationMarker />
        </MapContainer>
    );
}