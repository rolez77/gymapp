import { router } from 'expo-router';
import React, { useState } from 'react';
import { Alert, Button, TextInput, View } from 'react-native';
import { useAuth } from '../../context/AuthContext';

export default function Login() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { signIn } = useAuth(); 

    const handleLogin = async () => {
        try{
            await signIn(email, password);
            router.replace('/(tabs)');
        }catch{
            Alert.alert('Login Failed', 'Invalid email or password');
        }
    };

    return (
        <View className="flex-1 justify-center items-center bg-secondary px-4">
            <TextInput
                className="bg-primary text-white rounded-lg p-4 text-xl w-full mb-4"
                placeholder="Email"
                placeholderTextColor="gray"
                value={email}
                onChangeText={setEmail}
                autoCapitalize='none'
            />

            <TextInput
                className="bg-primary text-white rounded-lg p-4 text-xl w-full mb-4"
                placeholder="Password"
                placeholderTextColor="gray"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
            />
            <Button title="Login" onPress={handleLogin} />
            <Button title="Go to Sign Up" onPress={() => router.push('/(auth)/signup')} />

        </View>
    )
}