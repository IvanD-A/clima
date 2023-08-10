import React, { useState } from "react";

import {MapContainer, TileLayer, Marker, useMapEvent, useMapEvents} from 'react-leaflet'
import {Icon, marker} from "leaflet";
import 'leaflet/dist/leaflet.css'

const MapView = ({coordenadas,setCoordenadas}) => {
    const Eventos  = () => {useMapEvents({
        click(e){
            console.log(e.latlng.lat);
            console.log(e.latlng.lng);
            setCoordenadas([e.latlng.lat,e.latlng.lng])
        }
        })
        return false
    }
    const icon = new Icon({
        iconUrl: "https://img.icons8.com/?size=512&id=uzeKRJIGwbBY&format=png",
        iconSize: [38,38]
    })

    return <MapContainer center={{lat: '-17.3895', lng: '-66.1568'}} zoom={13}>
        <TileLayer 
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" 
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <Marker position={coordenadas} icon={icon}></Marker>
        <Eventos/>
    </MapContainer>
}
export default MapView