import React, { useEffect, useRef } from 'react';
import { View } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withRepeat,
  withSequence,
  withTiming,
  Easing,
  interpolate,
} from 'react-native-reanimated';
import ServiceAnimation from './ServiceAnimation';

const ServiceCardAnimation = ({ 
  service, 
  children, 
  delay = 0,
  animationType = 'fadeInUp',
}) => {
  const translateY = useSharedValue(50);
  const translateX = useSharedValue(0);
  const opacity = useSharedValue(0);
  const scale = useSharedValue(0.9);
  const rotation = useSharedValue(0);

  useEffect(() => {
    // Determine animation based on service category
    const categoryAnimation = {
      'mental_wellness': 'fadeInUp',
      'spiritual_growth': 'fadeInScale',
      'financial_guidance': 'slideInRight',
      'hypnotherapy': 'fadeInRotate',
      'consulting': 'fadeInUp',
      'education': 'fadeInScale',
    };

    const animType = categoryAnimation[service?.category] || animationType;

    const startAnimation = () => {
      switch (animType) {
        case 'fadeInUp':
          translateY.value = withTiming(0, {
            duration: 600,
            easing: Easing.out(Easing.cubic),
          });
          opacity.value = withTiming(1, {
            duration: 600,
            easing: Easing.out(Easing.ease),
          });
          scale.value = withSpring(1, {
            damping: 15,
            stiffness: 150,
          });
          break;

        case 'fadeInScale':
          scale.value = withSpring(1, {
            damping: 12,
            stiffness: 200,
          });
          opacity.value = withTiming(1, {
            duration: 500,
            easing: Easing.out(Easing.ease),
          });
          break;

        case 'slideInRight':
          translateX.value = withSpring(0, {
            damping: 15,
            stiffness: 150,
          });
          opacity.value = withTiming(1, {
            duration: 600,
            easing: Easing.out(Easing.ease),
          });
          scale.value = withSpring(1, {
            damping: 15,
            stiffness: 150,
          });
          break;

        case 'fadeInRotate':
          rotation.value = withSpring(0, {
            damping: 15,
            stiffness: 150,
          });
          opacity.value = withTiming(1, {
            duration: 600,
            easing: Easing.out(Easing.ease),
          });
          scale.value = withSpring(1, {
            damping: 15,
            stiffness: 150,
          });
          break;

        default:
          opacity.value = withTiming(1, { duration: 400 });
          scale.value = withSpring(1);
      }
    };

    // Apply delay if specified
    if (delay > 0) {
      setTimeout(startAnimation, delay);
    } else {
      startAnimation();
    }
  }, [delay, animationType, service?.category]);

  // Subtle continuous animation for card hover effect
  useEffect(() => {
    const hoverAnimation = () => {
      translateY.value = withRepeat(
        withSequence(
          withTiming(-3, {
            duration: 2000,
            easing: Easing.inOut(Easing.ease),
          }),
          withTiming(0, {
            duration: 2000,
            easing: Easing.inOut(Easing.ease),
          }),
        ),
        -1,
        false,
      );
    };

    // Start hover animation after initial entrance
    const hoverDelay = delay + 600;
    setTimeout(hoverAnimation, hoverDelay);
  }, [delay]);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
      transform: [
        { translateY: translateY.value },
        { translateX: translateX.value },
        { scale: scale.value },
        { rotate: `${rotation.value}deg` },
      ],
    };
  });

  return (
    <Animated.View style={animatedStyle}>
      {children}
    </Animated.View>
  );
};

export default ServiceCardAnimation;

