// app/(tabs)/_layout.tsx
import { Ionicons } from '@expo/vector-icons'; // Example icon library
import { Tabs } from 'expo-router';
import React from 'react';



export default function TabLayout() {


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