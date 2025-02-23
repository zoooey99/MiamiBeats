import { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import * as Location from 'expo-location';
import { Ionicons } from '@expo/vector-icons';

export default function PermissionsScreen() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const requestLocationPermission = async () => {
    setLoading(true);
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status === 'granted') {
        router.replace('/(tabs)');
      } else {
        // Handle permission denied
        router.replace('/(tabs)');
      }
    } catch (error) {
      console.error('Error requesting location permission:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <Ionicons name="location" size={64} color="#6C63FF" />
      </View>
      
      <Text style={styles.title}>Enable Location</Text>
      
      <Text style={styles.description}>
        We use your location to generate culturally accurate music based on where you are in Miami.
      </Text>
      
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.button, styles.primaryButton]}
          onPress={requestLocationPermission}
          disabled={loading}
        >
          <Text style={styles.buttonText}>
            {loading ? 'Requesting Access...' : 'Allow Location Access'}
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={[styles.button, styles.secondaryButton]}
          onPress={() => router.replace('/(tabs)')}
        >
          <Text style={styles.secondaryButtonText}>
            Continue Without Location
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
  iconContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  title: {
    fontSize: 28,
    fontFamily: 'Inter-Bold',
    textAlign: 'center',
    marginBottom: 15,
    color: '#1E1E1E',
  },
  description: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    textAlign: 'center',
    marginBottom: 40,
    color: '#666',
    lineHeight: 24,
  },
  buttonContainer: {
    gap: 15,
  },
  button: {
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  primaryButton: {
    backgroundColor: '#6C63FF',
  },
  secondaryButton: {
    backgroundColor: '#F5F5F5',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontFamily: 'Inter-Bold',
  },
  secondaryButtonText: {
    color: '#666',
    fontSize: 18,
    fontFamily: 'Inter-Regular',
  },
});