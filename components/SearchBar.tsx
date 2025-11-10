import React from 'react';
import { Image, TextInput, View } from 'react-native';

const SearchBar = () => {
const[food, setFood] = React.useState('');
  return (
    <View>
        <Image 
        style={{width:30, height:30, tintColor:'white'}}
        />
        <TextInput
        className="bg-primary text-white rounded-lg p-4 text-xl text-center w-1/2"
        placeholder="Log Food"
        placeholderTextColor="gray"
        value={food}
        onChangeText={setFood}
        />
    </View>
  )
}

export default SearchBar