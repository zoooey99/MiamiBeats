import { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { BlurView } from 'expo-blur';
import { Ionicons } from '@expo/vector-icons';

const MIAMI_REGION = {
  latitude: 25.7617,
  longitude: -80.1918,
  latitudeDelta: 0.0922,
  longitudeDelta: 0.0421,
};

const NEIGHBORHOODS = [
  {
    id: '1',
    name: 'Little Havana',
    coordinate: { latitude: 25.7656, longitude: -80.2197 },
    culture: 'Cuban',
    genre: 'Son Cubano',
  },
  {
    id: '2',
    name: 'Little Haiti',
    coordinate: { latitude: 25.8277, longitude: -80.1947 },
    culture: 'Haitian',
    genre: 'Kompa',
  },
];

export default function MapScreen() {
  const [selectedArea, setSelectedArea] = useState(NEIGHBORHOODS[0]);
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={MIAMI_REGION}
        customMapStyle={mapStyle}
      >
        {NEIGHBORHOODS.map((neighborhood) => (
          <Marker
            key={neighborhood.id}
            coordinate={neighborhood.coordinate}
            onPress={() => setSelectedArea(neighborhood)}
          />
        ))}
      </MapView>

      <BlurView intensity={90} style={styles.infoCard}>
        <View style={styles.infoHeader}>
          <Text style={styles.neighborhoodName}>{selectedArea.name}</Text>
          <Text style={styles.culturalInfluence}>{selectedArea.culture} Influence</Text>
        </View>

        <View style={styles.musicPlayer}>
          <View style={styles.trackInfo}>
            <Text style={styles.trackTitle}>AI Generated {selectedArea.genre}</Text>
            <Text style={styles.trackArtist}>CultureBeats AI</Text>
          </View>

          <View style={styles.controls}>
            <TouchableOpacity
              style={styles.playButton}
              onPress={() => setIsPlaying(!isPlaying)}
            >
              <Ionicons
                name={isPlaying ? 'pause' : 'play'}
                size={24}
                color="#fff"
              />
            </TouchableOpacity>
          </View>
        </View>
      </BlurView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1E1E1E',
  },
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  infoCard: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(30,30,30,0.7)',
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  infoHeader: {
    marginBottom: 20,
  },
  neighborhoodName: {
    fontSize: 24,
    fontFamily: 'Inter-Bold',
    color: '#fff',
    marginBottom: 5,
  },
  culturalInfluence: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#ccc',
  },
  musicPlayer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  trackInfo: {
    flex: 1,
  },
  trackTitle: {
    fontSize: 18,
    fontFamily: 'Inter-Bold',
    color: '#fff',
    marginBottom: 5,
  },
  trackArtist: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#ccc',
  },
  controls: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  playButton: {
    width: 50,
    height: 50,
    backgroundColor: '#6C63FF',
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const mapStyle = [
  {
    elementType: 'geometry',
    stylers: [{ color: '#242f3e' }],
  },
  {
    elementType: 'labels.text.fill',
    stylers: [{ color: '#746855' }],
  },
  {
    elementType: 'labels.text.stroke',
    stylers: [{ color: '#242f3e' }],
  },
  {
    featureType: 'water',
    elementType: 'geometry',
    stylers: [{ color: '#17263c' }],
  },
];