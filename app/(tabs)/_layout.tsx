// app/(tabs)/_layout.tsx
import { Ionicons } from '@expo/vector-icons'; // Example icon library
import { Tabs, router } from 'expo-router';
import React, { useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';


export default function TabLayout() {
  const { session, loading } = useAuth();
  useEffect(() => {
    if (loading) {
      return; // Wait until the session is loaded
    }

    if (!session) {
      // If session becomes null (after logout),
      // force redirect to the login screen.
      router.replace('/(auth)/login');
    }
  }, [session, loading]); // Re-run this check every time the session changes

  // 4. Don't show the tabs if we are loading or logging out.
  // This prevents a "flash" of the app.
  if (loading || !session) {
    return null; // Or a loading spinner
  }


  return (
    <Tabs
      screenOptions={{
        tabBarStyle: { 
            backgroundColor: '#272640', 
            borderTopWidth: 1,
            borderTopColor: 'black',
            elevation: 0
        }, // Primary color for tab bar
        tabBarActiveTintColor: 'white',
        tabBarInactiveTintColor: 'gray',
        headerShown: false, // Hides the header on all tab screens
        headerStyle:{
            backgroundColor: '#272640', 
        },
        headerTintColor: 'white'
      }}
    >
      
      <Tabs.Screen
        name="index" // This matches app/(tabs)/index.tsx
        options={{
          title: 'GymBuddy',
          headerShown: true,
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? 'home' : 'home-outline'} size={28} color={color} />
          ),
        }}
      />
      
        <Tabs.Screen
            name="profile" // This matches app/(tabs)/profile.tsx
            options = {{
                title: 'Profile',
                tabBarIcon: ({ color, focused }) => (
                    <Ionicons name={focused ? 'person' : 'person-outline'} size={28} color={color} />
                ),
            }}
        />

        <Tabs.Screen
            name="settings" // This matches app/(tabs)/log.tsx
            options = {{
                title: 'Settings',
                tabBarIcon: ({ color, focused }) => (
                    <Ionicons name={focused ? 'book' : 'book-outline'} size={28} color={color} />
                ),
            }}
        />
    </Tabs>
  );
}