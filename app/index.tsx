import { router } from 'expo-router';
import React, { useEffect } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { useAuth } from '../context/AuthContext';

export default function Index(){
    const{session, loading} = useAuth();

    useEffect(() =>{

        if(loading){
            return;
        }

        if(session){
            router.replace('/(tabs)');
        }else{
            router.replace('/(auth)/login');
        }

    },[session, loading]);
    
    return (
    // This is a simple loading screen
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <ActivityIndicator size="large" />
    </View>
  );
}