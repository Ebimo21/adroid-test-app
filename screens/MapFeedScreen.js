import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Text,
  ActivityIndicator,
} from 'react-native';
import MapView, { Marker, Heatmap } from 'react-native-maps';
import * as Location from 'expo-location';
// import { useTheme } from '../context/ThemeContext';
// import { useTheme } from '../context/themeContext';
import { useTheme } from '@/context/ThemeContext';

const { width, height } = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

export default function MapFeedScreen({ navigation }) {
  const { theme } = useTheme();
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [vibeZones, setVibeZones] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        setLoading(false);
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
      setLoading(false);
      
      // TODO: Fetch vibe zones from backend
      // For now, we'll use dummy data
      setVibeZones([
        {
          id: 1,
          coordinate: {
            latitude: location.coords.latitude + 0.001,
            longitude: location.coords.longitude + 0.001,
          },
          vibeType: 'Lit',
          intensity: 0.8,
        },
        {
          id: 2,
          coordinate: {
            latitude: location.coords.latitude - 0.001,
            longitude: location.coords.longitude - 0.001,
          },
          vibeType: 'Chill',
          intensity: 0.5,
        },
      ]);
    })();
  }, []);

  const mapStyle = [
    {
      elementType: 'geometry',
      stylers: [
        {
          color: '#212121',
        },
      ],
    },
    {
      elementType: 'labels.text.fill',
      stylers: [
        {
          color: '#757575',
        },
      ],
    },
    {
      elementType: 'labels.text.stroke',
      stylers: [
        {
          color: '#212121',
        },
      ],
    },
    {
      featureType: 'water',
      elementType: 'geometry',
      stylers: [
        {
          color: '#000000',
        },
      ],
    },
  ];

  if (loading) {
    return (
      <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
        <ActivityIndicator size="large" color={theme.colors.primary} />
      </View>
    );
  }

  if (errorMsg) {
    return (
      <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
        <Text style={[styles.errorText, { color: theme.colors.error }]}>
          {errorMsg}
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {location && (
        <MapView
          style={styles.map}
          customMapStyle={mapStyle}
          initialRegion={{
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
            latitudeDelta: LATITUDE_DELTA,
            longitudeDelta: LONGITUDE_DELTA,
          }}
        >
          <Marker
            coordinate={{
              latitude: location.coords.latitude,
              longitude: location.coords.longitude,
            }}
            title="You"
            description="Your current location"
          />
          
          {vibeZones.map((zone) => (
            <Marker
              key={zone.id}
              coordinate={zone.coordinate}
              title={zone.vibeType}
              description={`Vibe intensity: ${zone.intensity * 100}%`}
            >
              <View
                style={[
                  styles.vibeMarker,
                  {
                    backgroundColor: theme.colors.primary,
                    opacity: zone.intensity,
                  },
                ]}
              />
            </Marker>
          ))}
        </MapView>
      )}

      <TouchableOpacity
        style={[styles.createButton, { backgroundColor: theme.colors.primary }]}
        onPress={() => navigation.navigate('CreateVibe')}
      >
        <Text style={styles.createButtonText}>Create Vibe</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  map: {
    width: '100%',
    height: '100%',
  },
  vibeMarker: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  createButton: {
    position: 'absolute',
    bottom: 30,
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 25,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  createButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  errorText: {
    fontSize: 16,
    textAlign: 'center',
    margin: 20,
  },
}); 