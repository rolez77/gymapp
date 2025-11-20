import React from 'react';
import { Alert, Button, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuth } from '../../context/AuthContext';
const profile = () => {

  const{signOut} = useAuth();

  const handleSignOut = async () =>{
    try{
        await signOut();
    }catch{
       Alert.alert("Sign out failled");
    }
  }
  return (
    <SafeAreaView className="flex-1 justify-center items-center bg-secondary px-4">
      <Text style={{fontSize:25}} 
      className="color-white align-top flex-auto mt-5">Welcome!</Text>

      <Button title = "Log out" onPress={handleSignOut}/>
    </SafeAreaView>
  )
}

export default profile