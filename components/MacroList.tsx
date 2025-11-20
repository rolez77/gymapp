import React from 'react';
import { FlatList, Text, View } from 'react-native';


type MacroListProps = {
  macros: {
    protein: number;
    carbs: number;
    fats: number;
  }
};

const MacroList = ({macros}:MacroListProps) => {

  const displayData = [
    { id: '1', name: 'Protein', amount: `${Math.round(macros.protein || 0)}g` },
    { id: '2', name: 'Carbs', amount: `${Math.round(macros.carbs || 0)}g` },
    { id: '3', name: 'Fats', amount: `${Math.round(macros.fats || 0)}g` },
  ];
  return (
    <View>
      <FlatList
      horizontal={true}
      data={displayData}
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