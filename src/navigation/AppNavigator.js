// App Navigator - Main navigation component
import React, { useState } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { useAuth } from '../context/AuthContext'
import { useOnboarding } from '../hooks/useOnboarding'
import AuthNavigator from './AuthNavigator'
import MainNavigator from './MainNavigator'
import OnboardingScreen from '../screens/onboarding/OnboardingScreen'
import { View, ActivityIndicator } from 'react-native'
import { Colors } from '../styles/colors'
import { GlobalStyles } from '../styles/globalStyles'

const AppNavigator = () => {
  const { user, loading: authLoading } = useAuth()
  const { isOnboardingCompleted, loading: onboardingLoading, refresh } = useOnboarding()
  const [showOnboarding, setShowOnboarding] = useState(false)

  // Check if onboarding should be shown
  React.useEffect(() => {
    if (!onboardingLoading) {
      setShowOnboarding(isOnboardingCompleted === false)
    }
  }, [isOnboardingCompleted, onboardingLoading])

  // Show loading while checking auth and onboarding status
  if (authLoading || onboardingLoading) {
    return (
      <View style={GlobalStyles.centerContainer}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    )
  }

  // Show onboarding screen if not completed
  if (showOnboarding) {
    return (
      <OnboardingScreen 
        onComplete={() => setShowOnboarding(false)}
      />
    )
  }

  return (
    <NavigationContainer>
      {user ? <MainNavigator /> : <AuthNavigator />}
    </NavigationContainer>
  )
}

export default AppNavigator
