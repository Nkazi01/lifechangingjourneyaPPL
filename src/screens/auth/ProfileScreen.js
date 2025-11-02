// Profile Screen
import React, { useState, useEffect } from 'react'
import { View, Text, ScrollView, Alert, TouchableOpacity } from 'react-native'
import { StatusBar } from 'expo-status-bar'
import { Ionicons } from '@expo/vector-icons'
import { useAuth } from '../../context/AuthContext'
import { useOnboarding } from '../../hooks/useOnboarding'
import CustomInput from '../../components/common/CustomInput'
import CustomButton from '../../components/common/CustomButton'
import { GlobalStyles } from '../../styles/globalStyles'
import { Colors } from '../../styles/colors'
import { Typography } from '../../styles/typography'

const ProfileScreen = ({ navigation }) => {
  const { user, getUserProfile, updateProfile, signOut } = useAuth()
  const { resetOnboarding } = useOnboarding()
  const [profile, setProfile] = useState({
    full_name: '',
    phone: '',
    date_of_birth: ''
  })
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    loadProfile()
  }, [])

  const loadProfile = async () => {
    try {
      const { data } = await getUserProfile()
      if (data) {
        setProfile({
          full_name: data.full_name || '',
          phone: data.phone || '',
          date_of_birth: data.date_of_birth || ''
        })
      }
    } catch (error) {
      // Handle error silently
    }
  }

  const handleUpdateProfile = async () => {
    setLoading(true)
    try {
      const { error } = await updateProfile(profile)
      
      if (error) {
        Alert.alert('Error', error.message)
      } else {
        Alert.alert('Success', 'Profile updated successfully')
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to update profile')
    } finally {
      setLoading(false)
    }
  }

  const handleSignOut = async () => {
    Alert.alert(
      'Sign Out',
      'Are you sure you want to sign out?',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Sign Out', 
          style: 'destructive',
          onPress: async () => {
            const { error } = await signOut()
            if (error) {
              Alert.alert('Error', 'Failed to sign out')
            }
          }
        }
      ]
    )
  }

  const handleShowOnboarding = async () => {
    Alert.alert(
      'View App Guide',
      'Would you like to view the app guide again?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Show Guide',
          onPress: async () => {
            const success = await resetOnboarding()
            if (success) {
              Alert.alert(
                'App Guide',
                'The app guide will appear shortly.',
                [{ text: 'OK' }]
              )
              // The AppNavigator will detect the change and show onboarding
            } else {
              Alert.alert('Error', 'Failed to reset app guide')
            }
          }
        }
      ]
    )
  }

  return (
    <ScrollView style={GlobalStyles.container}>
      <StatusBar style="dark" />
      
      <View style={GlobalStyles.paddingContainer}>
        {/* Profile Header */}
        <View style={[GlobalStyles.center, { marginVertical: 32 }]}>
          <View style={{
            width: 100,
            height: 100,
            borderRadius: 50,
            backgroundColor: Colors.primary,
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: 16,
          }}>
            <Ionicons name="person" size={50} color={Colors.white} />
          </View>
          <Text style={GlobalStyles.h2}>
            {profile.full_name || 'User'}
          </Text>
          <Text style={GlobalStyles.captionText}>
            {user?.email}
          </Text>
        </View>

        {/* Profile Form */}
        <CustomInput
          label="Full Name"
          placeholder="Enter your full name"
          value={profile.full_name}
          onChangeText={(value) => setProfile({...profile, full_name: value})}
        />

        <CustomInput
          label="Phone Number"
          placeholder="Enter your phone number"
          value={profile.phone}
          onChangeText={(value) => setProfile({...profile, phone: value})}
          keyboardType="phone-pad"
        />

        <CustomInput
          label="Date of Birth"
          placeholder="YYYY-MM-DD"
          value={profile.date_of_birth}
          onChangeText={(value) => setProfile({...profile, date_of_birth: value})}
        />

        <CustomButton
          title="Update Profile"
          onPress={handleUpdateProfile}
          loading={loading}
          style={{ marginTop: 24 }}
        />

        {/* App Settings Section */}
        <View style={{ marginTop: 32, marginBottom: 16 }}>
          <Text style={{
            ...Typography.textStyles.h6,
            color: Colors.textPrimary,
            marginBottom: 12,
          }}>
            App Settings
          </Text>
          
          <TouchableOpacity
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              padding: 16,
              backgroundColor: Colors.surface,
              borderRadius: 12,
              marginBottom: 12,
              borderWidth: 1,
              borderColor: Colors.lightGray,
            }}
            onPress={handleShowOnboarding}
            activeOpacity={0.7}
          >
            <Ionicons name="help-circle-outline" size={24} color={Colors.primary} style={{ marginRight: 12 }} />
            <View style={{ flex: 1 }}>
              <Text style={{
                ...Typography.textStyles.body,
                color: Colors.textPrimary,
                fontWeight: '500',
              }}>
                View App Guide
              </Text>
              <Text style={{
                ...Typography.textStyles.caption,
                color: Colors.textSecondary,
                marginTop: 4,
              }}>
                Learn how to use the app
              </Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color={Colors.textSecondary} />
          </TouchableOpacity>
        </View>

        <CustomButton
          title="Sign Out"
          onPress={handleSignOut}
          variant="danger"
          style={{ marginTop: 16 }}
        />
      </View>
    </ScrollView>
  )
}

export default ProfileScreen
