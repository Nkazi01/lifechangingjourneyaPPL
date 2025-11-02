import React, { useState, useRef } from 'react';
import { 
  View, 
  Text, 
  ScrollView, 
  TouchableOpacity, 
  StyleSheet, 
  Dimensions,
  Animated,
  Image
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../../styles/colors';
import { Typography } from '../../styles/typography';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Constants } from '../../utils/constants';

const { width, height } = Dimensions.get('window');

const onboardingData = [
  {
    id: 1,
    title: 'Welcome to Life Changing Journey',
    description: 'Your gateway to psychology, spiritual growth, hypnotherapy, financial guidance, and integrated services focused on holistic transformation.',
    icon: 'heart',
    gradient: [Colors.primary, Colors.primaryLight],
  },
  {
    id: 2,
    title: 'Explore Our Services',
    description: 'Discover comprehensive wellness services including mental health support, spiritual interventions, financial solutions, and more. Tap on any service card to view detailed information.',
    icon: 'grid',
    gradient: [Colors.secondary, Colors.secondaryLight],
  },
  {
    id: 3,
    title: 'Interactive Service Cards',
    description: 'Tap on any service card to view detailed information, contact the provider, visit their website, or call them directly. Each service card is fully interactive!',
    icon: 'finger-print',
    gradient: [Colors.accent, Colors.accentLight],
  },
  {
    id: 4,
    title: 'Browse Resources',
    description: 'Access helpful guides, articles, videos, and resources to support your personal growth journey.',
    icon: 'library',
    gradient: [Colors.accentGreen, Colors.accentOlive],
  },
  {
    id: 5,
    title: 'Get In Touch',
    description: 'Contact our professionals directly, book appointments, or reach out for more information about our services.',
    icon: 'chatbubbles',
    gradient: [Colors.info, Colors.infoDark],
  },
];

const OnboardingScreen = ({ onComplete }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollViewRef = useRef(null);
  const fadeAnim = useRef(new Animated.Value(1)).current;

  const handleNext = () => {
    if (currentIndex < onboardingData.length - 1) {
      const nextIndex = currentIndex + 1;
      setCurrentIndex(nextIndex);
      scrollViewRef.current?.scrollTo({
        x: nextIndex * width,
        animated: true,
      });
      
      // Fade animation
      Animated.sequence([
        Animated.timing(fadeAnim, {
          toValue: 0.5,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      handleComplete();
    }
  };

  const handleSkip = () => {
    handleComplete();
  };

  const handleComplete = async () => {
    try {
      await AsyncStorage.setItem(
        Constants.STORAGE_KEYS.ONBOARDING_COMPLETED,
        'true'
      );
      onComplete();
    } catch (error) {
      console.error('Error saving onboarding status:', error);
      onComplete();
    }
  };

  const handleScroll = (event) => {
    const offsetX = event.nativeEvent.contentOffset.x;
    const index = Math.round(offsetX / width);
    if (index !== currentIndex) {
      setCurrentIndex(index);
    }
  };

  const Slide = ({ item, index }) => (
    <View style={styles.slide}>
      <LinearGradient
        colors={item.gradient}
        style={styles.gradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <View style={styles.iconContainer}>
          {item.id === 1 ? (
            <Image 
              source={require('../../../assets/icon.png')} 
              style={styles.appIcon}
              resizeMode="contain"
            />
          ) : (
            <Ionicons name={item.icon} size={80} color={Colors.white} />
          )}
        </View>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.description}>{item.description}</Text>
      </LinearGradient>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Skip Button */}
      <TouchableOpacity style={styles.skipButton} onPress={handleSkip}>
        <Text style={styles.skipText}>Skip</Text>
      </TouchableOpacity>

      {/* Slides */}
      <ScrollView
        ref={scrollViewRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
      >
        {onboardingData.map((item, index) => (
          <Slide key={item.id} item={item} index={index} />
        ))}
      </ScrollView>

      {/* Pagination Dots */}
      <View style={styles.pagination}>
        {onboardingData.map((_, index) => (
          <View
            key={index}
            style={[
              styles.dot,
              currentIndex === index && styles.activeDot,
            ]}
          />
        ))}
      </View>

      {/* Next/Get Started Button */}
      <Animated.View style={[styles.buttonContainer, { opacity: fadeAnim }]}>
        <TouchableOpacity
          style={styles.button}
          onPress={handleNext}
          activeOpacity={0.8}
        >
          <LinearGradient
            colors={onboardingData[currentIndex].gradient}
            style={styles.buttonGradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
          >
            <Text style={styles.buttonText}>
              {currentIndex === onboardingData.length - 1 ? 'Get Started' : 'Next'}
            </Text>
            <Ionicons 
              name={currentIndex === onboardingData.length - 1 ? 'checkmark' : 'arrow-forward'} 
              size={20} 
              color={Colors.white}
              style={{ marginLeft: 8 }}
            />
          </LinearGradient>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  skipButton: {
    position: 'absolute',
    top: 50,
    right: 20,
    zIndex: 10,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
  },
  skipText: {
    ...Typography.textStyles.bodySmall,
    color: Colors.white,
    fontWeight: '600',
  },
  slide: {
    width,
    height,
  },
  gradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  iconContainer: {
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 40,
  },
  appIcon: {
    width: 120,
    height: 120,
    borderRadius: 24,
  },
  title: {
    ...Typography.textStyles.h2,
    color: Colors.white,
    textAlign: 'center',
    marginBottom: 20,
    fontWeight: 'bold',
  },
  description: {
    ...Typography.textStyles.body,
    color: Colors.white,
    textAlign: 'center',
    opacity: 0.95,
    lineHeight: 24,
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.white,
    opacity: 0.4,
    marginHorizontal: 4,
  },
  activeDot: {
    width: 24,
    opacity: 1,
  },
  buttonContainer: {
    paddingHorizontal: 40,
    paddingBottom: 50,
  },
  button: {
    borderRadius: 30,
    overflow: 'hidden',
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  buttonGradient: {
    paddingVertical: 16,
    paddingHorizontal: 32,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    ...Typography.textStyles.button,
    color: Colors.white,
    fontSize: 18,
    fontWeight: '600',
  },
});

export default OnboardingScreen;

