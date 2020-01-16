import React, {  useState, useEffect } from 'react';

import MapView, {Marker} from 'react-native-maps';

export default function Map({styles, location, Icon}){
  
  var [stateLocation, defineStateLocation] = useState({
    latitude: -19.0123974,
    longitude: -57.6018038,
    latitudeDelta: 0.0121,
    longitudeDelta: 0.0121,
  })

  useEffect(()=>{
    if (location) {  
      location['latitudeDelta'] = 0.0121
      location['longitudeDelta'] = 0.0121
      defineStateLocation(location)
      console.log(stateLocation)
    }
  })

  return(
      <MapView
          style={styles.mapBox}
          region={{
            latitude: stateLocation.latitude,
            longitude: stateLocation.longitude,
            latitudeDelta: 0.0121,
            longitudeDelta: 0.0121
          }}
        >
          {location ? 
            (
              <Marker
                coordinate={location}
                title="AAAAAAAaaa"
              >
                <Icon name="bus" size={25} color="blue" />
              </Marker>
            )
            :
            (
              null
            )
          }
        </MapView>
  )
}