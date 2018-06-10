import React from 'react';
import _ from 'lodash';
import { compose, withProps, lifecycle } from 'recompose';
import {
    withScriptjs,
    withGoogleMap,
    GoogleMap,
    Marker,
} from 'react-google-maps';
import { SearchBox } from 'react-google-maps/lib/components/places/SearchBox';


const GoogleMapSearchBox = compose(
    withProps({
        googleMapURL: 'https://maps.googleapis.com/maps/api/js?key=AIzaSyBgqAomc9Vukt12AV3tJLasBnNehSNKuOY&v=3.exp&libraries=geometry,drawing,places',
        loadingElement: <div style={{ height: '100%' }} />,
        containerElement: <div style={{ height: '400px' }} />,
        mapElement: <div style={{ height: '100%' }} />,
    }),
    lifecycle({
        componentWillMount() {
            const refs = {};
            const lat = this.props.lat ? this.props.lat : 41.9;
            const lng = this.props.lng ? this.props.lng : -87.624;

            this.setState({
                bounds: null,
                center: {
                    lat,
                    lng,
                },
                markers: [{
                    position: { lat, lng },
                }],
                onMapMounted: (ref) => {
                    refs.map = ref;
                },
                onBoundsChanged: () => {
                    this.setState({
                        bounds: refs.map.getBounds(),
                        center: refs.map.getCenter(),
                    });
                },
                onSearchBoxMounted: (ref) => {
                    refs.searchBox = ref;
                },
                onPlacesChanged: () => {
                    const places = refs.searchBox.getPlaces();
                    const bounds = new google.maps.LatLngBounds();

                    places.forEach((place) => {
                        if (place.geometry.viewport) {
                            bounds.union(place.geometry.viewport);
                        } else {
                            bounds.extend(place.geometry.location);
                        }
                    });
                    const nextMarkers = places.map((place) => {
                        return {
                            position: place.geometry.location,
                        }
                        ;
                    });
                    const nextCenter = _.get(nextMarkers, '0.position', this.state.center);

                    this.setState({
                        center: nextCenter,
                        markers: nextMarkers,
                    });
                    // refs.map.fitBounds(bounds);
                },
            });
        },
    }),
    withScriptjs,
    withGoogleMap
)((props) => {
    const center = String(props.center).replace(/\(|\)|\s/g, '').split(',');
    const lat = center[0];
    const lng = center[1];

    return (
        <div>
            <GoogleMap ref={props.onMapMounted}
                defaultZoom={17}
                center={props.center}
                onBoundsChanged={props.onBoundsChanged}
            >
                <SearchBox ref={props.onSearchBoxMounted}
                    bounds={props.bounds}
                    controlPosition={google.maps.ControlPosition.TOP_LEFT}
                    onPlacesChanged={props.onPlacesChanged}
                >
                    <input type="text"
                        className="searchBox"
                        placeholder={props.location ? props.location : 'Enter your location'}
                        disabled={props.disabled ? props.disabled : undefined}
                        style={{
                            boxSizing: 'border-box',
                            border: '1px solid transparent',
                            width: '240px',
                            height: '32px',
                            marginTop: '27px',
                            padding: '0 12px',
                            borderRadius: '3px',
                            boxShadow: '0 2px 6px rgba(0, 0, 0, 0.3)',
                            fontSize: '14px',
                            outline: 'none',
                            textOverflow: 'ellipses',
                        }}
                    />
                </SearchBox>
                {props.markers.map((marker, index) => { return <Marker key={index} position={marker.position} />; }
                )}
            </GoogleMap>
            <input type="hidden" className="lat" value={lat} />
            <input type="hidden" className="lng" value={lng} />
        </div>
    );
});


export default GoogleMapSearchBox;
