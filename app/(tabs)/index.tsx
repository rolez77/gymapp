
import CalCircle from "@/components/CalCircle";
import MacroList from "@/components/MacroList";
import { ScrollView, Text, View } from "react-native";
export default function Index() {

  return (
    <View className="flex-1  bg-secondary">
      <ScrollView className="flex-1 px-5"
      showsVerticalScrollIndicator={false} 
      contentContainerStyle={{minHeight: "100%", 
      paddingBottom:10,
      alignItems: "center"
    }}
      >

        <CalCircle/>
        <Text className="pt-7 text-2xl text-accent">Daily Calorie Goal</Text>
       

       <Text className="pt-10 text-lg text-center text-white"> Macros </Text>
       <MacroList />
      </ScrollView>
      
    </View>
  );
}
