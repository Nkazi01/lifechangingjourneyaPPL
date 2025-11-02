import React, { useEffect } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
  withSequence,
  withDelay,
  Easing,
  interpolate,
} from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors } from '../../styles/colors';

const { width } = Dimensions.get('window');

const HomeScreenLoadingAnimation = ({ message = 'Loading your journey...' }) => {
  // Main pulsing circle
  const scale1 = useSharedValue(1);
  const opacity1 = useSharedValue(0.3);
  
  // Secondary pulsing circles
  const scale2 = useSharedValue(1);
  const opacity2 = useSharedValue(0.2);
  const scale3 = useSharedValue(1);
  const opacity3 = useSharedValue(0.15);
  
  // Floating particles
  const particle1Y = useSharedValue(0);
  const particle2Y = useSharedValue(0);
  const particle3Y = useSharedValue(0);
  const particle4Y = useSharedValue(0);
  
  // Rotating elements
  const rotation = useSharedValue(0);
  const rotation2 = useSharedValue(0);

  useEffect(() => {
    // Main pulsing animation
    scale1.value = withRepeat(
      withSequence(
        withTiming(1.5, {
          duration: 2000,
          easing: Easing.inOut(Easing.ease),
        }),
        withTiming(1, {
          duration: 2000,
          easing: Easing.inOut(Easing.ease),
        }),
      ),
      -1,
      false,
    );

    opacity1.value = withRepeat(
      withSequence(
        withTiming(0.6, { duration: 2000 }),
        withTiming(0.3, { duration: 2000 }),
      ),
      -1,
      true,
    );

    // Secondary circles
    scale2.value = withRepeat(
      withSequence(
        withDelay(500, withTiming(1.3, { duration: 2000 })),
        withTiming(1, { duration: 2000 }),
      ),
      -1,
      false,
    );

    scale3.value = withRepeat(
      withSequence(
        withDelay(1000, withTiming(1.2, { duration: 2000 })),
        withTiming(1, { duration: 2000 }),
      ),
      -1,
      false,
    );

    opacity2.value = withRepeat(
      withSequence(
        withDelay(500, withTiming(0.4, { duration: 2000 })),
        withTiming(0.2, { duration: 2000 }),
      ),
      -1,
      true,
    );

    opacity3.value = withRepeat(
      withSequence(
        withDelay(1000, withTiming(0.3, { duration: 2000 })),
        withTiming(0.15, { duration: 2000 }),
      ),
      -1,
      true,
    );

    // Floating particles
    particle1Y.value = withRepeat(
      withSequence(
        withTiming(-20, { duration: 2000, easing: Easing.inOut(Easing.ease) }),
        withTiming(0, { duration: 2000, easing: Easing.inOut(Easing.ease) }),
      ),
      -1,
      false,
    );

    particle2Y.value = withRepeat(
      withSequence(
        withDelay(500, withTiming(-15, { duration: 1800 })),
        withTiming(0, { duration: 1800 }),
      ),
      -1,
      false,
    );

    particle3Y.value = withRepeat(
      withSequence(
        withDelay(1000, withTiming(-25, { duration: 2200 })),
        withTiming(0, { duration: 2200 }),
      ),
      -1,
      false,
    );

    particle4Y.value = withRepeat(
      withSequence(
        withDelay(1500, withTiming(-18, { duration: 1900 })),
        withTiming(0, { duration: 1900 }),
      ),
      -1,
      false,
    );

    // Rotating elements
    rotation.value = withRepeat(
      withTiming(360, {
        duration: 3000,
        easing: Easing.linear,
      }),
      -1,
      false,
    );

    rotation2.value = withRepeat(
      withTiming(-360, {
        duration: 4000,
        easing: Easing.linear,
      }),
      -1,
      false,
    );
  }, []);

  const animatedCircle1 = useAnimatedStyle(() => ({
    transform: [{ scale: scale1.value }],
    opacity: opacity1.value,
  }));

  const animatedCircle2 = useAnimatedStyle(() => ({
    transform: [{ scale: scale2.value }],
    opacity: opacity2.value,
  }));

  const animatedCircle3 = useAnimatedStyle(() => ({
    transform: [{ scale: scale3.value }],
    opacity: opacity3.value,
  }));

  const animatedParticle1 = useAnimatedStyle(() => ({
    transform: [{ translateY: particle1Y.value }],
    opacity: interpolate(particle1Y.value, [-20, 0], [0.8, 0.3]),
  }));

  const animatedParticle2 = useAnimatedStyle(() => ({
    transform: [{ translateY: particle2Y.value }],
    opacity: interpolate(particle2Y.value, [-15, 0], [0.7, 0.2]),
  }));

  const animatedParticle3 = useAnimatedStyle(() => ({
    transform: [{ translateY: particle3Y.value }],
    opacity: interpolate(particle3Y.value, [-25, 0], [0.9, 0.25]),
  }));

  const animatedParticle4 = useAnimatedStyle(() => ({
    transform: [{ translateY: particle4Y.value }],
    opacity: interpolate(particle4Y.value, [-18, 0], [0.75, 0.2]),
  }));

  const animatedRotation = useAnimatedStyle(() => ({
    transform: [{ rotate: `${rotation.value}deg` }],
  }));

  const animatedRotation2 = useAnimatedStyle(() => ({
    transform: [{ rotate: `${rotation2.value}deg` }],
  }));

  return (
    <View style={styles.container}>
      <View style={styles.animationContainer}>
        {/* Concentric pulsing circles */}
        <Animated.View style={[styles.circle, styles.circle1, animatedCircle1]}>
          <LinearGradient
            colors={[Colors.primary, Colors.primaryLight]}
            style={styles.gradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          />
        </Animated.View>

        <Animated.View style={[styles.circle, styles.circle2, animatedCircle2]}>
          <LinearGradient
            colors={[Colors.secondary, Colors.secondaryLight]}
            style={styles.gradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          />
        </Animated.View>

        <Animated.View style={[styles.circle, styles.circle3, animatedCircle3]}>
          <LinearGradient
            colors={[Colors.accent, Colors.accentLight]}
            style={styles.gradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          />
        </Animated.View>

        {/* Rotating ring */}
        <Animated.View style={[styles.ring, animatedRotation]}>
          <View style={styles.ringInner} />
        </Animated.View>

        {/* Floating particles */}
        <Animated.View style={[styles.particle, styles.particle1, animatedParticle1]} />
        <Animated.View style={[styles.particle, styles.particle2, animatedParticle2]} />
        <Animated.View style={[styles.particle, styles.particle3, animatedParticle3]} />
        <Animated.View style={[styles.particle, styles.particle4, animatedParticle4]} />

        {/* Counter-rotating element */}
        <Animated.View style={[styles.innerRotator, animatedRotation2]}>
          <View style={styles.innerDot} />
        </Animated.View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.background,
  },
  animationContainer: {
    width: 200,
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  circle: {
    position: 'absolute',
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  circle1: {
    width: 120,
    height: 120,
  },
  circle2: {
    width: 140,
    height: 140,
  },
  circle3: {
    width: 160,
    height: 160,
  },
  gradient: {
    width: '100%',
    height: '100%',
    borderRadius: 100,
  },
  ring: {
    width: 180,
    height: 180,
    borderRadius: 90,
    borderWidth: 3,
    borderColor: Colors.primary + '40',
    borderStyle: 'dashed',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
  },
  ringInner: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.secondary,
  },
  particle: {
    position: 'absolute',
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: Colors.accent,
  },
  particle1: {
    top: 20,
    left: 40,
  },
  particle2: {
    top: 60,
    right: 30,
  },
  particle3: {
    bottom: 40,
    left: 50,
  },
  particle4: {
    bottom: 20,
    right: 40,
  },
  innerRotator: {
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
  },
  innerDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: Colors.primary,
  },
});

export default HomeScreenLoadingAnimation;

