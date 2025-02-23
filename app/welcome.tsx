import { View, Text, StyleSheet, ImageBackground, TouchableOpacity, Modal } from 'react-native';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';

export default function WelcomeScreen() {
  const router = useRouter();
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <ImageBackground
      source={{ uri: 'https://images.unsplash.com/photo-1535498730771-e735b5ae9447?auto=format&fit=crop&q=80' }}
      style={styles.container}
    >
      <LinearGradient
        colors={['rgba(0,0,0,0.1)', 'rgba(0,0,0,0.8)']}
        style={styles.gradient}
      >
        <View style={styles.content}>
          <Text style={styles.title}>CultureBeats</Text>
          <Text style={styles.tagline}>Discover Miami's Music,{'\n'}One Neighborhood at a Time</Text>
          
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.primaryButton}
              onPress={() => router.push('/permissions')}
            >
              <Text style={styles.primaryButtonText}>Get Started</Text>
            </TouchableOpacity>
            
            <TouchableOpacity
              style={styles.secondaryButton}
              onPress={() => setModalVisible(true)}
            >
              <Text style={styles.secondaryButtonText}>Learn More</Text>
            </TouchableOpacity>
          </View>
        </View>

        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
        >
          <BlurView intensity={90} style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Cultural Preservation</Text>
              <Text style={styles.modalText}>
                CultureBeats is dedicated to preserving and celebrating Miami's rich musical heritage. 
                Our app helps you discover the unique sounds that emerge from the city's diverse neighborhoods, 
                from the Cuban rhythms of Little Havana to the Caribbean beats of Little Haiti.
              </Text>
              <TouchableOpacity
                style={styles.closeButton}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.closeButtonText}>Close</Text>
              </TouchableOpacity>
            </View>
          </BlurView>
        </Modal>
      </LinearGradient>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradient: {
    flex: 1,
    justifyContent: 'flex-end',
    padding: 20,
  },
  content: {
    marginBottom: 60,
  },
  title: {
    fontSize: 42,
    fontFamily: 'Inter-Bold',
    color: '#fff',
    marginBottom: 10,
  },
  tagline: {
    fontSize: 24,
    fontFamily: 'Inter-Regular',
    color: '#fff',
    marginBottom: 40,
    lineHeight: 32,
  },
  buttonContainer: {
    gap: 15,
  },
  primaryButton: {
    backgroundColor: '#6C63FF',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  primaryButtonText: {
    color: '#fff',
    fontSize: 18,
    fontFamily: 'Inter-Bold',
  },
  secondaryButton: {
    borderColor: '#fff',
    borderWidth: 1,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  secondaryButtonText: {
    color: '#fff',
    fontSize: 18,
    fontFamily: 'Inter-Regular',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: 'rgba(255,255,255,0.95)',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    padding: 20,
    paddingBottom: 40,
  },
  modalTitle: {
    fontSize: 24,
    fontFamily: 'Inter-Bold',
    marginBottom: 15,
    color: '#1E1E1E',
  },
  modalText: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    lineHeight: 24,
    color: '#333',
    marginBottom: 20,
  },
  closeButton: {
    alignItems: 'center',
    paddingVertical: 12,
    backgroundColor: '#6C63FF',
    borderRadius: 12,
  },
  closeButtonText: {
    color: '#fff',
    fontSize: 16,
    fontFamily: 'Inter-Bold',
  },
});