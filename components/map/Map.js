import { MapContainer, TileLayer, Marker, Popup, useMapEvents, Circle, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import "leaflet-defaulticon-compatibility";
import { useEffect, useState } from 'react';


export default function Map(props) {
    const location = props.location;
    const setLocation = props.setLocation;
    const setPendingPageState = props.setPageState;
    const [position, setPosition] = useState(location);

    function LocationMarker() {
        const map = useMapEvents({
            move() {
                const center = map.getCenter();
                setPosition(center);
            },
        })

        return position === null ? null : (
            <Marker position={position}>
                <Popup>{JSON.stringify(position)}</Popup>
            </Marker>
        )
    }

    const CurrentLocation = () => {
        const map = useMap();
        const handleChange = e => {
            map.locate();
            map.on('locationfound', e => {
                console.log(e.latlng);
                // map.flyTo(e.latlng, map.getZoom());
            });
            map.on('locationerror', e => {
                alert('error');
            });
        }
        return (
            <div className={props.locateStyle} onClick={handleChange} >
                <svg id="bx-current-location" xmlns="http://www.w3.org/2000/svg" width="26.111" height="26.111" viewBox="0 0 26.111 26.111">
                    <path id="Path_444" data-name="Path 444" d="M22.444,17.222A5.222,5.222,0,1,1,17.222,12,5.222,5.222,0,0,1,22.444,17.222Z" transform="translate(-4.167 -4.167)" />
                    <path id="Path_445" data-name="Path 445" d="M17.361,5.7V3H14.75V5.7A10.458,10.458,0,0,0,5.7,14.75H3v2.611H5.7A10.455,10.455,0,0,0,14.75,26.41v2.7h2.611v-2.7a10.454,10.454,0,0,0,9.049-9.049h2.7V14.75h-2.7A10.455,10.455,0,0,0,17.361,5.7ZM16.056,23.889a7.833,7.833,0,1,1,7.833-7.833A7.842,7.842,0,0,1,16.056,23.889Z" transform="translate(-3 -3)" />
                </svg>
            </div>
        );
    }
    function submitHandler(e) {
        e.preventDefault();
        setLocation(position);
        setPendingPageState('setInfo');
    }
    return (
        <MapContainer
            center={position}
            zoom={14}
            style={{ height: "100%", width: "100%" }} >
            <TileLayer
                url={`https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1IjoiYW1pcjNkaWdoIiwiYSI6ImNrem9ocXBhejBqaHIyeHFzc2lna3FyZWMifQ.jIbbftTazBt6mE2Ws1AzAg`}
                attribution='Map data &copy; <a href=&quot;https://www.openstreetmap.org/&quot;>OpenStreetMap</a> contributors, <a href=&quot;https://creativecommons.org/licenses/by-sa/2.0/&quot;>CC-BY-SA</a>, Imagery &copy; <a href=&quot;https://www.mapbox.com/&quot;>Mapbox</a>'
            />
            <LocationMarker />
            <CurrentLocation />
            <button onClick={submitHandler} className={props.submitStyle}>ثبت موقعیت مکانی مشخص شده</button>
        </MapContainer>
    );
}