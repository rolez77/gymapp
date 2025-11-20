
import CalCircle from "@/components/CalCircle";
import MacroList from "@/components/MacroList";
import { supabase } from '@/lib/supabase';
import { useFocusEffect } from "expo-router";
import React, { useCallback, useState } from 'react';
import { ScrollView, Text, View } from "react-native";
export default function Index() {

  const[calroies, setCalroies] = useState(0);
  const[maxCals, setMaxCals] = useState(0);
  const[isLoading, setIsLoading] = useState(true);

  type DailyMacros ={
    protein: number;
    fats: number;
    carbs: number;
  }
  const[macroTotals,setMacroTotals] = useState<DailyMacros>({
    protein:0,
    carbs:0,
    fats:0
  });


  const fetchCals = async ()=>{
    try{

      setIsLoading(true);

      const{data:profileData, error:profileError} = await supabase.from('profiles').select('calorie_goal').single();
      if(profileError) throw profileError;
      if(profileData){
        setMaxCals(profileData.calorie_goal);
      }else{
        setMaxCals(2000);
      }
      
      const today = new Date();
      today.setHours(0,0,0,0);
      const tommorow = new Date(today);
      tommorow.setDate(tommorow.getDate() + 1);

      const{data,error} = await supabase.rpc('get_daily_macros',
        {
          start_date: today.toISOString(),
          end_date: tommorow.toISOString()
        }
      );
      if(error) throw error;
      if(data && data[0]){
        const totals = data[0];
        setCalroies(totals.total_calories || 0);
        setMacroTotals({
          protein: totals.total_protein || 0,
          carbs: totals.total_carbs || 0,
          fats: totals.total_fat || 0,
        });
      }else{
        setCalroies(0);
        setMacroTotals({protein: 0, fats: 0, carbs: 0,});
      }
  }catch(error){
    console.log("error");
  }finally{
    setIsLoading(false);
  }
  };

  useFocusEffect(
    useCallback(()=>{
      fetchCals();
    },[])
  );


  return (
    <View className="flex-1  bg-secondary">
      <ScrollView className="flex-1 px-5"
      showsVerticalScrollIndicator={false} 
      contentContainerStyle={{minHeight: "100%", 
      paddingBottom:10,
      alignItems: "center"
    }}
      >

        <CalCircle calories = {calroies} maxCals = {maxCals}/>
        <Text className="pt-7 text-2xl text-accent">Daily Calorie Goal</Text>
       

       <Text className="pt-10 text-lg text-center text-white"> Macros </Text>
       <MacroList macros ={macroTotals}/>
      </ScrollView>
      
    </View>
  );
}
