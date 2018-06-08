import React from 'react';
import { compose, withProps } from 'recompose';
import {
    withScriptjs,
    withGoogleMap,
    GoogleMap,
    Marker
} from 'react-google-maps';


const GoogleMaps = compose(
    withProps({
    /**
     * Note: create and replace your own key in the Google console.
     * https://console.developers.google.com/apis/dashboard
     * The key "AIzaSyBkNaAGLEVq0YLQMi-PYEMabFeREadYe1Q" can be ONLY used in this sandbox (no forked).
     */
        googleMapURL:
    'https://maps.googleapis.com/maps/api/js?key=AIzaSyBgqAomc9Vukt12AV3tJLasBnNehSNKuOY&v=3.exp&libraries=geometry,drawing,places',
        loadingElement: <div style={{ height: '100%' }} />,
        containerElement: <div style={{ height: '400px' }} />,
        mapElement: <div style={{ height: '100%' }} />
    }),
    withScriptjs,
    withGoogleMap
)(() => {
    return (
        <GoogleMap defaultZoom={8} defaultCenter={{ lat: -34.397, lng: 150.644 }}>
            <Marker position={{ lat: -34.397, lng: 150.644 }} />
        </GoogleMap>
    );
});


export default GoogleMaps;
