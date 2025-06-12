import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons'
import { useNavigation, useRoute } from '@react-navigation/native';

type PageHeadingProps = {
  title: string;
};

export default function PageHeading({ title }: PageHeadingProps) {
  const navigation = useNavigation();
  const route = useRoute();
  // Assuming the param is passed as route.params.category
  const category = (route.params as { category?: string })?.category;

  return (
    <TouchableOpacity style={{display:'flex',flexDirection:'row',gap:10,alignItems:'center'}}
          onPress={()=> navigation.goBack()}
          >
            <Ionicons name="arrow-back-outline" size={30} color="black"/>
            <Text style={{fontSize:25,fontFamily:'Outfit-Medium'}}>{category}
                {title}</Text>
          </TouchableOpacity>
  )
}