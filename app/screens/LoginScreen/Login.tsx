import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity } from 'react-native'
import React from 'react'
import Colors from '@/app/Utils/Colors'
import * as WebBrowser from "expo-web-browser";
import { useOAuth } from '@clerk/clerk-expo'; // Adjust the import path based on your setup
import { useWarmUpBrowser } from '@/app/hooks/warmUpBrowser';
WebBrowser.maybeCompleteAuthSession();

export default function Login() {
    useWarmUpBrowser();
    const { startOAuthFlow } = useOAuth({ strategy: "oauth_google"});
    const onPress = React.useCallback(async () => {
      try {
        const { createdSessionId, signIn, signUp, setActive } = await startOAuthFlow();
  
        // If sign in was successful, set the active session
        if (createdSessionId) {
          setActive!({ session: createdSessionId })
        } else {
          // Use signIn or signUp returned from startOAuthFlow
          // for next steps, such as MFA
        }
      } catch (err) {
        // See https://clerk.com/docs/custom-flows/error-handling
        // for more info on error handling
        console.error(JSON.stringify(err, null, 2))
      }
    }, [])
    return (
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={{ alignItems: 'center' }}>
          <Image
            source={require('@/assets/images/login.png')}
            style={styles.LoginImage}
          />
          <View style={styles.subContainer}>
            <Text style={{ fontSize: 24, color: Colors.WHITE, textAlign: 'center' }}>
              Lets Find{' '}
              <Text style={{ fontWeight: 'bold' }}>
                Professional Cleaning and Repair
              </Text>{''}
              Service
            </Text>
            <Text
              style={{
                fontSize: 15,
                color: Colors.WHITE,
                textAlign: 'center',
                marginTop: 20,
              }}>
              Best App to Find services near you which deliver you a professional service
            </Text>
    
            <TouchableOpacity style={styles.button} onPress={onPress}>
              <Text
                style={{
                  textAlign: 'center',
                  fontSize: 15,
                  color: Colors.PRIMARY,
                }}>
                Lets Get Started
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    )
}

const styles = StyleSheet.create({
    LoginImage : {
        width:230,
        height:450,
        marginTop:70,
        borderWidth:4,
        borderColor:Colors.BLACK,
        borderRadius:15
    },
    subContainer:{
        width:'100%',
        backgroundColor:Colors.PRIMARY,
        height:'51%',
        marginTop:-20,
        borderTopLeftRadius:30,
        borderTopRightRadius:30,
        padding:20
    },
    button:{
        padding:15,
        backgroundColor:Colors.WHITE,
        borderRadius:99,
        marginTop:40
    },
    scrollContainer: {
      flexGrow: 1,
      justifyContent: 'center',
      backgroundColor: '#fff',
    }  
})