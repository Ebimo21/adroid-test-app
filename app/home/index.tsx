import React, { useEffect, useState } from 'react';
import { Button, StatusBar, StyleSheet, TextInput, View } from 'react-native';
import MapView, { Marker, Region } from 'react-native-maps';
import * as Location from 'expo-location'
import AnimatedMapRegion from 'react-native-maps/lib/AnimatedRegion';
// import { TextInput } from 'react-native-gesture-handler';

export default function Index() {
  const [ location, setLocation ] = useState<Location.LocationObject>( { timestamp: 0, coords: { altitude:0, accuracy: 0, altitudeAccuracy: 0, heading: 0, speed: 0,  latitude: 0, longitude: 1 }})
  const [ address, setAddress ] = useState<string>('');

  useEffect(()=>{
    const getPermissions = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if( status !== 'granted') {
        console.log('Please grant permission');
        return;
      }

      let currentLocation = await Location.getCurrentPositionAsync({})
      setLocation(currentLocation)
      // setInitialState(currentLocation)
      console.log('Location:')
      console.log(currentLocation)
      setInitialState( { latitude: currentLocation.coords.latitude, longitude: currentLocation.coords.longitude, latitudeDelta: 10, longitudeDelta:10})

      
    }

    getPermissions();

  }, [])

  interface geocodedLocationType {
    accuracy: number,
    altitude: number,
    longitude: number, 
    latitude: number

  }
  const geocode = async () => {
     const geocodedLocation = await Location.geocodeAsync(address);
     const { accuracy, longitude, latitude, altitude } = geocodedLocation[0] as geocodedLocationType
     console.log('Geocoded Addresses: ')
     console.log( location)
     console.log(geocodedLocation);
     setInitialState( { latitude, longitude, latitudeDelta: 0.01, longitudeDelta:0.01})

    //  setInitialState(geocodedLocation);
     setLocation( { timestamp: 0,  coords : {accuracy, altitude, altitudeAccuracy: 0, heading: 0, latitude, longitude,speed: 0   }})
    //  setLocation( { timestamp: 0,  coords : {accuracy, altitude, altitudeAccuracy: 0, heading: 0, latitude, longitude,speed: 0   }})

  }

  const reverseGeocode = async () => {
    const reverseGeocodeAddress = await Location.reverseGeocodeAsync( { 
      longitude: location.coords.longitude,
      // latitude: 6.498508,
      latitude: location.coords.latitude
      // longitude: 3.353275

    } )
    console.log('Reverse Geo Code')
    console.log(reverseGeocodeAddress)
  }

  const [ initialState, setInitialState ] = useState<Region>(
    // {
    //     latitude: 37.78825,      // example coords
    //     longitude: -122.4324,
    //     latitudeDelta: 20,   // zoom level
    //     longitudeDelta: 20,
    //   }
    // {"latitude": -2.230319482036042, "latitudeDelta": 121.07897942645761, "longitude": 4.571915448988202, "longitudeDelta": 127.5850196203973}
  );
  return (
    <View style={styles.container}>
      <TextInput placeholder='Address' value={address} onChangeText={setAddress} />
      <Button title='Geocode Address' onPress={geocode} />
      <Button title='Reverse GeoCode Current Location' onPress={reverseGeocode} />
      {/* <StatusBar style='auto' /> */}
      <MapView
        style={styles.map}
        showsUserLocation={true}
        followsUserLocation={true}
        region={initialState}
        // onRegionChange={ (region) => { setInitialState(region)} }
        // @ts-ignore
        // initialRegion={location}
        // initialRegion={{
        //   latitude: 37.78825,      // example coords
        //   longitude: -122.4324,
        //   latitudeDelta: 0.0922,   // zoom level
        //   longitudeDelta: 0.0421,
        // }}
      >
        {/* <Marker
          coordinate={{ latitude: 37.78825, longitude: -122.4324 }}
          title="My Marker"
          description="Some description here"
        /> */}
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
});
