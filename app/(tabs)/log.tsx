
import { Camera, CameraView } from 'expo-camera';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { Alert, Button, StyleSheet, Text, View } from 'react-native';
import { useAuth } from '../../context/AuthContext';
import { supabase } from '../../lib/supabase';

export default function SearchScreen(){
  const {session} = useAuth();
  const[hasPermission, setHasPermission] = useState<boolean | null>(null);
  const[isScannerVisible, setIsScannerVisible] = useState(false);

  const handleScanPress = async () =>{
    const {status} = await Camera.requestCameraPermissionsAsync();
    setHasPermission(status == 'granted');

    if(status === 'granted'){
      console.log("Granted permission");
      setIsScannerVisible(true);
    }else{
      Alert.alert("You need to enable camera permissions to access the scanner.");
    }
  };

  const handleBarCodeScanned = ({data} : {data:string}) =>{
    setIsScannerVisible(false);
    Alert.alert("Scanned");
    fetchFoodData(data);
  };

  const fetchFoodData = async (barcode: string) => {
    try{
      const response = await fetch(
        `https://world.openfoodfacts.org/api/v0/product/${barcode}.json`
      );
      if(!response.ok){
        throw new Error('Status: ${response.status}')
      }
      const json = await response.json();

      if(json.status === 1 && json.product){
        const product = json.product;

        if (!product.nutriments) {
          Alert.alert(
            'Data Missing',
            `We found "${product.product_name}", but it has no nutrition data in the database.`
          );
          return; // Stop the function herer
        }

        const nutriments = product.nutriments;

        const foodData = {
          name: product.product_name || 'Unknown Food',
          calories: nutriments['energy-kcal_100g'] || 0,
          protein: nutriments.proteins_100g || 0,
          carbs: nutriments.carbohydrates_100g || 0,
          fat: nutriments.fat_100g || 0,
          sugar: nutriments.sugars_100g || 0,
          serving_size: product.serving_size ? parseInt(product.serving_size) : 100,
        };

        Alert.alert(
          'Food Found!',
          `${foodData.name}\nCalories: ${foodData.calories} per 100g\n\nAdd this food to your library?`,
          [
            { text: 'Cancel', style: 'cancel' },
            { text: 'Add to Library', onPress: () => saveFoodToSupabase(foodData) },
          ]
        );
      }else{
        Alert.alert('Food Not Found', 'Could not find this food in the database.');
      }
    }catch(error){
      console.error('Fetch Food Data Error:', error);
      Alert.alert('API Error', (error as Error).message);
      //Alert.alert('API Error', 'Could not connect to food database.');
    }
  };

  const saveFoodToSupabase = async(foodData : any) =>{
    if(!session?.user){
      Alert.alert('Error', 'You must be logged in to add food.');
      return;
    }
    try{
    const { data: newFood, error: foodError } = await supabase.from('foods').insert({
      user_id: session.user.id,
      name: foodData.name,
      serving_size_grams: foodData.serving_size,
      calories: foodData.calories,
      protein_grams: foodData.protein,
      carb_grams: foodData.carbs,
      fat_grams: foodData.fat,
      sugar_grams: foodData.sugar,
    })
    .select('id') // CRITICAL: Gets the ID of the new food item
    .single();



    if (foodError) {
      Alert.alert('Save Failed', foodError.message);
    } else {
      Alert.alert('Success!', `${foodData.name} was added to your food library.`);
    }
    if(!newFood){ throw new Error("Err")};


     const {error: logError} = await supabase.from('food_logs').
    insert(
      {
        user_id: session?.user.id,
        food_id: newFood.id,
        quantity: 1.0,
        created_at: new Date().toISOString,
      }
    );
    if(logError){
      throw logError;
    }

    Alert.alert(
        'Success!', 
        `${foodData.name} added to library and logged for today.`,
        [
          { 
            text: 'OK', 
            onPress: () => {
              // This pushes back to the home tab, triggering the re-fetch
              router.replace('/(tabs)'); 
            }
          }
        ]
      );
    }catch(error){
        Alert.alert("Save failed");
    } 


  };

 

  if (isScannerVisible) {
    return (
      
      <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'flex-end' }}>
        {/* 3. Use the <CameraView> component */}
        <CameraView
          style={StyleSheet.absoluteFillObject}
          onBarcodeScanned={handleBarCodeScanned} // This prop is how it scans
          barcodeScannerSettings={{
            // Tell it what kind of codes to look for (UPC, EAN are for food)
            barcodeTypes: ['upc_a', 'upc_e', 'ean13', 'ean8'], 
          }}
          facing="back" // Use the back camera
        />
        <Button title="Cancel" onPress={() => setIsScannerVisible(false)} />
      </View>
    );
  }

  // If the scanner is not active, show the normal search page
  return (
    <View className = "bg-secondary"style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text className = "color-white"style={{ fontSize: 18, marginBottom: 20 }}>
        Scan a barcode to add a food
      </Text>
      <Button title="Scan Barcode" onPress={handleScanPress} />
    </View>
  );

}