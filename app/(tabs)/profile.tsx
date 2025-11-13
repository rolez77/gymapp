import React from 'react';
import { Alert, Button, Text, View } from 'react-native';
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
    <View className="flex-1 justify-center items-center bg-secondary px-4">
      <Text>profile</Text>

      <Button title = "Log out" onPress={handleSignOut}/>
    </View>
  )
}

export default profile