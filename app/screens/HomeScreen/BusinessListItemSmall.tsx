import { View, Text, Image, StyleSheet } from 'react-native'
import React from 'react'
import Colors from '@/app/Utils/Colors'


interface Business {
  image: { url: string }[];
  name: string;
  contactPerson: string; // Added contactPerson property
  category: { name: string }; // Added category property
}

export default function BusinessListItemSmall({ business }: { business: Business }) {
  return (
    <View style={styles.container}>
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
    </View>
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