import React from 'react'
import { Map as LeafletMap, TileLayer } from "react-leaflet"
import './Map.css'
import { showDataOnMap } from './util'

function Map({ countries, casesType, center, zoom }) {
    return (
        <div className="map">
            <LeafletMap center={center} zoom={zoom}>
                <TileLayer
                    attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />

                {/* Loop through table for cases and draw circles */}
                {showDataOnMap(countries, casesType)}


            </LeafletMap>
        </div>
    )
}

export default Map
