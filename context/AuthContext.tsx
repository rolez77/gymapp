import { Session } from '@supabase/supabase-js';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';

type AuthContextType = {
    session: Session | null;
    loading: boolean;
    signUp:(email:string,
        password:string,
        username:string) => Promise<any>;
    signIn:(email:string,password:string) => Promise<any>;
    signOut:() => Promise<any>;
}

const AuthContext = createContext<AuthContextType>({
    session: null,
    loading: true,
    signUp: async () => {},
    signIn: async () => {},
    signOut: async () => {},
});

// will wrap entire app
export function AuthProvider({children}:{children: React.ReactNode}) {
    const[session, setSession] = useState<Session | null>(null);
    const[loading, setLoading] = useState(true);

    useEffect(() => {
        supabase.auth.getSession().then(({data:{session}}) => {
            setSession(session);
            setLoading(false);
        }); 

        const {data:authListner} = supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session);
            if(_event === 'SIGNED_IN' || _event === 'SIGNED_OUT') {
                setLoading(false);
            }  
        });

        return () => {
            authListner?.subscription.unsubscribe();
        }
    },[]);

    const signUp = async (
        email: string, 
        password: string, 
        username: string
    ) => {
        
        const { data, error } = await supabase.auth.signUp({
            email: email,
            password: password,
            options: {
              data: {
                // This username is read by your trigger
                username: username
              }
            }
        });

        if (error) {
          throw error;
        }

        // The 'supabase.from('profiles').insert(...)'
        // code is now GONE. The trigger does this work.
        
        return data;
    };

    const signIn = async (email:string, password:string) => {
        const { data, error } = await supabase.auth.signInWithPassword({
            email:email,
            password:password,
        });
        if(error) { throw error; }
        return data;
    };

    const signOut = async () => {
        const { error } = await supabase.auth.signOut();
        if(error) { throw error; }
    };

    const value = {
        session,
        loading,
        signUp,
        signIn,
        signOut,
    };

    return(
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}
    