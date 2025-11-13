
import SearchBar from '@/components/SearchBar';
import React from 'react';
import { Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const log = () => {


  return (
    <SafeAreaView className = "flex-1 bg-secondary px-5 pt-10">
      <View>
        <Text>
          Enter food
        </Text>
        <SearchBar/>
      </View>
    
    </SafeAreaView>
    
  )
}

export default log