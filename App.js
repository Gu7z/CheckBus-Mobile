import React, {  useState, useEffect } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  PermissionsAndroid,
  Alert,
  Button,
  BackHandler
} from 'react-native';

import MapView, {Marker} from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation'
import Icon from 'react-native-vector-icons/FontAwesome';

function App(){

  const [locationEnabled, setLocationEnabled] = useState(false)
  const [watchID, setWatchID] = useState(null) 
  const [location, setLocation] = useState(null)

  useEffect(
    () =>{
      PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION).then(
        response => {
          if (response) {
            console.log("Permitido")
            setLocationEnabled(true)
          }else{
            console.log("Sem permissaso ate aqui")
            getLocationPermission()
          }
        }
      )
    }, []
  )

  const startWatch = () => {
    const myWatchId = Geolocation.watchPosition((location)=>{
      setLocation({ 
        latitude: location.coords.latitude,
        longitude: location.coords.longitude
      })
    }, (err)=>{
      console.log(err)
    }, {
      enableHighAccuracy: true,
      distanceFilter: 1,
      maximumAge: 0,
    });
    setWatchID(myWatchId)
  }

  const stopWatch = () => {
    Geolocation.clearWatch(watchID)
    Geolocation.stopObserving();
    setLocation(null)
  }

  const getLocationPermission = async () => {
    const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION)
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      setLocationEnabled(true)
    } else {
      Alert.alert(
        'Para usar o aplicativo, precisamos da sua localizacao',
        'Por favor ative nas configs do seu celualar',
        [
          {text: 'Ok, entendi', onPress: ()=>{BackHandler.exitApp()}}
        ]
      )
      
    }
  }

  return (
    <>
        <View style = {{display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}} >
          <View style={{minWidth: 150, margin: 10}}>
            <Button title="Ativar" onPress={startWatch} />
          </View>
          <View style={{minWidth: 150, margin: 10}}>
            <Button title="Desativar" onPress={stopWatch} />
          </View>
        </View>

        <View style={styles.container} >
          <MapView
            style={styles.map}
            initialRegion={{
              latitude: -19.0123974,
              longitude: -57.6018038,
              latitudeDelta: 0.0121,
              longitudeDelta: 0.0121,
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
        </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  map: {
    flex:1
  },
});

export default App;
