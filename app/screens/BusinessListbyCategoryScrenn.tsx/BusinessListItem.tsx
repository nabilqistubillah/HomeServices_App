import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import Colors from '@/app/Utils/Colors'
import Entypo from '@expo/vector-icons/Entypo';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '@/app/types';


type BusinessListItemNavigationProp = StackNavigationProp<RootStackParamList, 'business-detail'>;
interface Business {
  images: { url: string }[];
  contactPerson: string; // Added contactPerson property
  name: string; // Added name property
  address: string; // Added address property
}

export default function BusinessListItem({ business }: { business: Business }) {
  const navigation=useNavigation <BusinessListItemNavigationProp>();
  return (
    <TouchableOpacity style={styles.container} 
    onPress={()=>navigation.push('business-detail',
    {
      business:business
    })
    }>
      <Image source={{uri: business?.images[0]?.url}} 
        style={styles.image}
       />
       <View style={styles.subContainer}>
        <Text style={{fontFamily:'Outfit-Regular',color:Colors.GRAY,fontSize:15}}>{business.contactPerson}</Text>
        <Text style={{fontFamily:'Outfit-Bold', fontSize:19}}>{business.name}</Text>
        <Text style={{fontFamily:'Outfit-Regular', color:Colors.GRAY, fontSize:13}}>
        <Entypo name="location" size={15} color={Colors.PRIMARY}  />
        {business.address}</Text>
       </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
    container:{
       padding:10,
       backgroundColor: Colors.WHITE, 
       borderRadius:15,
       marginBottom:15,
       display:'flex',
       flexDirection:'row',
       gap:10,
    },
    subContainer:{
        display:'flex',
        gap:8,
    },
    image:{
        width:100,
        height:100
    }

})