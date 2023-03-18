import React from "react";

import { View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { Text } from '@rneui/themed'
import { API_KEY } from '@env';

const MapDisplay = ( { navigation, route } ) => {
    const { address } = route.params;
    const [ latLng, setLatLng ] = React.useState ( { latitude: 0, longitude: 0 } );

    React.useEffect ( ( ) => {
        fetch ( `https://www.mapquestapi.com/geocoding/v1/address?key=${API_KEY}&location=${address}` )
            .then ( resp => resp.json ( ) )
            .then ( resp => {
                const { lat, lng } = resp.results [ 0 ].locations [ 0 ].displayLatLng;
                setLatLng ( { latitude: lat, longitude: lng } );
            } );
    }, [ ] );

    if ( latLng.latitude === 0 && latLng.longitude === 0 ) {
        return <View>
            <Text style={
                {
                    textAlignVertical: 'center',
                    textAlign: 'center'
                }
            }>Loading...</Text>
        </View>
    }
    return <View>
        <MapView
            style={
                { width: '100%', height: '100%' }
            }

            initialRegion={ 
                {
                    ...latLng,
                    latitudeDelta: 0.0322,
                    longitudeDelta: 0.0221
                }
            }

            region={ 
                {
                    ...latLng,
                    latitudeDelta: 0.0322,
                    longitudeDelta: 0.0221
                }
            }
        >
            <Marker
				coordinate={ latLng }
				title={ address }
			/>

        </MapView>
    </View>
};

export default MapDisplay;