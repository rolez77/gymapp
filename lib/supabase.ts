import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient } from '@supabase/supabase-js';
import 'react-native-url-polyfill/auto';

console.log("Connecting to Supabase with URL:", process.env.EXPO_PUBLIC_SUPABASE_URL);
const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL as string;
const supabaseAnonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY as string;
if (!supabaseUrl || !supabaseAnonKey) {
  // This error will now be more specific
  throw new Error("Supabase keys are undefined. Did you create .env and restart?");
}


export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage, // Tell Supabase to use AsyncStorage
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false, // Disable this for React Native
  },
});