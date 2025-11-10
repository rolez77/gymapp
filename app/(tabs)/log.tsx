
import SearchBar from '@/components/SearchBar';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

const log = () => {


  return (
    <SafeAreaView className = "flex-1 bg-secondary px-5 pt-10">
        <SearchBar/>
    </SafeAreaView>
    
  )
}

export default log