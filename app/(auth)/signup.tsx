import { router } from 'expo-router';
import React, { useState } from 'react';
import { Alert, Button, TextInput, View } from 'react-native';
import { useAuth } from '../../context/AuthContext';

export default function SignUp() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');

  const { signUp } = useAuth();

  const handleSignUp = async () =>{
    try{
        await signUp(
            email,
            password,
            username
        );
        router.replace('/(tabs)');
    }catch(error){
        Alert.alert('Sign Up Failed', (error as Error).message);
    }
  };

  return(
    <View className = "flex-1 justify-center items-center bg-secondary px-4">
      {/* (Add your styled TextInput components here) */}
      <TextInput className="bg-primary text-white rounded-lg p-4 text-xl w-full mb-4" placeholder="Email" value={email} onChangeText={setEmail} autoCapitalize="none" />
      <TextInput className="bg-primary text-white rounded-lg p-4 text-xl w-full mb-4" placeholder="Password" value={password} onChangeText={setPassword} secureTextEntry />
      <TextInput className="bg-primary text-white rounded-lg p-4 text-xl w-full mb-4" placeholder="Username" value={username} onChangeText={setUsername} />
      <Button title="Sign Up" onPress={handleSignUp} />
      <Button title="Back to Login" onPress={() => router.back()} />
   </View>
  )

}