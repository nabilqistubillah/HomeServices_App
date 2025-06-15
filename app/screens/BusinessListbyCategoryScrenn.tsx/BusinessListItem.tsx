import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import Colors from '@/app/Utils/Colors'
import Entypo from '@expo/vector-icons/Entypo';
import * as native from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '@/app/types';
import AntDesign from '@expo/vector-icons/AntDesign';

type Booking = {
  id: any;
  status?: string;
};

type BusinessListItemNavigationProp = NativeStackNavigationProp<RootStackParamList, 'business-detail'>;

interface Business {
  images: { url: string }[];
  contactPerson: string; 
  name: string; 
  address: string; 
}

type Props = {
  business: Business;
  booking: Booking;
};


export default function BusinessListItem({ business, booking }: Props) {
  const navigation = native.useNavigation<BusinessListItemNavigationProp>();
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
       <AntDesign name="calendar" size={24} color={Colors.PRIMARY} style={{marginRight:13}}/> 
        {business.address}</Text>

        {booking?.id?<Text>Show Booking</Text>:null}
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