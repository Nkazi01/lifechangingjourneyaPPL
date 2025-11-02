import { useState, useEffect, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Constants } from '../utils/constants';

export const useOnboarding = () => {
  const [isOnboardingCompleted, setIsOnboardingCompleted] = useState(null);
  const [loading, setLoading] = useState(true);

  const checkOnboardingStatus = useCallback(async () => {
    try {
      const completed = await AsyncStorage.getItem(
        Constants.STORAGE_KEYS.ONBOARDING_COMPLETED
      );
      setIsOnboardingCompleted(completed === 'true');
    } catch (error) {
      console.error('Error checking onboarding status:', error);
      setIsOnboardingCompleted(false);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    checkOnboardingStatus();
  }, [checkOnboardingStatus]);

  const resetOnboarding = useCallback(async () => {
    try {
      await AsyncStorage.removeItem(Constants.STORAGE_KEYS.ONBOARDING_COMPLETED);
      setIsOnboardingCompleted(false);
      return true;
    } catch (error) {
      console.error('Error resetting onboarding:', error);
      return false;
    }
  }, []);

  return {
    isOnboardingCompleted,
    loading,
    resetOnboarding,
    refresh: checkOnboardingStatus,
  };
};

export default useOnboarding;

