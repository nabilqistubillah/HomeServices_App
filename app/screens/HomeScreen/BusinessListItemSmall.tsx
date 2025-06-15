import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native'
import React, { use } from 'react'
import Colors from '@/app/Utils/Colors'
import AntDesign from '@expo/vector-icons/AntDesign';
import { useNavigation } from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';

interface Business {
  image: { url: string }[];
  name: string;
  contactPerson: string;
  category: { name: string };
}

type RootStackParamList = {
  'business-detail': { business: Business };
  // ...other routes
};

export default function BusinessListItemSmall({ business }: { business: Business }) {
  const navigation=useNavigation<StackNavigationProp<RootStackParamList>>();
  return (
    <TouchableOpacity style={styles.container} onPress={()=>navigation.push('business-detail', {
      business:business
    })}>
      <Image source={{uri:business?.image[0]?.url}}
      style={styles.image}
      />
      <View style={styles.infoContainer}>
        <Text style={{fontSize:17,
          fontFamily:'outfit-medium'}}>{business?.name}</Text>
        <Text style={{fontSize:13,
          fontFamily:'outfit-Regular',}}>{business?.contactPerson}</Text>
        <Text style={{
          fontSize:10,
          fontFamily:'outfit-Regular',
          padding:3,
          color:Colors.PRIMARY,
          backgroundColor: Colors.GRAY,
          borderRadius: 3,
          alignSelf:'flex-start',
          paddingHorizontal:7,
          }}>{business?.category.name}</Text>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
    container:{
        padding: 10,
        backgroundColor:Colors.WHITE,
        borderRadius: 10,
    },
    infoContainer:{
      padding: 7,
      display:'flex',
      gap:3
    },
    image: {
        width: 160,
        height: 100,
        borderRadius: 10,
    }
})