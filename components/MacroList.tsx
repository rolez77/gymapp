import React from 'react';
import { FlatList, Text, View } from 'react-native';


const macroData = [
  { id: '1', name: 'Protein', amount: '150g' },
  { id: '2', name: 'Carbohydrates', amount: '250g' },
  { id: '3', name: 'Fats', amount: '70g' },
];
const MacroList = () => {
  return (
    <View>
      <FlatList
      horizontal={true}
      data={macroData}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <View className="mx-5 ">
          <View>
            <Text className="text-white text-lg">{item.name}</Text>
          </View>
          <View>
            <Text className="text-white text-lg">{item.amount}</Text>
          </View>
        </View>
      )}    
      />
    </View>
  )
}

export default MacroList